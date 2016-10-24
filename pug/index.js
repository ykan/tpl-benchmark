'use strict';
const engine = require('pug');
const read = require('fs').readFileSync;
let data = {
  title: 'test',
  cssURL: 'style.css',
  jsURL: 'script.js',
  name: 'ykan'
};
let names = [];
for (let i = 10; i >= 0 ; i--) {
  names.push({
    name: 'test' + i
  });
}
data.names = names;
let path = __dirname + '/page.jade';
let pageStr = read(path, 'utf8');
let template = engine.compile(pageStr);

const koa = require('koa');
const app = koa();
app.use(function*(next){
  this.body = template(data);
  yield next;
});
const request = require('supertest');

let time = Date.now();
request(app.listen())
  .get('/')
  .expect(200)
  .end((err, res) => {
    console.log(res.text);
    console.log(`cost ${Date.now() - time}ms`);
    process.exit();
  });

