import { Slim } from './node_modules/slim-js/dist/index.nonminified.js';

Slim.element(
  'mem-index',
  `
  <div>
    <text id='mem-index-text'>{{this.objectType}} : {{this.objectId}}</text>
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