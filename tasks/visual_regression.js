'use strict'

module.exports = function (grunt) {
  grunt.registerMultiTask('grunt_visual_regression', 'The best Grunt plugin ever.', function () {
    var action = this.data.action
    var files = this.filesSrc

    if (action === 'reference' || action === 'current') {
      var path = require('path')
      var execSync = require('child_process').execSync
      var phantomjs = require('phantomjs-prebuilt')
      var cmd = phantomjs.path + ' ' + path.join(__dirname, 'screen/phantom-screenshot.js ') + files.join() + ' ' + action

      execSync(cmd, {
        stdio: [0, 1, 2]
      })
    } else {
      if (files.length === 0) {
        grunt.log.error('************* No file reference found :( ****************')
        return
      }

      const { imgDiff } = require('img-diff-js')
      var wait = require('wait-for-stuff')

      nextDiff()

      function nextDiff () {
        var file = files.shift()

        if (!file) return

        var pathImg = file.split('reference/')[1]
        var referenceImg = 'test/regression-visuelle/reference/' + pathImg
        var currentImg = 'test/regression-visuelle/current/' + pathImg
        var differenceImg = 'test/regression-visuelle/difference/' + pathImg
        var threshold = 0.1 // 0.1: strict // 1: pass
        var AA = false

        wait.for.promise(imgDiff({
          actualFilename: referenceImg,
          expectedFilename: currentImg,
          diffFilename: differenceImg,
          options: {
            threshold: threshold,
            includeAA: AA
          }
        }).then(function (results) {
          var nbPixels = results.width * results.height
          var diff = Math.round(results.diffCount / nbPixels * 100) / 100

          if (results.imagesAreSame) {
            grunt.log.writeln((pathImg + ' is OK :) // Difference: ' + diff + '%'))
          } else {
            grunt.log.writeln((pathImg + ' is changed ! :( // Difference: ' + diff + '%')['red'])
          }

          nextDiff()
        }))
      }
    }
  })
}
