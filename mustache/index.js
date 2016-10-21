'use strict';
const mu = require('mu2'); // notice the "2" which matches the npm repo, sorry..

mu.root = __dirname;
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
let stream = mu.compileAndRender('page.ejs', data);
let str = '';
stream.on('data', d => {
  str += d.toString();
});
stream.on('end', d => {
  // console.log(str);
  console.log(`cost ${Date.now() - time}ms`);
});



