document.querySelector("body").querySelectorAll("img").forEach(img=>{
  const dados = img.outerHTML.split("\"");
  for(let i = 0; i < img.outerHTML.split("\"").length; i++){
    if(dados[i].match(/..\//)){
      img.src = "https://help.wk.com.br/712/WK/" + dados[i].replaceAll("../", "");
    }
  }
});