"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var n,c=arguments.length,a=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,r);else for(var i=e.length-1;0<=i;i--)(n=e[i])&&(a=(c<3?n(a):3<c?n(t,o,a):n(t,o))||a);return 3<c&&a&&Object.defineProperty(t,o,a),a};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),CsvDataService=function(){function e(){}return e.prototype.exportToCsv=function(e,t){var o,r;t&&t.length&&(r=(o=Object.keys(t[0])).join(",")+"\n"+t.map(function(t){return o.map(function(e){e=null===t[e]||void 0===t[e]?"":t[e];return e=0<=(e=e instanceof Date?e.toLocaleString():e.toString().replace(/"/g,'""')).search(/("|,|\n)/g)?'"'+e+'"':e}).join(",")}).join("\n"),t=new Blob([r],{type:"text/csv;charset=utf-8;"}),navigator.msSaveBlob?navigator.msSaveBlob(t,e):void 0!==(r=document.createElement("a")).download&&(t=URL.createObjectURL(t),r.setAttribute("href",t),r.setAttribute("download",e),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)))},__decorate([core_1.Injectable({providedIn:"root"})],e)}();exports.CsvDataService=CsvDataService;