let quote = document.getElementById("quote");

let quotes = ["brave", "deserving", "awesome","Fearless!", "not alone"]

var i = 0


setInterval(() => {

    if(i == quotes.length)
        i = 0;

    const currentQuote = quote[i];

    

    quote.innerText = quotes[i];
    i++;

    if(quote.innerText === "Fearless!"){
        quote.style.color = "#ff0000"
    }
    else {
        quote.style.color = "white";
    }


    
}, 1000);