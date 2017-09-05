// import $ from 'jquery';
// require('bootstrap-loader');
// require('materialize-css/dist/css/materialize.css');
// require('materialize-css/dist/js/materialize.min.js');
// import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
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

Materialize.updateTextFields();

var slider = document.getElementById('test-slider');
noUiSlider.create(slider, {
 start: [20, 80],
 connect: true,
 step: 1,
 orientation: 'horizontal', // 'horizontal' or 'vertical'
 range: {
   'min': 0,
   'max': 100
 },
 format: wNumb({
   decimals: 0
 })
});
