'use strict';
const ejs = require('ejs');
const read = require('fs').readFileSync;
let data = {
  title: 'test',
  cssURL: 'style.css',
  jsURL: 'script.js',
  name: 'ykan'
};
let names = [];
for (let i = 10000; i >= 0 ; i--) {
  names.push({
    name: 'test' + i
  });
}
data.names = names;
let time = Date.now();
let path = __dirname + '/page.ejs';
let pageStr = read(path, 'utf8');
let ret = ejs.compile(pageStr, {filename: path})(data);
console.log(`cost ${Date.now() - time}ms`);
