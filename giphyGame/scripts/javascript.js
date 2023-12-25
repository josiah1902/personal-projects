import {
    display,
    update,
    tagURLReset
    } from './functions.js';

$(document).ready(function(){
    let pageContent = document.getElementById("page-content");
    let originalContent = `<div id="overlay-confirm">
            <span class="overlay-message">Are you sure you want to choose these tags?</span>
            <span id="overlay-tags">hey</span>
            <div class="overlay-buttons">
                <p class="overlay-choice" id="confirm-button">Continue</p>
                <p class="overlay-choice" id="back-button">Go back</p>
            </div>
        </div>
        <div id="overlay-blur">
                &nbsp;
        </div>
        <div id="page-content">
            <div class="content-tags">
                <h2>Guess which tags the GIF will have!</h2>
                <span class="guesses-remaining">Guesses Remaining: <span id="guesses-number"></span></span>
                <div class="tags">
                    <div class="tag-list">
                        <ul class="tag-line">
                            <li class="tagBtn">animal</li>
                            <li class="tagBtn">coding</li>
                            <li class="tagBtn">food</li>
                            <li class="tagBtn">games</li>
                            <li class="tagBtn">basketball</li>
                            <li class="tagBtn">football</li>
                        </ul>
                        <ul class="tag-line">
                            <li class="tagBtn">golf</li>
                            <li class="tagBtn">funny</li>
                            <li class="tagBtn">summer</li>
                            <li class="tagBtn">dancing</li>
                            <li class="tagBtn">singing</li>
                            <li class="tagBtn">tennis</li>
                        </ul>
                    </div>
                </div>
                <span class="confirmBtn">Confirm Tags</span>
            </div>
        </div> `;
        // BREAK BETWEEN CONTENT ////
        /////////////////////////////
    let newContent = `<div class="grid-container">
                <div class="grid-item round">
                    <h1 id="round">Round <span id="round-number">0;</span></h1>
                </div>
                <div class="grid-item gif">
                    <div id="gif-holder">
                        &nbsp;
                    </div>
                </div>
                <div class="grid-item your-guesses">
                    <div class="guesses-container">
                        <h2>Your Guesses:</h2>
                        <p id="user-categories">Cheese, Comedy, Funny</p>
                    </div>
                </div>
                <div class="grid-item tags">
                    <div class="tags-container">
                        <h2>GIF's Tag:</h2>
                        <p id="categories">0</p>
                    </div>              
                </div>
            </div>
            <div class="lives">
                <h3>Lives: <span id="lives-number"></span></h3>
            </div>
            <div id="results-container">
                    <h2 id="result-message">Testing</h2>
                    <p id="result-action">Testing</p>
                    <div class="results-buttons">
                        <p id="retry-continue">Retry/Continue</p>
                        <p id="quit"><a href="../index.html">Quit</a></p>
                    </div>
            </div>
        </div>`;



    const gifTags = ["animal", "coding","food","games","basketball","football","golf","funny","summer","dancing","singing","tennis"];
    const chosenTags = new Array;
    let key = 'HDgSJ18OIi0AawBysTcJU5VcbU4einEz';
    let random = Math.floor(Math.random() * gifTags.length);
    let loadInfo = new XMLHttpRequest();
    let randomGif = gifTags[random];
    let round = 1;
    let livesLeft = 5;
    let guessesRemaining = 3;
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=1&tag=${randomGif}`;

    let guessesNum = document.getElementById("guesses-number");
    let overlayConfirm = document.getElementById("overlay-confirm");
    let blur = document.getElementById("overlay-blur");
    guessesNum.innerHTML = guessesRemaining;

    $(document).on("click", ".tagBtn", function(){
        // checks to see is the selected tag is already selected or not
        // if already selected will remove from array and change color back to default
        // updates guesses remaining on the screen to show the user how many guesses they have remaining
        let guessesNum = document.getElementById("guesses-number");
        if (this.style.color == "white"){
            let removeTag = chosenTags.indexOf(this.innerHTML);
            chosenTags.splice(removeTag, 1);
            this.style.color = "#535252";
            guessesRemaining++;
            guessesNum.innerHTML = guessesRemaining;
        } else if (guessesRemaining == 0){
            //checks that the player still has guesses left
            alert("You have no more guesses");
        } else {
            // changes color of selected tag to indicate that it is chosen
            // add tag to an array for future use of the tag
            // updates the remaining guesses to the user
            guessesRemaining--;
            chosenTags.push(this.innerHTML);
            this.style.color = "white";
            guessesNum.innerHTML = guessesRemaining;
        };
    });

    // $(".tagBtn").click(function(){
    //     // checks to see is the selected tag is already selected or not
    //     // if already selected will remove from array and change color back to default
    //     // updates guesses remaining on the screen to show the user how many guesses they have remaining
    //     if (this.style.color == "white"){
    //         let removeTag = chosenTags.indexOf(this.innerHTML);
    //         chosenTags.splice(removeTag, 1);
    //         this.style.color = "#535252";
    //         guessesRemaining++;
    //         guessesNum.innerHTML = guessesRemaining;
    //     } else if (guessesRemaining == 0){
    //         //checks that the player still has guesses left
    //         alert("You have no more guesses");
    //     } else {
    //         // changes color of selected tag to indicate that it is chosen
    //         // add tag to an array for future use of the tag
    //         // updates the remaining guesses to the user
    //         guessesRemaining--;
    //         chosenTags.push(this.innerHTML);
    //         this.style.color = "white";
    //         guessesNum.innerHTML = guessesRemaining;
    //     };
    
    // });

    $(document).on("click", ".confirmBtn", function(){
        if (guessesRemaining != 0){
            alert("You still have guesses remaining!");
        } else {
            overlayConfirm.style.display = "block";
            let overlayTags = `${chosenTags[0]}, ${chosenTags[1]}, ${chosenTags[2]}`;
            let tags = document.getElementById("overlay-tags");
            tags.innerHTML = overlayTags;
            blur.style.display = "block";
        };
    });

    $(document).on("click", "#back-button", function(){
        overlayConfirm.style.display = "none";
        blur.style.display = "none";
    });

    // $("#back-button").click(function(){
    //     overlayConfirm.style.display = "none";
    //     blur.style.display = "none";
    // });

    //  $("#confirm-button").click(function(){
    //     loadInfo.open('GET', `${url}`, true);
    //     loadInfo.send();
    //     blur.style.display = "none";
    //     overlayConfirm.style.display = "none";
    // });

    $(document).on("click", "#confirm-button", function(){
        loadInfo.open('GET', `${url}`, true);
        loadInfo.send();
        blur.style.display = "none";
        overlayConfirm.style.display = "none";
    });

    

    // function showResults(){
    //     const resultsH2 = document.createElement("h2");
    //     resultsH2.id = "result-message";
        
    //     const resultsAction = document.createElement("p");
    //     resultsAction.id = "result-action";

    //     const resultsBtns = document.createElement("div");
    //     resultsBtns.id = "result-buttons";
    // };

    // ajax.onreadystatechange = function(){
    //     if(ajax.readyState == 4 && ajax.status == 200){
    //         // console.log(ajax.responseText);
    //         // var jsonData = JSON.parse(ajax.responseText);
    //         // console.log(jsonData);
    //         //  grabs the data from the single GIF, allowing the attributes to be accessed
    //         // var data = jsonData['data']; 
    //         // console.log(data.rating);
    //         pageContent.innerHTML = newContent; 
    //     };
    // };


    loadInfo.onreadystatechange = function(){
        if(loadInfo.readyState == 4 && loadInfo.status == 200){
            pageContent.innerHTML = newContent; 
            var jsonData = JSON.parse(loadInfo.responseText);
            var data = jsonData['data']; 
            let roundNum = document.getElementById("round-number");
            let gif = document.getElementById("gif-holder");
            let categories = document.getElementById("categories");
            let userCategories = document.getElementById("user-categories");
            let lives = document.getElementById("lives-number");
            let resultMessage = document.getElementById("result-message");
            let resultAction = document.getElementById("result-action");
            let retryContinue = document.getElementById("retry-continue");
            let correct = Boolean;
            userCategories.innerHTML = `${chosenTags[0]}, ${chosenTags[1]}, ${chosenTags[2]}`;
            categories.innerHTML = randomGif;
            gif.style.backgroundImage = `url("${data.images.downsized_large.url}")`;
            update(round, livesLeft);

            if (chosenTags.includes(randomGif)){
                // THE USER CORRECTLY GUESSED THE TAG
                resultAction.innerHTML = "You correctly guessed the GIF category";
                resultMessage.innerHTML = "Congratulations!";
                resultMessage.style.color = "#2bf22b";
                correct = true;

               retryContinue.innerHTML = "Continue";
            } else {
                // USER INCORRECTLY GUESSED THE TAG
                resultAction.innerHTML = "You didn't guess the GIF category correctly";
                resultMessage.innerHTML = "Oh no!";
                retryContinue.innerHTML = "Retry";
                correct = false;
            };

            $("#retry-continue").click(function(){
                guessesRemaining = 3;
                if (correct){
                    round++;
                    pageContent.innerHTML = originalContent;
                } else {
                    lives--;
                    pageContent.innerHTML = originalContent;
                };
                randomGif = gifTags[random];
                // HOTFIX THAT PREVENTS NUMBER OF GUESSES FROM NOT SHOWING UP WHEN A NEW GUESS SCREEN POPS UP
                let guessesNum = document.getElementById("guesses-number");
                guessesNum.innerHTML = guessesRemaining;
            });
        };
    };
});


