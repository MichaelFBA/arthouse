// document.addEventListener("navbeforefocus", (e) => {
//   e.target.scrollIntoView({block: 'center'});
// });

import {rovingIndex} from "./rover.js"

document.querySelectorAll('.horizontal-media-scroller')
  .forEach(scroller => rovingIndex({
    element: scroller,
    target: 'a',
  }))

// document.addEventListener("keydown", (event) => {
//   console.log(event.code)
//     if (event.code === "ArrowUp") {
//       console.log('up')
//       document.dispatchEvent(new KeyboardEvent('keydown', {code: 'Tab'}));
//     }
//     if (event.code === "ArrowDown") {
//       console.log('down')
//       document.dispatchEvent(new KeyboardEvent('keydown', {code: 'Tab', shiftKey: true}));
//     }
//   });