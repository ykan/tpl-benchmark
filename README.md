# tpl-benchmark
模板引擎选择，主要从使用习惯和性能上比较，从下面几点考虑；

1. 更符合编程习惯，类ejs的风格，简单的for和if支持即可
2. 需要支持include
3. 性能（不是太复杂的页面区别不大）

## 性能比较
```
// ejs:
cost 500+-10ms
//marko:
cost 100+-10ms
//lodash
cost 300+-10ms
//Mustache
cost 2740+-10ms //不知道哪里出了问题
```
