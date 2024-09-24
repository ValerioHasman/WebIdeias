const videos = document.getElementsByTagName("video");
const conteudovps = document.getElementsByClassName("conteudovp");

const tela = document.querySelector(".tela");
tela.addEventListener("scrollend", verificaParaBuscar);

adcionaVideo();
adcionaVideo();

function rodarVideoVigente() {
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

/** 
 * @param {Event} event 
 * @param {Element} event.target 
 */
function verificaParaBuscar() {
  if (tela.clientHeight + tela.scrollTop >= tela.scrollHeight - (tela.clientHeight / 2)) {
    adcionaVideo();
  }
  rodarVideoVigente();
}

function adcionaVideo() {
  tela.insertAdjacentHTML(
    "beforeend",
    `
<div class="conteudovp ss-item ss-container-x">
  <div class="video ss-item">
    <video
    src="v${videos.length % 2 == 0 ? "0" : "1"}.mp4"
    controls
    controlslist="nofullscreen nodownload noplaybackrate"
    disablepictureinpicture
    disableremoteplayback
    loop
    playsinline
    ></video>
  </div>
  <div class="perfil ss-item">
    <div class="conteudoperfil"></div>
  </div>
</div>

`);
  const video = videos[videos.length - 1]
  video.addEventListener("contextmenu", (event) => { event.preventDefault(); });
  video.addEventListener("play", rodarVideoVigente);
  video.addEventListener("click", playPause);
  video.addEventListener("touchend", playPause);
  conteudovps[conteudovps.length - 1].addEventListener("scrollend", rodarVideoVigente);
}