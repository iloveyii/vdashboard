var f1 = require('./promise').f1;
var f2 = require('./promise').f2;

async function f3() {
    var ret = await f1();
    console.log('After the promise', ret);

    var ret2 = await f2();
    console.log('After the promise', ret2);

}

async function f() {
    await f3();
    console.log('I am in f');
}

f();
console.log('I am in main');
