

function f1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('I am f1 and I will run after 1 seconds');
            resolve('Hi from f1');
        }, 1000);
    });

}

function f2() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('I am f2 and I will run after 1 seconds');
            resolve('Hi from f2');
        }, 1000);
    });

}

module.exports = {
    f1,
    f2
};
