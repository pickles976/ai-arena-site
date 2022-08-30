import { Slim } from './node_modules/slim-js/dist/index.nonminified.js';

Slim.element(
  'mem-index',
  `
    <li class='mem-list-object'>
        <div id='mem-index'>
            <text id='mem-index-text'>{{this.objectName}}</text>
        </div>
    </li>
  `
)