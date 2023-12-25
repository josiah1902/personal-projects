
export function tagURLReset(gifTags, random, gif, tags){
    gif = gifTags[random];
    tags = [];
};

export function display(){
    
};

export function update(round, lives){
    let roundNum = document.getElementById("round-number");
    let livesNum = document.getElementById("lives-number");
    roundNum.innerHTML = round;
    livesNum.innerHTML = lives;
};
