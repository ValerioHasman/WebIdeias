import Elemento from "Elemento";

export function InputBase(props) {
  return Elemento.div(
    { className: "col-auto" },
    Elemento.input(
      {
        style: {
          width: "2ch",
        },
        className: "text-center form-control-plaintext p-0 lh-1",
        maxLength: 1,
        inputMode: "numeric"
      }
    ).atribuirProps(props)
  );
}