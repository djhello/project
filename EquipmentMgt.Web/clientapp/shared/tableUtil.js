"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
var getFileName = function (name) {
    var timeSpan = new Date().toISOString();
    var sheetName = name || "ExportResult";
    var fileName = sheetName + "-" + timeSpan;
    return {
        sheetName: sheetName,
        fileName: fileName
    };
};
var TableUtil = /** @class */ (function () {
    function TableUtil() {
    }
    TableUtil.exportTableToExcel = function (tableId, name) {
        var _a = getFileName(name), sheetName = _a.sheetName, fileName = _a.fileName;
        var targetTableElm = document.getElementById(tableId);
        var wb = XLSX.utils.table_to_book(targetTableElm, {
            sheet: sheetName
        });
        XLSX.writeFile(wb, fileName + ".xls");
    };
    TableUtil.exportArrayToExcel = function (arr, name) {
        var workbook = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(workbook, ws, "Results");
        XLSX.writeFile(workbook, 'out.xls', { type: 'string' });
    };
    TableUtil.exportToExcel = function (tableId, name) {
        var timeSpan = new Date().toISOString();
        var prefix = name || "ExportResult";
        var fileName = prefix + "-" + timeSpan;
        var targetTableElm = document.getElementById(tableId);
        var wb = XLSX.utils.table_to_book(targetTableElm, { sheet: prefix });
        XLSX.writeFile(wb, fileName + ".xlsx");
    };
    return TableUtil;
}());
exports.TableUtil = TableUtil;
//# sourceMappingURL=tableUtil.js.map