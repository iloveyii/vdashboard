var f1 = require('./promise').f1;

async function f2() {
    var ret = await f1();
    console.log('After the promise', ret)
}

f2();
console.log('I am in main');
