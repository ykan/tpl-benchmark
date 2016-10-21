'use strict';
const engine = require('hogan.js');
const read = require('fs').readFileSync;
let data = {
  title: 'test',
  cssURL: 'style.css',
  jsURL: 'script.js',
  name: 'ykan'
};
let names = [];
for (let i = 1000000; i >= 0 ; i--) {
  names.push({
    name: 'test' + i,
    i: i % 2
  });
}
data.names = names;
let path = __dirname + '/page.ejs';
let pageStr = read(path, 'utf8');
let template = engine.compile(pageStr);

const koa = require('koa');
const app = koa();
app.use(function*(next){
  this.body = template.render(data);
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

