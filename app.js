const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');
const controlsContainer = document.querySelector('.video-container .controls-container');

const playpauseButton = document.querySelector('.video-container .controls-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls-container .controls button.volume');
const fullscreenButton = document.querySelector('.video-container .controls-container .controls button.full-screen');
const playButton = playpauseButton.querySelector('.playing');
const pauseButton = playpauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullscreenButton.querySelector('.maximize');
const minimizeButton = fullscreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .controls-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .controls-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .controls-container .progress-controls .time-remaining')

let controlsTimeout;

controlsContainer.style.opacity = '0';
playButton.style.display = '';
pauseButton.style.display = 'none';
mutedButton.style.display = 'none';
minimizeButton.style.display = 'none';

function displayControls() {
  controlsContainer.style.opacity = '1';
  document.body.style.cursor = 'initial';
  if(controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = '0';
    document.body.style.cursor = 'none';
  }, 5000);
}

function playpause() {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none';
    pauseButton.style.display = '';
  } else {
    video.pause();
    playButton.style.display = '';
    pauseButton.style.display = 'none';
  }
}

function toggleMute() {
  if (video.muted) {
    fullVolumeButton.style.display = '';
    mutedButton.style.display = 'none';
  } else {
    fullVolumeButton.style.display = 'none';
    mutedButton.style.display = '';
  }
  video.muted = !video.muted;
}

function toggleFullscreen() {
  // we need to request fullscreen on video-container so that the custom controls dont disappear
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = '';
    minimizeButton.style.display = 'none';
  } else {
    maximizeButton.style.display = 'none';
    minimizeButton.style.display = '';
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    playpause();
  } else if (event.code === 'KeyM') {
    toggleMute();
  } else if (event.code === 'KeyF') {
    toggleFullscreen();
  }
  displayControls();
});

playpauseButton.addEventListener('click', playpause);

rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

volumeButton.addEventListener('click', () => {
  toggleMute()
});

fullscreenButton.addEventListener('click', toggleFullscreen);

video.addEventListener('timeupdate', () => {
  watchedBar.style.width = (video.currentTime / video.duration) * 100 + '%';
  const totalSecondsRemaining = video.duration - video.currentTime;
  const hoursRemaining = Math.floor(totalSecondsRemaining / (60 * 60));
  const minutesRemaining = Math.floor((totalSecondsRemaining - (hoursRemaining * 60 * 60)) / 60);
  const secondsRemaining = Math.floor(totalSecondsRemaining - (hoursRemaining * 60 * 60) - (minutesRemaining * 60));
  timeLeft.textContent = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
});

progressBar.addEventListener('click', (event) => {
  const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

document.addEventListener('mousemove', displayControls);
