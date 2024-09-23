const videos = document.getElementsByTagName("video");
const conteudovps = document.getElementsByClassName("conteudovp");

// define controles
for (let conteudovp of conteudovps) {
  const video = conteudovp.querySelector("video");
  video.addEventListener("contextmenu", (event) => { event.preventDefault(); });
  video.addEventListener("play", rodarVideoVigente);
  video.addEventListener("click", playPause);
  video.addEventListener("touchend", playPause);
  conteudovp.addEventListener("scrollend", rodarVideoVigente);
}

const tela = document.querySelector(".tela");
tela.addEventListener("scrollend", rodarVideoVigente);

function rodarVideoVigente() {
  console.log("rodarVideoVigente");
  for (let video of videos) {
    const posicoesVideo = video.getBoundingClientRect();
    if ((posicoesVideo.x == 0) && (posicoesVideo.y == 0)) {
      video.play();
    } else {
      video.pause();
    }
  }
}

/**
* @param {MouseEvent} event 
* @param {HTMLVideoElement} event.target  */
function playPause({ target: video }) {
  if (video.paused) {
    video.play()
  } else {
    video.pause();
  }
}