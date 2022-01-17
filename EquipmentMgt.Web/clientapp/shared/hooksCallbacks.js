"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handsontable_1 = require("handsontable");
var constants_1 = require("./constants");
var headerAlignments = new Map([
    ["9", "htCenter"],
    ["10", "htRight"],
    ["12", "htCenter"]
]);
exports.addClassesToRows = function (TD, row, column, prop, value, cellProperties) {
    // Adding classes to `TR` just while rendering first visible `TD` element
    if (column !== 0) {
        return;
    }
    var parentElement = TD.parentElement;
    if (parentElement === null) {
        return;
    }
    // Add class to selected rows
    if (cellProperties.instance.getDataAtRowProp(row, "0")) {
        handsontable_1.default.dom.addClass(parentElement, constants_1.SELECTED_CLASS);
    }
    else {
        handsontable_1.default.dom.removeClass(parentElement, constants_1.SELECTED_CLASS);
    }
    // Add class to odd TRs
    if (row % 2 === 0) {
        handsontable_1.default.dom.addClass(parentElement, constants_1.ODD_ROW_CLASS);
    }
    else {
        handsontable_1.default.dom.removeClass(parentElement, constants_1.ODD_ROW_CLASS);
    }
};
exports.drawCheckboxInRowHeaders = function drawCheckboxInRowHeaders(row, TH) {
    var input = document.createElement("input");
    input.type = "checkbox";
    if (row >= 0 && this.getDataAtRowProp(row, "0")) {
        input.checked = true;
    }
    handsontable_1.default.dom.empty(TH);
    TH.appendChild(input);
};
exports.alignHeaders = function (column, TH) {
    if (column < 0) {
        return;
    }
    if (TH.firstChild) {
        if (headerAlignments.has(column.toString())) {
            handsontable_1.default.dom.removeClass(TH.firstChild, constants_1.DEFAULT_ALIGNMENT_CLASS);
            handsontable_1.default.dom.addClass(TH.firstChild, 
            // @ts-ignore Above if checks whether there is an element in the Map.
            headerAlignments.get(column.toString()));
        }
        else {
            handsontable_1.default.dom.addClass(TH.firstChild, constants_1.DEFAULT_ALIGNMENT_CLASS);
        }
    }
};
exports.changeCheckboxCell = function changeCheckboxCell(event, coords) {
    var target = event.target;
    if (coords.col === -1 && event.target && target.nodeName === "INPUT") {
        event.preventDefault(); // Handsontable will render checked/unchecked checkbox by it own.
        this.setDataAtRowProp(coords.row, "0", !target.checked);
    }
};
//# sourceMappingURL=hooksCallbacks.js.map