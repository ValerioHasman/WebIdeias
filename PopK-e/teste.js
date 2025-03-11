(function () {
  let scripttedin = document.createElement('script');
  scripttedin.src = "https://cdn.jsdelivr.net/npm/eruda";
  document.body.append(scripttedin);
  scripttedin.onload = function () { 
    eruda.init();
    if(navigator.userAgent.toLowerCase().includes("tv")){
      eruda.show();
    }
  }
})();
