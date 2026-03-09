import Elemento from "Elemento";

const dlg = Elemento.dialog({ className: "telaDePreferencia", },
  Elemento.h1({}, "Foco"),
  Elemento.p({}, "Requer foco, instale ou use tela cheia."),
  Elemento.button({ className: "vjButton border-0 inMenu", onclick: entrarEmTelaCheia },
    Elemento.span({}, "Tela cheia", Elemento.i({ className: "ms-2 bi bi-fullscreen" }))
  ),
);

export default function DialogInstalar() {
  setTimeout(requererTelaCheia, 100);
  return dlg;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  const btnInstalar = Elemento.button({ className: "vjButton border-0 inMenu", onclick: () => { event.prompt(); btnInstalar.remove(); } },
    Elemento.span({}, "Instalar", Elemento.i({ className: "ms-2 bi bi-download" }))
  )
  dlg.append(btnInstalar);
  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        entrarEmTelaCheia();
      }
    })
});

function entrarEmTelaCheia() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function sairDaTelaCheia() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

window.addEventListener("resize", requererTelaCheia);

function requererTelaCheia(event) {
  if (estaEmTelaCheia()) {
    if (dlg.open) {
      dlg.close();
    }
  } else {
    if (!dlg.open) {
      dlg.showModal();
    }
  }
}

function estaEmTelaCheia() {
  return window.matchMedia("(display-mode: fullscreen)").matches || Boolean(document.fullscreenElement);
}