// AUDIO INPUT WAVEFORM VISUALIZATION IS CPU INTENSIVE AND GOOD ON DESKTOPS ONLY. On mobile devices it is either too slow or incompatible with working together along with speech recognition.
// DEPRECATED: During early stages of UI design, 2 or 4 instances of wavesurfer were running at the same time but in that case too much CPU was used.
// ALSO: There is a problem with making wavesurfer canvas width 100% on 1920x1080 desktop resolution. Use 50% and scaleX(2) instead!
// NOTE: wavesurfer.js is on iframed lesson htmls and not on the container parent htmls.

const waveformContainerDiv = document.createElement("DIV");
waveformContainerDiv.id="waveform";
waveformContainerDiv.classList.add("wavesurferMicrophoneDiv");

var wavesurfer;

if (parent.deviceDetector.device=="desktop") {
  document.body.appendChild(waveformContainerDiv);
  wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'white',interact:false,cursorWidth:0,height:'100',barHeight:'6', plugins:[WaveSurfer.microphone.create()]});
}

/* ______ Functions to start-stop ______ */
// These will be called from the particular js files of the particular lessons.
function startAudioInputVisualization() {
  if (parent.deviceDetector.device=="desktop") {
    // Get information about CPU. Make things look better on faster machines.
    if (window.navigator.hardwareConcurrency>3) {
      wavesurfer.microphone.bufferSize = 2048; // This makes it look smoother. Default is 4096.
    }
    else if (window.navigator.hardwareConcurrency<2) {
      wavesurfer.microphone.bufferSize = 8192; // Reduce quality if there is only 1 logical processor core available.
    }
    else {
      // Let defaults be.
    }
    // Start and fade in.
    wavesurfer.microphone.start();
    waveformContainerDiv.classList.add("addThisToMakeItFadeIn");
  }
}

function stopAudioInputVisualization() {
  if (parent.deviceDetector.device=="desktop") {
    wavesurfer.microphone.stop();
    waveformContainerDiv.classList.remove("addThisToMakeItFadeIn");
  }
}
