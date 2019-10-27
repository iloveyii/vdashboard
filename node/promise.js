

function f1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('I will run after 1 seconds');
            resolve('hi there');
        }, 1000);
    });

}

module.exports = {
    f1
};
