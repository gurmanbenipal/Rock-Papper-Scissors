/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_LOOKUP = {
    r:{img: 'imgs/rock.png', beats: 's'},
    p:{img: 'imgs/paper.png', beats: 'r'},
    s:{img: 'imgs/scissors.png', beats: 'p'},
};
/*----- app's state (variables) -----*/
let scores;

let results;

let winner;

/*----- cached element references -----*/

const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');
const countdownEl = document.getElementById('countdown');
/*----- event listeners -----*/

document.querySelector('main')
.addEventListener('click', handleChoice);
/*----- functions -----*/
init()
//initialize all state, then call render();
function init(){
    scores = {
        p: 0,
        t: 0,
        c: 0
    };
results ={
    p: 'r',
    c: 'r'
};
winner = 't';
render();
};
// In response to user interaction , player makes a move.
// we update all impacted state, then finally call render
function handleChoice(evt){
//guards (do nth unless one of the three buttons are clicked)

 if (evt.target.tagName !== 'BUTTON') return;
//  console.log(evt.target.tagName)
results.p = evt.target.innerText.toLowerCase();
//computer a random choice for the computer
results.c = getRandomRPS();
winner = getWinner();
scores[winner]++;
render();
}

function getWinner(){
  if(results.p === results.c) return 't';
  return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c'
}

function getRandomRPS(){
    const rps = Object.keys(RPS_LOOKUP);
    const rndIdx = Math.floor(Math.random() * rps.length);
    return rps[rndIdx];
}

function renderScores(){
   for(let key in scores){
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key];
   }
}

function renderResults(){
    pResultEl.src = RPS_LOOKUP[results.p].img;
    cResultEl.src = RPS_LOOKUP[results.c].img;
    pResultEl.style.borderColor = winner === 'p' ? 'grey' : 'white';
    cResultEl.style.borderColor = winner === 'c' ? 'grey' : 'white';
}
// render function trasfer or visualize all state to the DOM
function render(){
    renderCountdown(function(){
        renderScores();
        renderResults();
    });
  

}

function renderCountdown(cb){
    let count = 3;
    AUDIO.currentTime = 0;
    AUDIO.play();
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;
    const timerID = setInterval(function(){
        count--;
        if(count){
            countdownEl.innerText = count;
        }else{
            clearInterval(timerID);
            countdownEl.style.visibility = 'hidden';
            cb();
        }
    },1000)

}