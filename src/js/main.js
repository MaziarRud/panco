// import $ from 'jquery';
// require('bootstrap-loader');
// require('materialize-css/dist/css/materialize.css');
// require('materialize-css/dist/js/materialize.min.js');
import 'materialize-css/dist/js/materialize.min.js';
// import 'materialize-css/dist/css/materialize.min.css';
// require("materialize-loader");
require('../css/main.scss');

// window.$ = window.jQuery = $;

// document.body.textContent = "Hey there";

//     var div1 = document.createElement('div');
//     div1.classList.add('container');
//     div1.innerText = 'Hello';
//     document.body.appendChild(div1);
//     div1.innerText = "sdfsss";

//     $('.container').text('Hello There');

// let ar = ['one', 'two', 'three'].map(v => `<li class="${v}">${v.repeat(3)}</li>`).join('');

// document.body.insertAdjacentHTML('beforeend', ar);

// jQuery('.one').text('sdfssf')

// $('body').css("background-color", "blue");

$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  }
);
