/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ \"./src/monitor/index.js\");\n\n\n//# sourceURL=webpack://monitor/./src/index.js?");

/***/ }),

/***/ "./src/monitor/index.js":
/*!******************************!*\
  !*** ./src/monitor/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_performance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/performance */ \"./src/monitor/lib/performance.js\");\n/* harmony import */ var _lib_jsError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/jsError */ \"./src/monitor/lib/jsError.js\");\n/* harmony import */ var _lib_xhr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/xhr */ \"./src/monitor/lib/xhr.js\");\n\r\n\r\n\r\n(0,_lib_jsError__WEBPACK_IMPORTED_MODULE_1__.default)();\r\n// perf.init((data)=>{\r\n//   // console.log(data)\r\n// })\r\n// injectXHR.init((data)=>{\r\n//   console.log(data)\r\n// })\r\n\n\n//# sourceURL=webpack://monitor/./src/monitor/index.js?");

/***/ }),

/***/ "./src/monitor/lib/jsError.js":
/*!************************************!*\
  !*** ./src/monitor/lib/jsError.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ injectJsError)\n/* harmony export */ });\n/* harmony import */ var _util_getSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/getSelector */ \"./src/monitor/util/getSelector.js\");\n/* harmony import */ var _util_getLastEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/getLastEvent */ \"./src/monitor/util/getLastEvent.js\");\n\r\n\r\nfunction injectJsError() {\r\n  window.addEventListener('error', function(e){\r\n    console.log(e)\r\n    let lastEvent = (0,_util_getLastEvent__WEBPACK_IMPORTED_MODULE_1__.default)()\r\n    let log = {\r\n      kind: \"stability\",\r\n      type: 'error',\r\n      errorType: 'jsError',\r\n      message: e.message,\r\n      filename: e.filename,\r\n      position: `${e.lineno}:${e.colno}`,\r\n      stack: getLines(e.error.stack),\r\n      selecTor: lastEvent ? (0,_util_getSelector__WEBPACK_IMPORTED_MODULE_0__.default)(lastEvent.path || lastEvent.target) : ''\r\n    }\r\n    \r\n  }, true)\r\n  window.addEventListener('unhandledrejection', (e) => {\r\n\r\n    // e.preventDefault();\r\n    console.log(e)\r\n    let lastEvent = (0,_util_getLastEvent__WEBPACK_IMPORTED_MODULE_1__.default)();\r\n    let message = \"\";\r\n    let line = 0;\r\n    let column = 0;\r\n    let stack = '';\r\n    let filename = '';\r\n    if (typeof e.reason === 'string') {\r\n      message = e.reason;\r\n    } else if (typeof e.reason === 'object') {\r\n      message = e.reason.message\r\n    }\r\n    let reason = e.reason;\r\n    if (typeof reason === 'object') {\r\n      if (reason.stack) {\r\n        let matchResult = reason.stack.match(/at\\s+(.+):(\\d+):(\\d+)/);\r\n        if (matchResult) {\r\n          filename = matchResult[1];\r\n          line = matchResult[2]\r\n          collumn = matchResult[3]\r\n        }\r\n        stack = getLines(reason.stack)\r\n      }\r\n    }\r\n    let log = {\r\n      kind: \"stability\",\r\n      type: 'error',\r\n      errorType: 'promiseError',\r\n      message,\r\n      position: line + ':' + column,\r\n      filename,\r\n      stack,\r\n      selector: lastEvent ? (0,_util_getSelector__WEBPACK_IMPORTED_MODULE_0__.default)(lastEvent.path || lastEvent.target) : ''\r\n    }\r\n    console.log('lastEvent', lastEvent)\r\n  },true)\r\n  function getLines(stack) {\r\n    if (!stack) {\r\n      return ''\r\n    }\r\n    //TypeError: Cannot set property 'error' of undefined↵    at btnClick (http://localhost:8080/:18:39\r\n    return stack.split('\\n').slice(1).map(item => item.replace(/^\\s+at\\s+/g, '')).join('^');\r\n    // return stack.split('\\n').slice(1).map(item=>item.replace(/^\\s+at\\s+/g,'').join('^'))\r\n  }\r\n}\n\n//# sourceURL=webpack://monitor/./src/monitor/lib/jsError.js?");

/***/ }),

/***/ "./src/monitor/lib/performance.js":
/*!****************************************!*\
  !*** ./src/monitor/lib/performance.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nfunction processData(p) {\r\n  let data = {\r\n    prevPage: p.fetchStart - p.navigationStart,//上一个页面到这个页面的时长\r\n    redircet: p.redirectEnd - p.redirectStart,//页面重定向时长\r\n    dns: p.domainLookupEnd - p.domainLookupStart,//dns解析时长\r\n    connect: p.connectEnd - p.connectStart,//tcp链接时长\r\n    send: p.responseEnd - p.requestStart,//从请求到得到响应结束时长\r\n    ttfb: p.responseStart - p.navigationStart,//首字节接收到的时长\r\n    domready: p.domInteractive - p.domLoading,//dom准备时长\r\n    whiteScreen:p.domLoading - p.navigationStart,//白屏时间\r\n    dom:p.domComplete - p.domLoading,//dom解析时间\r\n    load:p.loadEventEnd - p.loadEventStart,//onload执行时间，\r\n    total:p.loadEventEnd - p.navigationStart,\r\n    firstScreen:p.domContentLoadedEventEnd - p.fetchStart//第一屏所有资源完整展示资源\r\n  }\r\n  return data\r\n}\r\n/**loadEventEnd：load事件执行完毕的是时间戳\r\n * 页面开始加载的时候，load事件还没有被触发，loadEventEnd==0\r\n * 开启定时器没100ms检查一次，直到load事件被触发\r\n * @param {*} cb \r\n */\r\nlet load = (cb) =>{\r\n  let timer = null;\r\n  let check =()=>{\r\n    if(performance.timing.loadEventEnd){\r\n      clearTimeout(timer);\r\n      cb()\r\n    }else{\r\n      timer = setTimeout(check, 100);\r\n    }\r\n  }\r\n  window.addEventListener('load',check,false)\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  init(cb) {\r\n    load(()=>{\r\n      let perfData = performance.timing;\r\n      let data = processData(perfData)\r\n      cb(data)\r\n    })\r\n    \r\n  }\r\n});\n\n//# sourceURL=webpack://monitor/./src/monitor/lib/performance.js?");

/***/ }),

/***/ "./src/monitor/lib/xhr.js":
/*!********************************!*\
  !*** ./src/monitor/lib/xhr.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  init(cb){\r\n    \r\n  }\r\n});\n\n//# sourceURL=webpack://monitor/./src/monitor/lib/xhr.js?");

/***/ }),

/***/ "./src/monitor/util/getLastEvent.js":
/*!******************************************!*\
  !*** ./src/monitor/util/getLastEvent.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nlet lastEvent;\r\n['click','pointerdown','touchstart','mousedown','keydown','mouseover'].forEach(event=>{\r\n  document.addEventListener(event,(targetEvent)=>{\r\n    lastEvent = targetEvent;\r\n  },{\r\n    capture:true,//控制监听器是在捕获阶段还是冒泡阶段执行\r\n    passive:true\r\n  })\r\n})\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  return lastEvent\r\n}\n\n//# sourceURL=webpack://monitor/./src/monitor/util/getLastEvent.js?");

/***/ }),

/***/ "./src/monitor/util/getSelector.js":
/*!*****************************************!*\
  !*** ./src/monitor/util/getSelector.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getSelector = function (path) {\r\n  return path.reverse().filter(function (el) {\r\n    return el !== window && el !== document;\r\n  }).map(function (element) {\r\n    let selector;\r\n    if (element.id) {\r\n      selector = `#${element.id}`\r\n    } else if (element.className && typeof element.className === 'string') {\r\n      selector = `.${element.className.split(' ').filter(function (item) { return !!item }).join('.')}`\r\n    } else {\r\n      selector = element.nodeName;\r\n    }\r\n    return selector;\r\n  }).join(' ')\r\n}\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(path) {\r\n  if (Array.isArray(path)) {\r\n    return getSelector(path)\r\n  } else {\r\n    let paths = [];\r\n    let element = path;\r\n    while (element) {\r\n      paths.push(element);\r\n      element = element.parentNode\r\n    }\r\n    return getSelector(paths)\r\n  }\r\n}\n\n//# sourceURL=webpack://monitor/./src/monitor/util/getSelector.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;