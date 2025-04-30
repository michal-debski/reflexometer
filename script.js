let startTime = null;
let reactionTimes = [];
let trials = 0;
let maxTrials = 5;
let popup = document.getElementById("popup");
let isGameActive = true;
let bestTime = 0;

let customMaxTrials = null;

function confirmMaxTrials() {
    const input = parseInt(document.getElementById("max-trials").value);
    if (!isNaN(input) && input > 0) {
        customMaxTrials = input;
    }
}

function startGame() {

    maxTrials = customMaxTrials !== null ? customMaxTrials : 5;

    document.getElementById("max-trials").disabled = true;
    document.getElementById("submit-btn").disabled = true;

    trials = 0;
    reactionTimes = [];
    isGameActive = true;

    document.getElementById("table").style.display = "none";

    document.getElementById("shortest-time").innerText = "";
    document.getElementById("worst-time").innerText = "";
    document.getElementById("avg-time").innerText = "";
    document.getElementById("trials").innerText = "";

    startTest();
}


function stopGame() {
    isGameActive = false;
    showResults();
    if (trials === 0) {
        popup.classList.add("open-popup");
    }
    document.getElementById("clicker").style.backgroundColor = getFinishedColor();
    document.getElementById("clicker").value = "You have already finished the game !"
    document.getElementById("clicker").disabled = false;

    customMaxTrials = null;
    document.getElementById("max-trials").disabled = false;
    document.getElementById("submit-btn").disabled = false;
}

function startTest() {

    document.getElementById("clicker").disabled = true;
    document.getElementById("clicker").value = "Wait for new color";

    const delay = Math.floor(Math.random() * 200) + 300;

    setTimeout(() => {
        document.getElementById("clicker").style.backgroundColor = getRandomColor();
        document.getElementById("clicker").value = "Click !"
        document.getElementById("clicker").disabled = false;
        startTime = Date.now();
    }, delay);
}

function handleClick() {
    if (isGameActive) {
        if (startTime) {
            let reactionTime = Date.now() - startTime;
            reactionTimes.push(reactionTime);
            trials++;
            if (trials < maxTrials) {
                startTest();
            } else {
                showResults();
            }
            startTime = null;
        }
        if (trials >= 1) {
            document.getElementById("table").style.display = "block";
        }
    } else {
        alert("You need to restart a game!");
    }
}

function showResults() {
    if (trials !== 0) {
        let shortestTime = Math.min(...reactionTimes);
        let worstTime = Math.max(...reactionTimes);
        let avgTime = reactionTimes.reduce((a, b) => a + b, 1) / reactionTimes.length;
        if (bestTime === 0 || shortestTime < bestTime) {
            bestTime = shortestTime;
        }

        document.getElementById("shortest-time").innerText = shortestTime;
        document.getElementById("worst-time").innerText = worstTime;
        document.getElementById("avg-time").innerText = avgTime;
        document.getElementById("trials").innerText = trials;
        document.getElementById("best-time").innerText = bestTime;
    }

}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getFinishedColor() {
    return '#808080';
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("open-popup")
}

document.addEventListener('DOMContentLoaded', () => {
    popup = document.getElementById("popup");
});
