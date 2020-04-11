import setText, { appendText } from "./results.mjs";

// A Promise is a built in Object within JavaScript.
// It takes one parameter, a function referred to as the "Executor".
// Promises are "eager", meaning the function will execute immediately upon invoking the promise.
// With setTimeout, you can delay the executor of the Promise.
// Executor function takes a parameter called the resolve.
// The Resolve is used to "resolve" it's state.
// Resolve sets the state of the Promise to "fulfilled".
// Because the Promise is set to "fulfilled", it calls .then() and passed over the parameter of the resolve function. Remember that setText() is imported into this file.

export function timeout(){
    const wait = new Promise( (resolve) => {
        setTimeout(() => {
            resolve("Timeout!")
        }, 1000);
    });

    wait.then(text => setText(text))
}



// setTimeout will call the function once.
// setInterval will call the function upon every interval.
// Because setInterval is used, the function continues to run even after .finally() is invoked.
// However nothing is changed on the screen because the Promises state is not set to fulfilled.
// To stop the interval, see clearIntervalChain(). 
export function interval(){
    let counter = 0
    const wait = new Promise((resolve) => {
        setInterval(() => {
            console.log(counter)
            resolve(`Timeout! ${++counter}`);
        }, 1000);
    });

    wait.then(text => setText(text))
    .finally( () => appendText(` -- Done ${counter}`))
}



// In order to stop setInterval(). use clearInterval().
export function clearIntervalChain(){
    let counter = 0
    let interval
    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log(counter)
            resolve(`Timeout! ${++counter}`);
        }, 1000);
    });

    wait.then(text => setText(text))
    .finally(() => clearInterval(interval))
}



// XHR has it's own object property methods: open(), onload(), onerror(), send() are common ones. 
// XMLHttpRequest() is a constructor that creates a XML HTTP Request object.
export function xhr(){
    let request = new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject("Request Failed"); // This never gets called in this example.
        xhr.send(); // This never gets called in this example.
    });

    request.then(result => setText(result))
    .catch(reason => setText(reason));
}


// When you need to have multiple pieces of data from different sources, you can use a promises to make sure all the requests are fulfilled before invoking another action.
// Promise.all() will wait for all Promises to complete before invoking .then(). Or, until the first Promise is rejected. 
// Promise.all() takes GET requests as parameters.
export function allPromises(){
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");
    let addressTypes = axios.get("http://localhost.3000/addressTypes");

    // allPromises() returns the response object as part of an array.
    Promise.all([categories, statuses, userTypes, addressTypes])
    .then(([cat, stat, type, address]) => {
        setText("");

        // Since the GET request is to an actual api, and using the axios library, they need to be stringified.
        // Also due to Axios, the data property needs to accessed from each response.
        appendText(JSON.stringify(cat.data));
        appendText(JSON.stringify(stat.data));
        appendText(JSON.stringify(type.data));
        appendText(JSON.stringify(address.data));
    })
    .catch(reasons => {
        setText(reasons);
    });
}



export function allSettled(){
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");
    let addressTypes = axios.get("http://localhost.3000/addressTypes");

    // .allSettled() returns either a resolved object with keys: status and value. Or, it will return a rejected object with keys: status and reason.
    // .catch() is technically not needed since allSettled() handles a rejected promise.
    // However it is still recommended to use .catch() as good practice to catch errors in the .then() block.
    Promise.allSettled([categories, statuses, userTypes, addressTypes])
    .then((values) => { 
        console.log(values); 
        // values is an array of fulfilled or rejected response objects.
        // If they are fulfilled responses, print out the data.
        // Otherwise return the reason of rejection. 
        let results = values.map( v => {
            if (v.status === "fulfilled") {
                return `FULFILLED: ${JSON.stringify(v.value.data[0])} `;
            }

            return `REJECTED: ${v.reason.message} `;
        })
        console.log(results);
        // results is the specified data from each of the response objects, based on whether or not they are fulfilled or rejected.
        setText(results);
    })
    .catch(reasons => {
        setText(reasons);
    });
}



// .race() returns the fastest/first response received and ignores all the following. 
export function race(){
    let users = axios.get("http://localhost:3000/users");
    let backup = axios.get("http://localhost:3001/users");

    // .race() returns once the first promise settles. 
    // If .race() settles with a reject response .catch() will be invoked and no data will be returned.
    Promise.race([users, backup])
    .then(users => setText(JSON.stringify(users.data)))
    .catch(reason => setText(reason));
}