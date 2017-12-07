'use strict'

console.log('\n **********************************************************')
console.log('\n Take a moment, I screen all the page of the prototype :) \n')
console.log(' ********************************************************** \n')
var webpage = require('webpage')
var system = require('system')
var breakpoint = [
   { name: 'palm', width: 320, height: 560 }, // palm
   { name: 'lap', width: 720, height: 560 }, // lap
   { name: 'desk', width: 984, height: 900 }, // desk
   { name: 'desk-larger', width: 1400, height: 900 } // desk-larger
]
var urls = system.args[1].split(',')
var typeScreen = system.args[2]
var finish = 0
var numberOfUrl = urls.length

function handlePage (url) {
  var page = webpage.create()

  var urlTab = url.split('/')
  var filename = urlTab.pop().replace('.html', '')
  var path = ''

  for (var i = 1; i < urlTab.length; i++) {
    path += urlTab[i] + '/'
  }

  page.open(url, function (status) {
    breakpoint.forEach(function (point) {
      page.viewportSize = { width: point.width, height: point.height }
      page.render('test/regression-visuelle/' + typeScreen + '/' + path + '/' + filename + '/' + point.name + '.png')
      page.close()
    })

    console.log(status === 'fail' ? ' /!\ ' : ' ' + filename + ' :' + status)

    finish++

    if (finish === numberOfUrl) {
      phantom.exit()
    }
  })

  nextPage()
}

function nextPage () {
  var url = urls.shift()

  if (url) {
    handlePage(url)
  }
}

nextPage()
