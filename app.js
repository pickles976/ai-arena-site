import {setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode} from './node_modules/ai-arena/dist/index.js'

console.log(testPackage())
setCanvas(document.getElementById("game-canvas"))
runGame()

let pause = event => {
    console.log("Paused")
    togglePause()
};
document.getElementById("pause").addEventListener("click", pause)

let step = event => {
    stepFrame()
};
document.getElementById("step").addEventListener("click", step)

var callback = function(){
    const teamInfo = getGameInfo()
    const team0 = teamInfo['team 0']
    const team1 = teamInfo['team 1']

    document.getElementById('team0-kills').innerHTML = team0["kills"]
    document.getElementById('team0-deaths').innerHTML = team0["deaths"]
    document.getElementById('team0-metal').innerHTML = team0["metal"]
    document.getElementById('team0-energy').innerHTML = team0["energy"]

    document.getElementById('team1-kills').innerHTML = team1["kills"]
    document.getElementById('team1-deaths').innerHTML = team1["deaths"]
    document.getElementById('team1-metal').innerHTML = team1["metal"]
    document.getElementById('team1-energy').innerHTML = team1["energy"]
}

setUICallbacks(callback)

setShipStartCode()
setShipUpdateCode()