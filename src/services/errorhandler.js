export class UndandledErrorHandler {
  static init() {
    window.addEventListener('unhandledrejection', event => {
      // Prevent error output on the console:
      event.preventDefault();
      console.log('Reason: ' + event.reason);
    });
    window.addEventListener('error', function (e) {
      event.preventDefault();
      var error = e.error;
      document.write ("Message : " + error.msg );
      document.write ("url : " + error.url );
      document.write ("Line number : " + error.line );
      // console.log("test" + error);
    });
  }
}


//  window.onerror = function (msg, url, lineNo, columnNo, error) {
//    var string = msg.toLowerCase();
//    var substring = "script error";
//    if (string.indexOf(substring) > -1){
//      alert('Script Error: See Browser Console for Detail');
//    } else {
//      var message = [
//        'Message: ' + msg,
//        'URL: ' + url,
//        'Line: ' + lineNo,
//        'Column: ' + columnNo,
//        'Error object: ' + JSON.stringify(error)
//      ].join(' - ');
//
//      alert(message);
//    }
//
//    return false;
//  };


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
