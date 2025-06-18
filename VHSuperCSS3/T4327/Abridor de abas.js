let rodar = true;
async function abrir() {
    const lista = document.querySelectorAll("li.book:not(.expanded):not(.expanding):not(.loading-book)");
    for(const item of lista){
        await new Promise((resolve)=>{
            if(item.className.includes("expanded") || item.className.includes("loading-book")){
                resolve();
            } else {
                item.focus();
                item.click();
                setTimeout(()=>{
                    resolve();
                },0);
            }
        });
    }
    if (rodar && lista.length != 0) {
        setTimeout(()=>{
            abrir();
        }, 5000);
    } else {
        console.log("Exit!");
    }
    console.log("Ok!");
}
abrir();