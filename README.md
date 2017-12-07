# grunt-visual-regression

> visual regression test

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-visual-regression --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-visual-regression');
```

## The "visual_regression" task

### Overview
In your project's Gruntfile, add a section named `visual_regression` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  visual_regression: {
    reference: {
      action: 'reference',
      files: [{
        expand: true,
        cwd: 'public',
        src: ['**/*.html', '!dashboard/*.html', '!index.html'],
        dest: 'test/regression-visuelle'
      }],
    },
    current: {
      action: 'current',
      files: [{
        expand: true,
        cwd: 'public',
        src: ['**/*.html', '!dashboard/*.html', '!index.html'],
        dest: 'test/regression-visuelle'
      }],
    },
    difference: {
      action: 'difference',
      files: [{
        expand: true,
        cwd: 'test/regression-visuelle/reference',
        src: ['**/*.png'],
        dest: 'test/regression-visuelle/difference'
      }],
    }
  },
});

grunt.registerTask('screen', ['screen:current', 'screen:difference'])
grunt.registerTask('screen:reference', ['clean:reference', 'visual_regression:reference'])
grunt.registerTask('screen:current', ['clean:current', 'visual_regression:current'])
grunt.registerTask('screen:difference', ['clean:difference', 'visual_regression:difference'])
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  visual_regression: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  visual_regression: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
