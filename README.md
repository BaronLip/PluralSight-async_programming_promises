## Code-along code and notes for PluralSight's JavaScript Promises and Async Programming tutorials.

See src files for commented code.

To run development server:\
$ npm run dev

To run secondary server:\
In a separate terminal window: $ npm run secondary

Some additional notes are for when the notes and code do not sync up.

#### Creating and Queuing Promises:
Consider the 3 stages of a promise when creating one:
1. Pending - promise that is not yet settled.
2. Fulfilled - promise that is settled.
3. Rejected - promise that is rejected.

**What is a promise?**\
Object that represents the eventual completion (or failure) of an asynchronous operation, and it's resulting value.

The Promise object is built into JavaScript.

**How do you create a promise?**\
```let temp = new Promise();```

A Promise takes two parameters, a Resolve function and a Reject function.
The Resolve function sets the state of the Promise to fulfilled and will call the .then() function afterwards.

**What is XHR?**\
XHR stands for **XML HTTP Request**. It is a JavaScript API (Application Program Interface) to create AJAX requests. XHR is a JavaScript object that has it's own methods. The methods are used to send network request from browser to server.

**onload** is an event that occurs once the request is complete and the response is fully downloaded. The request can be an error, 400 or 500 status, and still register as complete.

**error** is when the request could not be made. This is different from .catch(). .catch() is when the request is completed and there is an error.

**allSettled()** is not supported by all browsers, yet...? Currently supported by Chrome and Firefox as of the recording.

**Ways to queue Promises:**
* .all() - waits for either all promises are settled or until one promise is rejected, before invoking .then(). 
* .allSettled() - waits for all promises to be settled, regardless of fulfilled or rejection status, before invoking .then().
* .race() - waits for the first/fastest promise to received and ignores the requests after. 




 

