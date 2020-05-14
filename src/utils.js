const checkTimeExpiration = (time) => {
    return time < Date.now();
}

const setRelogToken = ({player, room}) => {
    if (window && window.localStorage) {
        window.localStorage.setItem('player', player);
        window.localStorage.setItem('room', room);
    }
}

let timerId;
const throttle = (func, delay) => {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId) {
        return
    }

    // Schedule a setTimeout after delay seconds
    timerId = setTimeout(function () {
        func()
        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timerId = undefined;
    }, delay)
}

export {checkTimeExpiration, setRelogToken, throttle}
