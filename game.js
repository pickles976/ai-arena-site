import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import { setRealTime, stopGame, setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode} from './node_modules/ai-arena/dist/index.js'
import { getCodeFromEditor } from './editor.js'


let PAUSED = false;
let REALTIME = true;
let RUNNING = false;

let startTime = performance.now()

// INITIALIZATION
console.log(testPackage())

const memoryList = document.getElementById('memory-select')

const canvas = document.getElementById("game-canvas")
setCanvas(canvas)
const ctx = canvas.getContext('2d')
ctx.fillRect(0,0,2000,2000)

setBaseStartCode(0,BaseStart)
setBaseUpdateCode(0,BaseUpdate)
setShipStartCode(0,ShipStart)
setShipUpdateCode(0,ShipUpdate)

let uuid = undefined

let pause = event => {
    togglePause()
    PAUSED = !PAUSED
    document.getElementById("pause").innerHTML = PAUSED ? "Play" : "Pause"
};
document.getElementById("pause").addEventListener("click", pause)

let step = event => {
    stepFrame()
    PAUSED = true
    document.getElementById("pause").innerHTML = "Play"
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

    if (RUNNING)
        stopGame()
    else
        runGame()

    RUNNING = !RUNNING
    document.getElementById("run").innerHTML = RUNNING ? "Stop" : "Run"
}
document.getElementById("run").addEventListener("click", run)

let warp = event => {
    if(PAUSED){
        togglePause()
        PAUSED = false
    }
    REALTIME = !REALTIME
    setRealTime(REALTIME)
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("warp").innerHTML = REALTIME ? "Warp" : "Normal"
}
document.getElementById("warp").addEventListener("click", warp)

var callback = function(){

    const start = performance.now()

    const teamInfo = getGameInfo()
    const team0 = teamInfo['team 0']
    const team1 = teamInfo['team 1']

    document.getElementById('team0-kills').innerHTML = team0["kills"]
    document.getElementById('team0-deaths').innerHTML = team0["deaths"]
    document.getElementById('team0-metal').innerHTML = Math.round(team0["metal"])
    document.getElementById('team0-energy').innerHTML = Math.round(team0["energy"])

    document.getElementById('team1-kills').innerHTML = team1["kills"]
    document.getElementById('team1-deaths').innerHTML = team1["deaths"]
    document.getElementById('team1-metal').innerHTML = Math.round(team1["metal"])
    document.getElementById('team1-energy').innerHTML = Math.round(team1["energy"])

    document.getElementById('timer').innerHTML = 'Timesteps: ' + ((performance.now() - startTime) * 60 / 1000).toFixed(0)


    //

    const gameState = getGameState()

    drawMemoryTags(memoryList,gameState)

    const currentObj = (gameState.filter((obj) => obj && obj.uuid === uuid) || [undefined])[0]

    if(currentObj)
        populateMemoryPanel(currentObj)

    const ships = getShipsInfo()

    if (ships['team0'] && ships['team1'])
        populateShipPanel(ships)

    console.log(performance.now() - start)
}

setUICallbacks(callback)


const populateShipPanel = function(ships){
    const element = document.getElementById('ship-panel')
    removeChildren(element) // clear all the old fields

    for(const field in ships){

        const label = document.createElement('label')
        label.innerHTML = field
        element.appendChild(label)

        for (const obj of ships[field]){
            const child = document.createElement('ship-object')
            child.uuid = obj.uuid
            child.damage = obj.damage
            child.energy = obj.resources.energy.toFixed(1) + '/' + obj.maxEnergy
            child.metal = obj.resources.metal.toFixed(1)
            child.water = obj.resources.water.toFixed(1)
            child.addEventListener("click",()=>{memoryIndexClick(obj)})
            element.append(child)
        }

    }

}

// This is what populates the memory panel with the fields of a selected object
const populateMemoryPanel = function(obj){
    const element = document.getElementById('memory-inspector')
    removeChildren(element) // clear all the old fields

    let tabs = 0
    // draw a circle
    drawCircle(obj.transform.position)
    traverseObject(element,obj,tabs)
}

// Traverse the object as a tree and print out its fields
const traverseObject = function(element,obj,tabs){

    for(const field in obj){
        if (typeof obj[field] !== 'function'){

            if (typeof obj[field] == 'object'){
                const child = document.createElement('mem-field')
                child.field = '\u2003'.repeat(tabs) + field.toUpperCase()
                child.value = ''
                element.appendChild(child)
                traverseObject(element,obj[field],tabs+1)
            }else{
                const child = document.createElement('mem-field')
                child.field = '\u2003'.repeat(tabs) + field.toUpperCase()
                child.value = obj[field]
                element.appendChild(child)
            }
        }
    }

}

// index click callbacks
const memoryIndexClick = function(obj){
    uuid = obj.uuid
    populateMemoryPanel(obj)
}

// Each index in the memory list has a callback
const addMemoryIndex = function(element,obj){
    const child = document.createElement('mem-index')
    child.objectType = obj.type
    child.objectId = obj.uuid

    // add callback to open memory inspector here
    child.addEventListener("click",()=>{memoryIndexClick(obj)})
    element.appendChild(child)
}

// Draw the list of memory objects that are clickable
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

const drawCircle = function(pos){

    ctx.restore()

    ctx.fillStyle = "#FFFF00"
    ctx.globalAlpha = 0.3
    ctx.beginPath()
    ctx.arc(pos.x,pos.y,25,0,Math.PI*2)
    ctx.fill()
    ctx.globalAlpha = 1.0
}