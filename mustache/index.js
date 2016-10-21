'use strict';
const engine = require('mu2');
const read = require('fs').readFileSync;
let data = {
  title: 'test',
  cssURL: 'style.css',
  jsURL: 'script.js',
  name: 'ykan'
};
let names = [];
for (let i = 100000; i >= 0 ; i--) {
  names.push({
    name: 'test' + i,
    i: i % 2
  });
}
data.names = names;

engine.root = __dirname;


const koa = require('koa');
const app = koa();
engine.compile('page.ejs', (err, tpl) => {
  app.use(function*(next){
    this.body = engine.render(tpl, data);
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
});
