var f1 = require('./promise').f1;
var f2 = require('./promise').f2;

async function f3() {
    var ret = await f1(); // T1
    console.log('After the promise ret1:', ret); // T1

    var ret2 = f2().then(r => console.log(r)); // Thread 2
    console.log('After the promise ret2:', ret2); // T1

    // Thread 3
    f1()
        .then(r => console.log('T3: '+r))
        .then(()=>f2()
            .then(r => console.log('T3: '+r)))

}

async function f() {
    await f3(); // T1
    console.log('I am in f'); // T1
}

function f4() {
    let j = 0, i =0;
    while( j  < 10**9) {
        while (i < 10 ** 8) {
            const t = 10 ** 8 * 8 ** 9;
            i++;
        }
        j++;
    }
    console.log('Im in f4'); // Main thread
}

f(); // Thread 1
f4(); // Main thread
console.log('I am in main'); // Main thread

// It creates two (n 3rd one with promises) threads since f is async it will be on its own thread
// Since f4 is sync it will be on main thread
// Console will be on main thread
// Result : unless sync code is finished, the async will be suspended till last

// Two way to create async functions - 1. to use keyword async in front of function
//                                     2. to use promises ie return promise from function

// The await will let the next line to execute after it executes all its own code (not async code)
