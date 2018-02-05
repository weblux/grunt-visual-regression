'use strict'

module.exports = function (grunt) {
  grunt.registerMultiTask('grunt_visual_regression', 'a visual regression plugin', function () {
    var action = this.data.action
    var files = this.filesSrc

    if (action === 'reference' || action === 'current') {
      if (files.length === 0) {
        grunt.log.error('************* No public page found :(, please generate public with grunt  ****************')
        return
      }

      var path = require('path')
      var execSync = require('child_process').execSync
      var phantomjs = require('phantomjs-prebuilt')
      var directory = /www\/(.*)/g.exec(process.cwd().replace(/\\/g, '/'))

      var cmd = phantomjs.path + ' ' + path.join(__dirname, 'screen/phantom-screenshot.js ') + files.join() + ' ' + action + ' ' + directory[1]

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

      nextDiff(this.data.options)

      function nextDiff (options) {
        var file = files.shift()

        if (!file) return

        var pathImg = file.split('reference/')[1]
        var referenceImg = 'test/regression-visuelle/reference/' + pathImg
        var currentImg = 'test/regression-visuelle/current/' + pathImg
        var differenceImg = 'test/regression-visuelle/difference/' + pathImg
        var threshold = options.threshold // 0.1: strict // 1: pass
        var AA = options.antiAliasing

        wait.for.promise(imgDiff({
          actualFilename: referenceImg,
          expectedFilename: currentImg,
          diffFilename: differenceImg,
          options: {
            threshold: threshold,
            includeAA: AA,
            generateOnlyDiffFile: true
          }
        }).then(function (results) {
          var nbPixels = results.width * results.height
          var diff = (results.diffCount / nbPixels).toFixed(2)

          if (results.imagesAreSame) {
            grunt.log.writeln((pathImg + ' is OK :) // Difference: ' + diff + '%'))
          } else {
            grunt.log.writeln((pathImg + ' is changed ! :( // Difference: ' + diff + '%')['red'])
          }

          nextDiff(options)
        }))
      }
    }
  })
}
