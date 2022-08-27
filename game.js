import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import {setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode} from './node_modules/ai-arena/dist/index.js'
import { getCodeFromEditor } from './editor.js'


// INITIALIZATION
console.log(testPackage())
setCanvas(document.getElementById("game-canvas"))
setBaseStartCode(BaseStart)
setBaseUpdateCode(BaseUpdate)
setShipStartCode(ShipStart)
setShipUpdateCode(ShipUpdate)

let pause = event => {
    console.log("Paused")
    console.log(getGameState())
    togglePause()
};
document.getElementById("pause").addEventListener("click", pause)

let step = event => {
    stepFrame()
};
document.getElementById("step").addEventListener("click", step)

let compile = event => {
    var code = getCodeFromEditor()
    console.log(code["Base Update"])
    console.log(BaseUpdate)
    setBaseStartCode(code["Base Start"])
    setBaseUpdateCode(code["Base Update"])
    setShipStartCode(code["Ship Start"])
    setShipUpdateCode(code["Ship Update"])
};
document.getElementById("compile").addEventListener("click", compile)

let run = event => {
    runGame()
}
document.getElementById("run").addEventListener("click", run)

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

    const ships = getShipsInfo()
    document.getElementById('team0-ships').innerHTML = ships['team0']
    document.getElementById('team1-ships').innerHTML = ships['team1']
}

setUICallbacks(callback)