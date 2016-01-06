'use strict'

var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function() {
  var leds = new five.Leds([11,10,9,6,5,3])
  var timing = 250
  var randomFade = true
  var fadeIndex = 0
  var ledCount = leds.length
  var i
  function fadeNext() {
    var candidateIndex = fadeIndex
    leds[fadeIndex].fadeIn(timing)
    if (randomFade){
      while( candidateIndex === fadeIndex) {
        candidateIndex = Math.round(Math.random() * (ledCount - 1))
      }
    } else {
      candidateIndex =  (fadeIndex < ledCount - 1) ? fadeIndex + 1 : 0
    }
    fadeIndex = candidateIndex
    leds[fadeIndex].fadeOut(timing, fadeNext)
  }
  leds.on()
  leds[fadeIndex].fadeOut(timing, fadeNext)
})
