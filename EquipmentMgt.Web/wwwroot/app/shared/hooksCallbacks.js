"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var handsontable_1=require("handsontable"),constants_1=require("./constants"),headerAlignments=new Map([["9","htCenter"],["10","htRight"],["12","htCenter"]]);exports.addClassesToRows=function(e,t,a,n,s,o){0!==a||null!==(e=e.parentElement)&&(o.instance.getDataAtRowProp(t,"0")?handsontable_1.default.dom.addClass(e,constants_1.SELECTED_CLASS):handsontable_1.default.dom.removeClass(e,constants_1.SELECTED_CLASS),t%2==0?handsontable_1.default.dom.addClass(e,constants_1.ODD_ROW_CLASS):handsontable_1.default.dom.removeClass(e,constants_1.ODD_ROW_CLASS))},exports.drawCheckboxInRowHeaders=function(e,t){var a=document.createElement("input");a.type="checkbox",0<=e&&this.getDataAtRowProp(e,"0")&&(a.checked=!0),handsontable_1.default.dom.empty(t),t.appendChild(a)},exports.alignHeaders=function(e,t){e<0||t.firstChild&&(headerAlignments.has(e.toString())?(handsontable_1.default.dom.removeClass(t.firstChild,constants_1.DEFAULT_ALIGNMENT_CLASS),handsontable_1.default.dom.addClass(t.firstChild,headerAlignments.get(e.toString()))):handsontable_1.default.dom.addClass(t.firstChild,constants_1.DEFAULT_ALIGNMENT_CLASS))},exports.changeCheckboxCell=function(e,t){var a=e.target;-1===t.col&&e.target&&"INPUT"===a.nodeName&&(e.preventDefault(),this.setDataAtRowProp(t.row,"0",!a.checked))};