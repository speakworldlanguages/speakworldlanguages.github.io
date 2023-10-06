"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT VIA OFFICIAL AUTHORIZATION

// This is js_for_microphone_input_visualization.js

// AUDIO INPUT WAVEFORM VISUALIZATION CAN BE CPU INTENSIVE. On Android devices it is either too slow or incompatible ->  When WAVESURFER-mic plugin was used, it didn't work together with speech recognition.
// September 2023 » Quit wavesurfer-mic-plugin and try switching to our own audio input visualization method
let audioMeterDiv = null;
window.addEventListener('DOMContentLoaded', function(){
  audioMeterDiv = document.getElementById('audioMeterID'); // getElementById returns null if an element with the given ID doesn't exist
}, { once: true }); // END OF DOMContentLoaded

// Too bad workers cannot access navigator.mediaDevices
var worker = new Worker('/js_reusables/js_for_mic_input_vis_web_worker.js');
let measureWorkerResponseStartTime = 0;
let measureRAFPerformanceStartTime = 0;
let workerResponseTime = 0;
let mainThreadRAFPerformance = 0;
worker.onmessage = function (event) {
    workerResponseTime = performance.now() - measureWorkerResponseStartTime; // Calculate response time
    const message = event.data;
    switch (message.type) {
        case 'ready':
            parent.console.log("Audiometer Web-Worker is "+message.say);
            break;
        case 'dataAvailable':
            if (audioMeterDiv) {  updateTheStandardAudioMeterDiv(message.yield);  }
            break;
        case 'adjust':
            volumeCeilingForSpeech = message.newCeiling;
            parent.console.log("Adjust maximum to "+ volumeCeilingForSpeech);
            break;
        case 'error':
            parent.console.warn("error message coming from the worker");
            parent.console.error(message.whichIs);
            break;
    }
};
// Handle errors from the web worker
worker.onerror = function (error) { parent.console.error('Error from web worker:', error); };

// ---
const volumeFloorForSpeech = 10; // Will NOT be updated via workers message
let volumeCeilingForSpeech = 40; // Will be updated via workers message
function updateTheStandardAudioMeterDiv(valueObtainedFromWorker) {
  if (valueObtainedFromWorker<=volumeFloorForSpeech) {
    audioMeterDiv.style.width = "85vmin"; // Initial values found in css_for_photos_and_videos_teach_a_new_word
    audioMeterDiv.style.height = "85vmin"; // 86 - 1 » border is 1 vmin thick
  } else if (valueObtainedFromWorker>volumeFloorForSpeech && valueObtainedFromWorker<volumeCeilingForSpeech) {
    // Change input range from 0~100 to volumeFloorForSpeech~volumeCeilingForSpeech and set output range as 0~20
    const valueWithinRange = ((valueObtainedFromWorker - volumeFloorForSpeech)*20)/(volumeCeilingForSpeech-volumeFloorForSpeech);
    audioMeterDiv.style.width = String(85+valueWithinRange)+"vmin";
    audioMeterDiv.style.height = String(85+valueWithinRange)+"vmin";
  } else {
    audioMeterDiv.style.width = "105vmin";
    audioMeterDiv.style.height = "105vmin";
  }
}

let audioContext = null;
let mediaStream = null;
function activateMicrophone() { parent.console.log("activating microphone");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
              mediaStream = stream;
              audioContext = new (window.AudioContext || window.webkitAudioContext)();
              parent.console.log("Sample rate is " + audioContext.sampleRate);
              const microphone = audioContext.createMediaStreamSource(mediaStream);
              const analyser = audioContext.createAnalyser();
              microphone.connect(analyser);
              //analyser.connect(audioContext.destination); // Do not send the mic input to speakers/headphones

              // Adjust the FFT size
              analyser.fftSize = 512; // Resolution of frequency range that is 0Hz to 48000Hz

              // Set the frequency range to ignore low bass and high treble
              const lowerFrequencyLimit = 220; // Hz
              const upperFrequencyLimit = 5500; // Hz

              const bufferLength = analyser.frequencyBinCount; // Always equals half of fftSize
              parent.console.log("Buffer length is " + bufferLength);
              const dataArray = new Uint8Array(bufferLength);
              const startIndex = Math.floor(lowerFrequencyLimit / (audioContext.sampleRate / bufferLength));
              const endIndex = Math.ceil(upperFrequencyLimit / (audioContext.sampleRate / bufferLength));
              parent.console.log("start index in main thread = " + startIndex);
              parent.console.log("end index in main thread = " + endIndex);
              const startAndEnd = [startIndex,endIndex];
              worker.postMessage({ data: startAndEnd, task: 'setStartIndexAndEndIndex' });
              // ---
              requestAnimationFrame(updateAmplitude);
              // ---
              //let frameCount = 0; // Comment out after tests
              function updateAmplitude() {
                  mainThreadRAFPerformance = performance.now() - measureRAFPerformanceStartTime;
                  //frameCount++; // Comment out after tests
                  //if (frameCount % 120 === 0) { parent.console.log("raf frame time: " + mainThreadRAFPerformance.toFixed(1)); }
                  // -
                  analyser.getByteFrequencyData(dataArray);
                  // Calculate the average amplitude from the specified frequency range
                  measureWorkerResponseStartTime = performance.now();
                  worker.postMessage({ data: dataArray, task: 'filterAndCalculate' });
                  // RAF, recursion, loop
                  //if (frameCount % 120 === 0) { parent.console.log("worker response time: " + workerResponseTime.toFixed(1)); } // See onmessage above
                  if (workerResponseTime>mainThreadRAFPerformance) { // Example: If worker response is more (longer) than 16.66 milliseconds it would be too late when running at 60fps
                    // By not updating measureRAFPerformanceStartTime here we reduce the probability of skipping more than 1 frame at a time
                    requestAnimationFrame(function () { requestAnimationFrame(updateAmplitude); }); // Skip a frame
                  } else {
                    measureRAFPerformanceStartTime = performance.now();
                    requestAnimationFrame(updateAmplitude);
                  }
              }
              // ---
      }) // End of then() block
      .catch(function (error) {
        parent.console.error('Error accessing the microphone:', error);
      });
  } else {
      parent.console.error('getUserMedia is not supported in this browser.');
  }
}

// ---
var audioMeterIsListening = false; // See pauseTheAppFunction in js_for_the_sliding_navigation_menu
// According to tests (as of JULY2023) Windows PCs are the only verified type of device that NICELY support simultaneous usage of the device microphone by multiple APIs
/* ______ Functions to start-stop ______ */
// These will be called from the particular js files of the particular lessons.
function startStandardAudioInputVisualization() {
  if (deviceDetector.device=="desktop" && !isApple) { parent.console.log("proceed to microphone activation");
    activateMicrophone();
    audioMeterIsListening = true;
    if (audioMeterDiv) {
      audioMeterDiv.style.opacity = "0";
      audioMeterDiv.style.display = "block"; // It's an empty div that contains nothing
      audioMeterDiv.style.animationDelay = "0.5s";
      audioMeterDiv.style.animationDuration = "1.5s";
      audioMeterDiv.classList.add("simplyMakeItAppear"); // simplyMakeItAppear exists in css_for_every_single_html
    }
  }
}
// ---
function stopStandardAudioInputVisualization() {
  if (deviceDetector.device=="desktop" && !isApple) {
    if (audioContext && audioMeterIsListening) {
       audioContext.close();
    }
    if (mediaStream && audioMeterIsListening) {
       mediaStream.getTracks().forEach(track => track.stop());
    }
    audioMeterIsListening = false;

    if (audioMeterDiv) {
      audioMeterDiv.classList.remove("simplyMakeItAppear");
      audioMeterDiv.style.animationDelay = "0s";
      audioMeterDiv.classList.add("simplyMakeItDisappear"); // css_for_every_single_html
      setTimeout(function () {  audioMeterDiv.style.display = "none";  }, 1600);
    }
  }
}

function startUniqueAudioInputVisualization() {

}
function stopUniqueAudioInputVisualization() {

}
