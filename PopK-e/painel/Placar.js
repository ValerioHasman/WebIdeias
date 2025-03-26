import R from "../../Reactive.js";

export default function Placar(){
  const valor = R.span();

  let num = 0;

  setInterval(()=>{
    valor.innerText = num++;
  },200);

  return R.div({className: "placar" }, valor);
}