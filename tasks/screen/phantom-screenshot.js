'use strict'

console.log('\n **********************************************************')
console.log('\n Take a moment, I screen all the page of the prototype :) \n')
console.log(' ********************************************************** \n')
var webpage = require('webpage')
var system = require('system')

var page = webpage.create()
var breakpoint = [
   { name: 'palm', width: 320, height: 560 }, // palm
   { name: 'lap', width: 720, height: 560 }, // lap
   { name: 'desk', width: 984, height: 900 } // desk
]
var urls = system.args[1].split(',')
var typeScreen = system.args[2]
var directory = system.args[3]

function handlePage (directory, url) {
  var urlTab = url.split('/')
  var filename = urlTab.pop().replace('.html', '')
  var path = ''

  for (var i = 1; i < urlTab.length; i++) {
    path += urlTab[i] + '/'
  }

  url = directory + url
  page.open(url, function (status) {
    if (status === 'fail') {
      console.log("******** Page " + filename + " can't open *********")
    } else {
      var rendered = false

      breakpoint.forEach(function (point) {
        page.viewportSize = { width: point.width, height: point.height }
        rendered = page.render('test/regression-visuelle/' + typeScreen + '/' + path + '/' + filename + '/' + point.name + '.png')

        if (rendered) {
          console.log('\t ==> ' + filename + ' ' + point.name + ': is screen')
        } else {
          console.log('\t !!!! ==> ' + filename + ' ' + point.name + ': is not screen !!!!')
        }
      })
    }

    nextPage()
  })
}

function nextPage () {
  var url = urls.shift()

  if (!url) {
    phantom.exit(0)
  }

  handlePage('http://127.0.0.1/'+ directory + '/', url)
}

nextPage()
