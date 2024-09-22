const videos = document.getElementsByTagName("video");
const conteudovps = document.getElementsByClassName("conteudovp");

for (let conteudovp of conteudovps) {
  const video = conteudovp.querySelector("video");
  video.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  video.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
  conteudovp.addEventListener("scrollend", pausarVideoRodando);
}

const tela = document.querySelector(".tela");
tela.addEventListener("scrollend", pausarVideoRodando);

function pausarVideoRodando() {
  for (let video of videos) {
    if (!video.paused) {
      video.pause();
      break;
    }
  }
  rodarVideoVigente();
}

function rodarVideoVigente() {
  for (let video of videos) {
    const posicoesVideo = video.getBoundingClientRect();
    if ((posicoesVideo.x == 0) && (posicoesVideo.y == 0)) {
      video.play();
      break;
    }
  }
}