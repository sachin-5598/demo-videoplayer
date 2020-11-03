const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const playpauseButton = document.querySelector('.video-container .controls-container .controls button.play');
const rewindButton = document.querySelector('.video-container .controls-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls-container .controls button.volume');
const fullscreenButton = document.querySelector('.video-container .controls-container .controls button.full-screen');

playpauseButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

volumeButton.addEventListener('click', () => {
  video.muted = !video.muted;
});

fullscreenButton.addEventListener('click', () => {
  // we need to request fullscreen on video-container so that the custom controls dont disappear
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
