// window.addEventListener('error', function (e) {
//   event.preventDefault();
//   let error = e.error;
//   document.write ("Message : " + error.msg );
//   document.write ("url : " + error.url );
//   document.write ("Line number : " + error.line );
//   // console.log("test" + error);
// });



// window.addEventListener('error', function (e) {
//   var stack = e.error.stack;
//   var message = e.error.toString();
//   if (stack) {
//     message += '\n' + stack;
//   }
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/log', true);
//   xhr.send(message);
// });
