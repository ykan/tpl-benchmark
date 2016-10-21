'use strict';
const engine = require('marko');
require('marko/node-require').install();
let data = {
  title: 'test',
  cssURL: 'style.css',
  jsURL: 'script.js',
  name: 'ykan'
};
let names = [];
for (let i = 1000000; i >= 0 ; i--) {
  names.push({
    name: 'test' + i
  });
}
data.names = names;

let template = require('./page.n.marko');
const koa = require('koa');
const app = koa();
app.use(function*(next){
  this.body = template.stream(data);
  yield next;
});
const request = require('supertest');

let time = Date.now();
request(app.listen())
  .get('/')
  .expect(200)
  .end((err, res) => {
    // console.log(res.text);
    console.log(`cost ${Date.now() - time}ms`);
    process.exit();
  });
