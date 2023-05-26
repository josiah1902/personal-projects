$(document).ready(function(){
    let pageContent = $("#page-content").innerHTML;
    pageContent = '<>'
    let ajax = new XMLHttpRequest();
    const gifTags = ["animal", "coding","food","games","basketball","football","golf","funny","summer","dancing","singing","tennis"];
    const chosenTags = new Array;
    let key = 'HDgSJ18OIi0AawBysTcJU5VcbU4einEz';
    let random = Math.floor(Math.random() * gifTags.length);
    let randomGif = gifTags[random];
    let round = 1;
    let guessesRemaining = 3;
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=1&tag=${randomGif}`;

    let roundNum = document.getElementById("round-number");
    let gif = document.getElementById("gif-holder");
    let categories = document.getElementById("categories");
    let guessesNum = document.getElementById("guesses-number");
    guessesNum.innerHTML = guessesRemaining;

    $(".tagBtn").click(function(){
        // checks that the player has enough guesses 
        if (guessesRemaining == 0){
            alert("You have no more guesses");
        } else if (this.style.color == "white"){
            let removeTag = chosenTags.indexOf(this);
            chosenTags.splice(removeTag, 1);
            this.style.color = "#535252";
            guessesRemaining++;
            guessesNum.innerHTML = guessesRemaining;
        } else {
            guessesRemaining--;
            chosenTags.push(this.innerHTML);
            this.style.color = "white";
            guessesNum.innerHTML = guessesRemaining;
        };

        // if (){

        // } else {

        // }


        
    });

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            //console.log(ajax.responseText);
            var jsonData = JSON.parse(ajax.responseText);
            console.log(jsonData);
            // grabs the data from the single GIF, allowing the attributes to be accessed
            var data = jsonData['data']; 
            console.log(data.rating);

            //htmlTest = `${data.rating}`;
            // roundNum.innerHTML = round;
            // categories.innerHTML = randomGif;
            // gif.style.backgroundImage = `url("${data.images.downsized_large.url}")`;



        };
    };

    ajax.open('GET', `${url}`, true);
    ajax.send();


});


