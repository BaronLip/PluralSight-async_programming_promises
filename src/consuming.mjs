import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";


// .then() is invoked when promises are "fulfilled", succeeds in reaching the endpoint.
// .then() takes a function as it's only parameter. 
// data is the "response" or the data that is passed back from the .get request.
// the "response" object contains a lot of info and the "payload" for the endpoint is contained in "data".
// data contains the orders/1 information that was requested from .get().
// setText is imported from a separate results.mjs file. 

export function get() {
    axios.get("http://localhost:3000/orders/1")
    // Destructured syntax:
    .then( ({data}) => {
        console.log(data);
        setText(JSON.stringify(data));
    });
    // // Standard syntax a response from the get request.
    // .then( (response) => {
    //     console.log(response);
    //     setText(JSON.stringify(response.data));
    // });
}
// --------------------

// .catch() is invoked anytime a get request is rejected.
// .catch() also takes a function as a parameter.
// Anytime a get request results in an error, there will be an error reason.

export function getCatch() {
    axios.get("http://localhost:3000/orders/123")
    // Destructured syntax:
    .then( (response) => {
        if (response.status === 200) {
            setText(JSON.stringify(data));
        } else {
            setText("Error");
        }
    })
    .catch( err => setText(err));
}
// --------------------


// Get requests are able to be chained together.
// When chaining get requests, make sure to RETURN the second get request. Otherwise the follow .then() statement is working with "undefined".
// Each .get() request is going to a different endpoint, therefore returning different data. 

export function chain() {
    axios.get("http://localhost:3000/orders/1")
    .then( ({data}) => {
        // Note the use of string interpolations within backticks.
        // Note the use of return. Return must be used in order for the following .then() to have "data".
        console.log(data)
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        console.log(data)
        setText(`City: ${data.city}`);
    });
}
// --------------------


// .catch() will catch all errors in the code stack.
// Most of the time, it's best to have only one .catch() method.
export function chainCatch() {
    axios.get("http://localhost:3000/orders/1")
    .then( ({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
    .catch(err => setText(err));
}
// --------------------


// When you want code to run regardless of whether the promise is successful, use .finally().

export function final() {
    showWaiting();
    axios.get("http://localhost:3000/orders/1")
    .then( ({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
    .catch(err => setText(err))
    .finally( () => {
        setTimeout( () => {
            hideWaiting();
        }, 1500);

        appendText(" -- Completely Done!");
    })
}
