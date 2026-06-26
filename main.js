
import Elemento from "./Elemento.js";

const lista = [
  {
    "nome": "Videos Curtos",
    "pasta": "VideosCurtos"
  },
  {
    "nome": "Chat Monólogo",
    "pasta": "Chat"
  },
  {
    "nome": "Chat Monólogo",
    "pasta": "Edite"
  },
  {
    "nome": "Navegação",
    "pasta": "Navegacao"
  },
  {
    "nome": "Cor Complementar",
    "pasta": "Cores"
  },
  {
    "nome": "CaracAll",
    "pasta": "CaracAll"
  },
  {
    "nome": "PopK-e",
    "pasta": "PopK-e"
  },
  {
    "nome": "Formulario Responsivo",
    "pasta": "FormularioResponsivo"
  },
  {
    "nome": "Link Para conteúdo embutidos.",
    "pasta": "LinkPara"
  },
  {
    "nome": "Aprender A Ler.",
    "pasta": "AprenderALer"
  },
  {
    "nome": "Ant PDF.",
    "pasta": "AntPDF"
  },
  {
    "nome": "Calcular.",
    "pasta": "Calcular"
  },
  {
    "nome": "Inversor Luminosidade.",
    "pasta": "inversor-luminosidade-cores"
  },
  {
    "nome": "Galeria.",
    "pasta": "galeria"
  }
];

document.querySelector("section")
  .append(
    Elemento.div(
      { className: "d-flex flex-wrap gap-3" },
      ...lista.map(
        item => (
          Elemento.a(
            {
              className: "bg-body-tertiary d-flex p-3 rounded-4 text-body text-decoration-none",
              href: `./${item.pasta}/`
            },
            Elemento.img({
              src: `./${item.pasta}/favicon.png`,
              alt: "ico",
              className: "rounded-3 shadow-sm",
              style: {
                height: "3rem"
              }
            }),
            Elemento.span(
              { className: "ms-3" },
              item.nome
            )
          )
        )
      )
    )
  );