"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/credentials";
exports.ids = ["pages/api/credentials"];
exports.modules = {

/***/ "(api)/./src/pages/api/credentials.js":
/*!**************************************!*\
  !*** ./src/pages/api/credentials.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nasync function handler(req, res) {\n    let tempMessages = [];\n    if (process.env.OPENAI_API_KEY.length < 1) {\n        tempMessages.push({\n            role: \"assistant\",\n            content: \"Please set your OpenAI API key in the .env file.\"\n        });\n    }\n    if (process.env.AMAZON_AWS_POLLY_ACCESS_KEY.length < 1) {\n        tempMessages.push({\n            role: \"assistant\",\n            content: \"Please set your Amazon AWS Polly access key in the .env file.\"\n        });\n    }\n    if (process.env.AMAZON_AWS_POLLY_SECRET_KEY.length < 1) {\n        tempMessages.push({\n            role: \"assistant\",\n            content: \"Please set your Amazon AWS Polly secret key in the .env file.\"\n        });\n    }\n    res.status(200).json({\n        messages: tempMessages\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NyZWRlbnRpYWxzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxlQUFlQSxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM5QyxJQUFJQyxlQUFlLEVBQUU7SUFDckIsSUFBSUMsUUFBUUMsR0FBRyxDQUFDQyxjQUFjLENBQUNDLE1BQU0sR0FBRyxHQUFHO1FBQ3pDSixhQUFhSyxJQUFJLENBQUM7WUFDaEJDLE1BQU07WUFDTkMsU0FBUztRQUNYO0lBQ0YsQ0FBQztJQUVELElBQUlOLFFBQVFDLEdBQUcsQ0FBQ00sMkJBQTJCLENBQUNKLE1BQU0sR0FBRyxHQUFHO1FBQ3RESixhQUFhSyxJQUFJLENBQUM7WUFDaEJDLE1BQU07WUFDTkMsU0FBUztRQUNYO0lBQ0YsQ0FBQztJQUVELElBQUlOLFFBQVFDLEdBQUcsQ0FBQ08sMkJBQTJCLENBQUNMLE1BQU0sR0FBRyxHQUFHO1FBQ3RESixhQUFhSyxJQUFJLENBQUM7WUFDaEJDLE1BQU07WUFDTkMsU0FBUztRQUNYO0lBQ0YsQ0FBQztJQUVEUixJQUFJVyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLFVBQVVaO0lBQWE7QUFDaEQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vY2staW50ZXJ2aWV3cy13aXRoLWFpLy4vc3JjL3BhZ2VzL2FwaS9jcmVkZW50aWFscy5qcz8xNzI4Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBsZXQgdGVtcE1lc3NhZ2VzID0gW107XHJcbiAgaWYgKHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZLmxlbmd0aCA8IDEpIHtcclxuICAgIHRlbXBNZXNzYWdlcy5wdXNoKHtcclxuICAgICAgcm9sZTogXCJhc3Npc3RhbnRcIixcclxuICAgICAgY29udGVudDogXCJQbGVhc2Ugc2V0IHlvdXIgT3BlbkFJIEFQSSBrZXkgaW4gdGhlIC5lbnYgZmlsZS5cIixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHByb2Nlc3MuZW52LkFNQVpPTl9BV1NfUE9MTFlfQUNDRVNTX0tFWS5sZW5ndGggPCAxKSB7XHJcbiAgICB0ZW1wTWVzc2FnZXMucHVzaCh7XHJcbiAgICAgIHJvbGU6IFwiYXNzaXN0YW50XCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwiUGxlYXNlIHNldCB5b3VyIEFtYXpvbiBBV1MgUG9sbHkgYWNjZXNzIGtleSBpbiB0aGUgLmVudiBmaWxlLlwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAocHJvY2Vzcy5lbnYuQU1BWk9OX0FXU19QT0xMWV9TRUNSRVRfS0VZLmxlbmd0aCA8IDEpIHtcclxuICAgIHRlbXBNZXNzYWdlcy5wdXNoKHtcclxuICAgICAgcm9sZTogXCJhc3Npc3RhbnRcIixcclxuICAgICAgY29udGVudDogXCJQbGVhc2Ugc2V0IHlvdXIgQW1hem9uIEFXUyBQb2xseSBzZWNyZXQga2V5IGluIHRoZSAuZW52IGZpbGUuXCIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZXM6IHRlbXBNZXNzYWdlcyB9KTtcclxufVxyXG4iXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsInRlbXBNZXNzYWdlcyIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsImxlbmd0aCIsInB1c2giLCJyb2xlIiwiY29udGVudCIsIkFNQVpPTl9BV1NfUE9MTFlfQUNDRVNTX0tFWSIsIkFNQVpPTl9BV1NfUE9MTFlfU0VDUkVUX0tFWSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/credentials.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/credentials.js"));
module.exports = __webpack_exports__;

})();