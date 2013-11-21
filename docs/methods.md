
Any of these configurations should work.

```js
config: {

  pkg: 'package.json',
  foo: 'package.json',
  bar: grunt.file.readJSON('package.json'),
  qux: grunt.file.readJSON('test/fixtures/data/one.json'),
  baz: ['<%= bar %>'],

  meta: {
    one: 'test/fixtures/data/one.json',
    two: 'test/fixtures/data/two.yml',
    three: 'test/fixtures/data/three.json',
    pkg: grunt.file.readJSON('package.json'),
    qux: grunt.file.readJSON('test/fixtures/data/one.json')
  },

  foo: {
    options: {
      metadata: ['<%= pkg %>', '<%= qux %>'],
      metadata: ['<%= config.pkg %>', '<%= config.qux %>'],
      metadata: ['<%= pkg %>', {foo: 'bar'}],
      metadata: ['<%= pkg %>', 'test/fixtures/data/*.{json,yml}'],
      metadata: '<%= config.one %>',
      metadata: 'test/fixtures/data/one.json',
      metadata: ['test/fixtures/data/one.json', 'test/fixtures/data/two.yml'],
      metadata: ['test/fixtures/data/two.yml', {description: 'Foo', name: 'Bar'}, '<%= pkg %>', 'test/fixtures/data/*.json', {alpha: 1, beta: 2 }, {kappa: 3, gamma: 4 }, {zed: {orange: 5, apple: 6 } }, '<%= config.one %>', {name: 'New'}, {quux: '<%= qux %>'}, ['one', {pkg: '<%= config.pkg %>'}, 'three'], {arr: ['one', 'two', 'three']}],
      metadata: ['<%= config.one %>', '<%= config.two %>'], metadata: 'test/fixtures/data/*.{json,yml}',
      metadata: ['test/fixtures/data/*.{json,yml}'],
      metadata: ['test/fixtures/data/*.json', 'test/fixtures/data/*.yml'],
      metadata: ['test/fixtures/data/*.json', '<%= config.two %>'],
      metadata: {
        description: 'Foo',
        name: 'Bar'
      },
      alt: {
        src: 'docs/DOCS.tmpl.md',
        dest: './'
      },
      // This is only for tests,
      // don't use this in real projects!
      test: {
        src: ['test/fixtures/*.tmpl.md'],
        dest: 'test/actual/'
      }
    },
    files: {}
  }
}
```