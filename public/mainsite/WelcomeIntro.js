let quote = document.getElementById("quote");

let quotes = ["brave", "deserving", "awesome","Fearless!", "not alone"]

var i = 0


setInterval(() => {

    if(i == quotes.length)
        i = 0;

    quote.innerText = quotes[i];
    i++;

    


    
}, 1000);