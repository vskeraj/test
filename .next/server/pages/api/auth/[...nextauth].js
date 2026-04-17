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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src\\pages\\api\\auth\\[...nextauth].ts */ \"(api)/./src/pages/api/auth/[...nextauth].ts\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/auth/[...nextauth]\",\n        pathname: \"/api/auth/[...nextauth]\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCZwcmVmZXJyZWRSZWdpb249JmFic29sdXRlUGFnZVBhdGg9LiUyRnNyYyU1Q3BhZ2VzJTVDYXBpJTVDYXV0aCU1QyU1Qi4uLm5leHRhdXRoJTVELnRzJm1pZGRsZXdhcmVDb25maWdCYXNlNjQ9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNMO0FBQzFEO0FBQ3NFO0FBQ3RFO0FBQ0EsaUVBQWUsd0VBQUssQ0FBQyw0REFBUSxZQUFZLEVBQUM7QUFDMUM7QUFDTyxlQUFlLHdFQUFLLENBQUMsNERBQVE7QUFDcEM7QUFDTyx3QkFBd0IsZ0hBQW1CO0FBQ2xEO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdml0ZV9yZWFjdF9zaGFkY25fdHMvPzc4YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNBUElSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL3BhZ2VzLWFwaS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3NyY1xcXFxwYWdlc1xcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdLnRzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBjb25maWcuXG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNBUElSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVNfQVBJLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwiXCJcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./src/lib/mongodb.ts":
/*!****************************!*\
  !*** ./src/lib/mongodb.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI || \"mongodb://localhost:27017/firefly\";\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI).then((mongoose)=>mongoose);\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL21vbmdvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVyxJQUFJO0FBRS9DLElBQUlHLFNBQVMsT0FBZ0JKLFFBQVE7QUFFckMsSUFBSSxDQUFDSSxRQUFRO0lBQ1hBLFNBQVMsT0FBZ0JKLFFBQVEsR0FBRztRQUFFTSxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUNsRTtBQUVBLGVBQWVDO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFLE9BQU9GLE9BQU9FLElBQUk7SUFDbkMsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkJILE9BQU9HLE9BQU8sR0FBR1AsdURBQWdCLENBQUNDLGFBQWFTLElBQUksQ0FBQyxDQUFDVixXQUFhQTtJQUNwRTtJQUNBSSxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNsQyxPQUFPSCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aXRlX3JlYWN0X3NoYWRjbl90cy8uL3NyYy9saWIvbW9uZ29kYi50cz81M2MyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkgfHwgXCJtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2ZpcmVmbHlcIjtcclxuXHJcbmxldCBjYWNoZWQgPSAoZ2xvYmFsIGFzIGFueSkubW9uZ29vc2U7XHJcblxyXG5pZiAoIWNhY2hlZCkge1xyXG4gIGNhY2hlZCA9IChnbG9iYWwgYXMgYW55KS5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgaWYgKGNhY2hlZC5jb25uKSByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJKS50aGVuKChtb25nb29zZSkgPT4gbW9uZ29vc2UpO1xyXG4gIH1cclxuICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xyXG4gIHJldHVybiBjYWNoZWQuY29ubjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0O1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImRiQ29ubmVjdCIsImNvbm5lY3QiLCJ0aGVuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/lib/mongodb.ts\n");

/***/ }),

/***/ "(api)/./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String\n    },\n    name: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"user\",\n            \"admin\"\n        ],\n        default: \"user\"\n    }\n}, {\n    timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGFBQWEsSUFBSUQsd0RBQWUsQ0FBQztJQUNyQ0csT0FBTztRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFFBQVE7SUFBSztJQUNwREMsVUFBVTtRQUFFSixNQUFNQztJQUFPO0lBQ3pCSSxNQUFNO1FBQUVMLE1BQU1DO0lBQU87SUFDckJLLE1BQU07UUFBRU4sTUFBTUM7UUFBUU0sTUFBTTtZQUFDO1lBQVE7U0FBUTtRQUFFQyxTQUFTO0lBQU87QUFDakUsR0FBRztJQUFFQyxZQUFZO0FBQUs7QUFFdEIsaUVBQWUsd0RBQWdCLENBQUNFLElBQUksSUFBNEJmLHFEQUFjLENBQUMsUUFBUUMsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpdGVfcmVhY3Rfc2hhZGNuX3RzLy4vc3JjL21vZGVscy9Vc2VyLnRzPzA5NmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZyB9LCAvLyBSZXF1aXJlZCBmb3IgY3JlZGVudGlhbHMgYXV0aFxyXG4gIG5hbWU6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgcm9sZTogeyB0eXBlOiBTdHJpbmcsIGVudW06IFtcInVzZXJcIiwgXCJhZG1pblwiXSwgZGVmYXVsdDogXCJ1c2VyXCIgfSxcclxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKG1vbmdvb3NlLm1vZGVscy5Vc2VyIGFzIG1vbmdvb3NlLk1vZGVsPGFueT4pIHx8IG1vbmdvb3NlLm1vZGVsKFwiVXNlclwiLCBVc2VyU2NoZW1hKTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsImVtYWlsIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwicGFzc3dvcmQiLCJuYW1lIiwicm9sZSIsImVudW0iLCJkZWZhdWx0IiwidGltZXN0YW1wcyIsIm1vZGVscyIsIlVzZXIiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/models/User.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/mongodb */ \"(api)/./src/lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/User */ \"(api)/./src/models/User.ts\");\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    secret: process.env.NEXTAUTH_SECRET || \"fallback_secret_for_local_dev\",\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default()({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"fake_id\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"fake_secret\"\n        }),\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    type: \"text\"\n                },\n                password: {\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n                    email: credentials?.email\n                });\n                if (user && credentials?.password && bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compareSync(credentials.password, user.password)) {\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        role: user.role || \"user\"\n                    };\n                }\n                return null; // For assignment test\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNWO0FBQzFCO0FBQ1E7QUFDTDtBQUVqQyxpRUFBZUEsZ0RBQVFBLENBQUM7SUFDdEJNLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxJQUFJO0lBQ3ZDQyxXQUFXO1FBQ1RSLGlFQUFjQSxDQUFDO1lBQ2JTLFVBQVVKLFFBQVFDLEdBQUcsQ0FBQ0ksZ0JBQWdCLElBQUk7WUFDMUNDLGNBQWNOLFFBQVFDLEdBQUcsQ0FBQ00sb0JBQW9CLElBQUk7UUFDcEQ7UUFDQWIsc0VBQW1CQSxDQUFDO1lBQ2xCYyxNQUFNO1lBQ05DLGFBQWE7Z0JBQUVDLE9BQU87b0JBQUVDLE1BQU07Z0JBQU87Z0JBQUdDLFVBQVU7b0JBQUVELE1BQU07Z0JBQVc7WUFBRTtZQUN2RSxNQUFNRSxXQUFVSixXQUFXO2dCQUN6QixNQUFNWix3REFBU0E7Z0JBQ2YsTUFBTWlCLE9BQU8sTUFBTSw0REFBcUIsQ0FBQztvQkFBRUosT0FBT0QsYUFBYUM7Z0JBQU07Z0JBQ3JFLElBQUlJLFFBQVFMLGFBQWFHLFlBQVloQiwyREFBa0IsQ0FBQ2EsWUFBWUcsUUFBUSxFQUFFRSxLQUFLRixRQUFRLEdBQUc7b0JBQzVGLE9BQU87d0JBQUVLLElBQUlILEtBQUtJLEdBQUcsQ0FBQ0MsUUFBUTt3QkFBSVQsT0FBT0ksS0FBS0osS0FBSzt3QkFBRUYsTUFBTU0sS0FBS04sSUFBSTt3QkFBRVksTUFBTU4sS0FBS00sSUFBSSxJQUFJO29CQUFPO2dCQUNsRztnQkFDQSxPQUFPLE1BQU0sc0JBQXNCO1lBQ3JDO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVULElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSUyxNQUFNSCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtnQkFDL0JHLE1BQU1OLEVBQUUsR0FBR0gsS0FBS0csRUFBRTtZQUNwQjtZQUNBLE9BQU9NO1FBQ1Q7UUFDQSxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUQsS0FBSyxFQUFFO1lBQzlCLElBQUlDLFFBQVFWLElBQUksRUFBRTtnQkFDZlUsUUFBUVYsSUFBSSxDQUFTTSxJQUFJLEdBQUdHLE1BQU1ILElBQUk7Z0JBQ3RDSSxRQUFRVixJQUFJLENBQVNHLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtZQUNyQztZQUNBLE9BQU9PO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQUVDLFFBQVE7SUFBUztBQUM1QixFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aXRlX3JlYWN0X3NoYWRjbl90cy8uL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzUwYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XHJcbmltcG9ydCBVc2VyIGZyb20gXCJAL21vZGVscy9Vc2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQgfHwgXCJmYWxsYmFja19zZWNyZXRfZm9yX2xvY2FsX2RldlwiLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCB8fCBcImZha2VfaWRcIixcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCBcImZha2Vfc2VjcmV0XCIsXHJcbiAgICB9KSxcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7IGVtYWlsOiB7IHR5cGU6IFwidGV4dFwiIH0sIHBhc3N3b3JkOiB7IHR5cGU6IFwicGFzc3dvcmRcIiB9IH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCAoVXNlciBhcyBhbnkpLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHM/LmVtYWlsIH0pO1xyXG4gICAgICAgIGlmICh1c2VyICYmIGNyZWRlbnRpYWxzPy5wYXNzd29yZCAmJiBiY3J5cHQuY29tcGFyZVN5bmMoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4geyBpZDogdXNlci5faWQudG9TdHJpbmcoKSwgZW1haWw6IHVzZXIuZW1haWwsIG5hbWU6IHVzZXIubmFtZSwgcm9sZTogdXNlci5yb2xlIHx8IFwidXNlclwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsOyAvLyBGb3IgYXNzaWdubWVudCB0ZXN0XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZTtcclxuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9LFxyXG4gIHBhZ2VzOiB7IHNpZ25JbjogJy9sb2dpbicgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsIkdvb2dsZVByb3ZpZGVyIiwiYmNyeXB0IiwiZGJDb25uZWN0IiwiVXNlciIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRPbmUiLCJjb21wYXJlU3luYyIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJyb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzZXNzaW9uIiwicGFnZXMiLCJzaWduSW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();