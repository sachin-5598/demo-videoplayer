const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const playpauseButton = document.querySelector('.video-container .controls-container .controls button.play');
const rewindButton = document.querySelector('.video-container .controls-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls-container .controls button.volume');
const fullscreenButton = document.querySelector('.video-container .controls-container .controls button.full-screen');

const watchedBar = document.querySelector('.video-container .controls-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .controls-container .progress-controls .time-remaining')

function playpause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleMute() {
  video.muted = !video.muted;
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    playpause();
  } else if (event.code === 'KeyM') {
    toggleMute();
  }
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

fullscreenButton.addEventListener('click', () => {
  // we need to request fullscreen on video-container so that the custom controls dont disappear
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

video.addEventListener('timeupdate', () => {
  watchedBar.style.width = (video.currentTime / video.duration) * 100 + '%';
  const totalSecondsRemaining = video.duration - video.currentTime;
  const hoursRemaining = Math.floor(totalSecondsRemaining / (60 * 60));
  const minutesRemaining = Math.floor((totalSecondsRemaining - (hoursRemaining * 60 * 60)) / 60);
  const secondsRemaining = Math.floor(totalSecondsRemaining - (hoursRemaining * 60 * 60) - (minutesRemaining * 60));
  timeLeft.textContent = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
});