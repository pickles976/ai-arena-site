import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import { stopGame, setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode} from './node_modules/ai-arena/dist/index.js'
import { getCodeFromEditor } from './editor.js'

let startTime = performance.now()

// INITIALIZATION
console.log(testPackage())

const canvas = document.getElementById("game-canvas")
setCanvas(canvas)
canvas.getContext('2d').fillRect(0,0,2000,2000)

setBaseStartCode(0,BaseStart)
setBaseUpdateCode(0,BaseUpdate)
setShipStartCode(0,ShipStart)
setShipUpdateCode(0,ShipUpdate)
setBaseStartCode(1,BaseStart)
setBaseUpdateCode(1,BaseUpdate)
setShipStartCode(1,ShipStart)
setShipUpdateCode(1,ShipUpdate)

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
    setBaseStartCode(0,code["Base Start"])
    setBaseUpdateCode(0,code["Base Update"])
    setShipStartCode(0,code["Ship Start"])
    setShipUpdateCode(0,code["Ship Update"])
};
document.getElementById("compile").addEventListener("click", compile)

let run = event => {
    startTime = performance.now()
    runGame()
}
document.getElementById("run").addEventListener("click", run)

let stop = event => {
    stopGame()
}
document.getElementById("stop").addEventListener("click", stop)

var callback = function(){

    const start = performance.now()

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

    document.getElementById('timer').innerHTML = 'Timesteps: ' + ((performance.now() - startTime) * 60 / 1000).toFixed(0)

    drawMemoryTags(memoryList,getGameState())

    console.log(performance.now() - start)
}

setUICallbacks(callback)


const traverseObject = function(element,obj,tabs){

    for(const field in obj){
        if (typeof obj[field] !== 'function'){

            // if (typeof obj[field] == 'object'){
            //     traverseObject(element,obj[field],tabs+1)
            // }

            const child = document.createElement('mem-field')
            // child.field = '\t'.repeat(tabs) + field
            child.field = field
            child.value = obj[field]
            element.appendChild(child)
        }
    }

}

const memoryIndexClick = function(obj){

    const element = document.getElementById('memory-inspector')
    removeChildren(element)

    let tabs = 0
    traverseObject(element,obj,tabs)

}

// add single item component to list
const addMemoryIndex = function(element,obj){
    const child = document.createElement('mem-index')
    child.objectType = obj.type
    child.objectId = obj.uuid

    // add callback to open memory inspector here
    child.addEventListener("click",()=>{memoryIndexClick(obj)})
    element.appendChild(child)
}

const memoryList = document.getElementById('memory-list')

// draw the actual items in the list
const drawMemoryTags = function(element,memDump){

    removeChildren(element)

    for(let i = 0; i < memDump.length; i++){
        const obj = memDump[i]
        if (obj != undefined)
            addMemoryIndex(element,obj)
    }
}

const removeChildren = function(element){
    var child = element.lastElementChild; 
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}