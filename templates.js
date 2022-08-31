import { Slim } from './node_modules/slim-js/dist/index.nonminified.js';

let background = "#182125"

Slim.element(
  'mem-index',
  `
    <div style='
    font-size: 1.8vmin;
    cursor: pointer; 
    margin: auto; 
    margin-top: 0.25%;
    width: 95%;
    height: 10%;
    display: flex;
    background-color: var(--primary)'>
        <a style='
        margin: auto;
        margin-left: 5%;'
        id='mem-index-text'>
          {{this.objectType}} : {{this.objectId}}
        </a>
    </div>
  `
)

Slim.element(
  'mem-field',
  `
    <div style='
      font-size: 1.8vmin;
      margin: auto; 
      margin-top: 0.25%;
      margin-bottom: 0.25%;
      width: 95%;
      height: 10%;
      display: flex;
      background-color: var(--primary)
    '>
      <text style='
      margin: auto;
      margin-left: 1%;'>
        {{this.field}} : {{this.value}}
      </text>
    </div>
  `
)

Slim.element(
  'ship-object',
  `
    <div style='
      font-size: 1.5vmin;
      margin: 4%; 
      width: 95%;
      min-width: 10%
      display: block;
      flex-direction: column;
      background-color: var(--primary);
      text-align: left;
    '>
    <div>
      <text style='margin: auto; margin-left: 1%;'>UUID : {{this.uuid}}</text>
    </div>
    <div>
      <text style='margin: auto; margin-left: 1%;'>Damage : {{this.damage}}</text>
    </div>
    <div>
      <text style='margin: auto; margin-left: 1%;'>Max Energy : {{this.maxEnergy}}</text>
    </div>
    <div>
      <text style='margin: auto; margin-left: 1%;'>Energy : {{this.energy}}</text>
    </div>
    <div>
      <text style='margin: auto; margin-left: 1%;'>Metal : {{this.metal}}</text>
    </div>
    <div>
      <text style='margin: auto; margin-left: 1%;'>Water : {{this.water}}</text>
    </div>
  `
)