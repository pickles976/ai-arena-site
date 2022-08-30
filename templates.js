import { Slim } from './node_modules/slim-js/dist/index.nonminified.js';

let background = "#182125"

Slim.element(
  'mem-index',
  `
    <div style='
    cursor: pointer; 
    margin: auto; 
    margin-top: 0.5%;
    margin-bottom: 0.5%;
    width: 95%;
    height: 10%;
    display: flex;
    background-color: var(--secondary)'>
        <a style='
        margin: auto;
        margin-left: 5%;'
        id='mem-index-text'>{{this.objectType}} : {{this.objectId}}</a>
    </div>
  `
)

Slim.element(
  'mem-field',
  `
    <div>
      <text class='mem-field-text'>{{this.field}} : {{this.value}}</text>
    </div>
  `
)