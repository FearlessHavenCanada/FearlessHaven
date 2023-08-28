let quote = document.getElementById("quote");

let quotes = ["Hey there!", "مرحبًا يا من هناك", "привіт", "Salut!","Привет!", "هې هلته", "హే అక్కడ"];


quote.innerText = quotes[0]

var i = 1


setInterval(() => {

    if(i == quotes.length)
        i = 0;

    quote.innerText = quotes[i];
    i++;

    


    
}, 2000);