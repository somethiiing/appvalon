const shuffle = function(array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

const deepCopy = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const times = function(n, func) {
    Array(n).fill().map(() => {
        func();
    })
}

module.exports = { shuffle, deepCopy, times };