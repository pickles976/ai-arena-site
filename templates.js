import { Slim } from './node_modules/slim-js/dist/index.nonminified.js';

Slim.element(
  'mem-index',
  `
    <li class='mem-list-object'>
        <div id='mem-index'>
            <text id='mem-index-text'>{{this.objectType}} : {{this.objectId}}</text>
        </div>
    </li>
  `
)

Slim.element(
  'mem-field',
  `
    <li>
      <div id='mem-field'>
        <text class='mem-field-text'>{{this.field}} : {{this.value}}</text>
      </div>
    </li>
  `
)