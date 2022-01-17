/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, NgZone, ViewChild, ViewEncapsulation, } from '@angular/core';
import Handsontable from 'handsontable/base';
import { HotTableRegisterer, HOT_DESTROYED_WARNING } from './hot-table-registerer.service';
import { HotSettingsResolver } from './hot-settings-resolver.service';
var HotTableComponent = /** @class */ (function () {
    function HotTableComponent(_ngZone, _hotTableRegisterer, _hotSettingsResolver) {
        this._ngZone = _ngZone;
        this._hotTableRegisterer = _hotTableRegisterer;
        this._hotSettingsResolver = _hotSettingsResolver;
        this.__hotInstance = null;
        this.columnsComponents = [];
        this.hotId = '';
    }
    Object.defineProperty(HotTableComponent.prototype, "hotInstance", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.__hotInstance || (this.__hotInstance && !this.__hotInstance.isDestroyed)) {
                // Will return the Handsontable instance or `null` if it's not yet been created.
                return this.__hotInstance;
            }
            else {
                this._hotTableRegisterer.removeInstance(this.hotId);
                console.warn(HOT_DESTROYED_WARNING);
                return null;
            }
        },
        set: /**
         * @private
         * @param {?} hotInstance
         * @return {?}
         */
        function (hotInstance) {
            this.__hotInstance = hotInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    HotTableComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var options = this._hotSettingsResolver.mergeSettings(this);
        if (this.columnsComponents.length > 0) {
            /** @type {?} */
            var columns_1 = [];
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                columns_1.push(_this._hotSettingsResolver.mergeSettings(column));
            }));
            options['columns'] = columns_1;
        }
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.hotInstance = new Handsontable.Core(_this.container.nativeElement, options);
            if (_this.hotId) {
                _this._hotTableRegisterer.registerInstance(_this.hotId, _this.hotInstance);
            }
            // @ts-ignore
            _this.hotInstance.init();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    HotTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.hotInstance === null) {
            return;
        }
        /** @type {?} */
        var newOptions = this._hotSettingsResolver.prepareChanges(changes);
        this.updateHotTable(newOptions);
    };
    /**
     * @return {?}
     */
    HotTableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            if (_this.hotInstance) {
                _this.hotInstance.destroy();
            }
        }));
        if (this.hotId) {
            this._hotTableRegisterer.removeInstance(this.hotId);
        }
    };
    /**
     * @param {?} newSettings
     * @return {?}
     */
    HotTableComponent.prototype.updateHotTable = /**
     * @param {?} newSettings
     * @return {?}
     */
    function (newSettings) {
        var _this = this;
        if (!this.hotInstance) {
            return;
        }
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.hotInstance.updateSettings(newSettings, false);
        }));
    };
    /**
     * @return {?}
     */
    HotTableComponent.prototype.onAfterColumnsChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.columnsComponents === void 0) {
            return;
        }
        if (this.columnsComponents.length > 0) {
            /** @type {?} */
            var columns_2 = [];
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                columns_2.push(_this._hotSettingsResolver.mergeSettings(column));
            }));
            /** @type {?} */
            var newOptions = {
                columns: columns_2
            };
            this.updateHotTable(newOptions);
        }
    };
    /**
     * @return {?}
     */
    HotTableComponent.prototype.onAfterColumnsNumberChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var columns = [];
        if (this.columnsComponents.length > 0) {
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                columns.push(_this._hotSettingsResolver.mergeSettings(column));
            }));
        }
        this.updateHotTable({ columns: columns });
    };
    /**
     * @param {?} column
     * @return {?}
     */
    HotTableComponent.prototype.addColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        this.columnsComponents.push(column);
        this.onAfterColumnsNumberChange();
    };
    /**
     * @param {?} column
     * @return {?}
     */
    HotTableComponent.prototype.removeColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        /** @type {?} */
        var index = this.columnsComponents.indexOf(column);
        this.columnsComponents.splice(index, 1);
        this.onAfterColumnsNumberChange();
    };
    HotTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hot-table',
                    template: '<div #container [id]="hotId"></div>',
                    encapsulation: ViewEncapsulation.None,
                    providers: [HotTableRegisterer, HotSettingsResolver]
                }] }
    ];
    /** @nocollapse */
    HotTableComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: HotTableRegisterer },
        { type: HotSettingsResolver }
    ]; };
    HotTableComponent.propDecorators = {
        container: [{ type: ViewChild, args: ['container', { static: false },] }],
        settings: [{ type: Input }],
        hotId: [{ type: Input }],
        activeHeaderClassName: [{ type: Input }],
        allowEmpty: [{ type: Input }],
        allowHtml: [{ type: Input }],
        allowInsertColumn: [{ type: Input }],
        allowInsertRow: [{ type: Input }],
        allowInvalid: [{ type: Input }],
        allowRemoveColumn: [{ type: Input }],
        allowRemoveRow: [{ type: Input }],
        autoColumnSize: [{ type: Input }],
        autoRowSize: [{ type: Input }],
        autoWrapCol: [{ type: Input }],
        autoWrapRow: [{ type: Input }],
        bindRowsWithHeaders: [{ type: Input }],
        cell: [{ type: Input }],
        cells: [{ type: Input }],
        checkedTemplate: [{ type: Input }],
        className: [{ type: Input }],
        colHeaders: [{ type: Input }],
        collapsibleColumns: [{ type: Input }],
        columnHeaderHeight: [{ type: Input }],
        columns: [{ type: Input }],
        columnSorting: [{ type: Input }],
        columnSummary: [{ type: Input }],
        colWidths: [{ type: Input }],
        commentedCellClassName: [{ type: Input }],
        comments: [{ type: Input }],
        contextMenu: [{ type: Input }],
        copyable: [{ type: Input }],
        copyPaste: [{ type: Input }],
        correctFormat: [{ type: Input }],
        currentColClassName: [{ type: Input }],
        currentHeaderClassName: [{ type: Input }],
        currentRowClassName: [{ type: Input }],
        customBorders: [{ type: Input }],
        data: [{ type: Input }],
        dataSchema: [{ type: Input }],
        dateFormat: [{ type: Input }],
        defaultDate: [{ type: Input }],
        disableVisualSelection: [{ type: Input }],
        dragToScroll: [{ type: Input }],
        dropdownMenu: [{ type: Input }],
        editor: [{ type: Input }],
        enterBeginsEditing: [{ type: Input }],
        enterMoves: [{ type: Input }],
        fillHandle: [{ type: Input }],
        filter: [{ type: Input }],
        filteringCaseSensitive: [{ type: Input }],
        filters: [{ type: Input }],
        fixedColumnsLeft: [{ type: Input }],
        fixedRowsBottom: [{ type: Input }],
        fixedRowsTop: [{ type: Input }],
        formulas: [{ type: Input }],
        fragmentSelection: [{ type: Input }],
        height: [{ type: Input }],
        hiddenColumns: [{ type: Input }],
        hiddenRows: [{ type: Input }],
        invalidCellClassName: [{ type: Input }],
        label: [{ type: Input }],
        language: [{ type: Input }],
        licenseKey: [{ type: Input }],
        manualColumnFreeze: [{ type: Input }],
        manualColumnMove: [{ type: Input }],
        manualColumnResize: [{ type: Input }],
        manualRowMove: [{ type: Input }],
        manualRowResize: [{ type: Input }],
        maxCols: [{ type: Input }],
        maxRows: [{ type: Input }],
        mergeCells: [{ type: Input }],
        minCols: [{ type: Input }],
        minRows: [{ type: Input }],
        minSpareCols: [{ type: Input }],
        minSpareRows: [{ type: Input }],
        multiColumnSorting: [{ type: Input }],
        nestedHeaders: [{ type: Input }],
        nestedRows: [{ type: Input }],
        noWordWrapClassName: [{ type: Input }],
        numericFormat: [{ type: Input }],
        observeDOMVisibility: [{ type: Input }],
        outsideClickDeselects: [{ type: Input }],
        persistentState: [{ type: Input }],
        placeholder: [{ type: Input }],
        placeholderCellClassName: [{ type: Input }],
        preventOverflow: [{ type: Input }],
        preventWheel: [{ type: Input }],
        readOnly: [{ type: Input }],
        readOnlyCellClassName: [{ type: Input }],
        renderAllRows: [{ type: Input }],
        renderer: [{ type: Input }],
        rowHeaders: [{ type: Input }],
        rowHeaderWidth: [{ type: Input }],
        rowHeights: [{ type: Input }],
        search: [{ type: Input }],
        selectionMode: [{ type: Input }],
        selectOptions: [{ type: Input }],
        skipColumnOnPaste: [{ type: Input }],
        skipRowOnPaste: [{ type: Input }],
        sortByRelevance: [{ type: Input }],
        source: [{ type: Input }],
        startCols: [{ type: Input }],
        startRows: [{ type: Input }],
        stretchH: [{ type: Input }],
        strict: [{ type: Input }],
        tableClassName: [{ type: Input }],
        tabMoves: [{ type: Input }],
        title: [{ type: Input }],
        trimDropdown: [{ type: Input }],
        trimRows: [{ type: Input }],
        trimWhitespace: [{ type: Input }],
        type: [{ type: Input }],
        uncheckedTemplate: [{ type: Input }],
        undo: [{ type: Input }],
        validator: [{ type: Input }],
        viewportColumnRenderingOffset: [{ type: Input }],
        viewportRowRenderingOffset: [{ type: Input }],
        visibleRows: [{ type: Input }],
        width: [{ type: Input }],
        wordWrap: [{ type: Input }],
        afterAddChild: [{ type: Input }],
        afterAutofill: [{ type: Input }],
        afterBeginEditing: [{ type: Input }],
        afterCellMetaReset: [{ type: Input }],
        afterChange: [{ type: Input }],
        afterChangesObserved: [{ type: Input }],
        afterColumnCollapse: [{ type: Input }],
        afterColumnExpand: [{ type: Input }],
        afterColumnMove: [{ type: Input }],
        afterColumnResize: [{ type: Input }],
        afterColumnSort: [{ type: Input }],
        afterContextMenuDefaultOptions: [{ type: Input }],
        afterContextMenuHide: [{ type: Input }],
        afterContextMenuShow: [{ type: Input }],
        afterCopy: [{ type: Input }],
        afterCopyLimit: [{ type: Input }],
        afterCreateCol: [{ type: Input }],
        afterCreateRow: [{ type: Input }],
        afterCut: [{ type: Input }],
        afterDeselect: [{ type: Input }],
        afterDestroy: [{ type: Input }],
        afterDetachChild: [{ type: Input }],
        afterDocumentKeyDown: [{ type: Input }],
        afterDrawSelection: [{ type: Input }],
        afterDropdownMenuDefaultOptions: [{ type: Input }],
        afterDropdownMenuHide: [{ type: Input }],
        afterDropdownMenuShow: [{ type: Input }],
        afterFilter: [{ type: Input }],
        afterGetCellMeta: [{ type: Input }],
        afterGetColHeader: [{ type: Input }],
        afterGetColumnHeaderRenderers: [{ type: Input }],
        afterGetRowHeader: [{ type: Input }],
        afterGetRowHeaderRenderers: [{ type: Input }],
        afterHideColumns: [{ type: Input }],
        afterHideRows: [{ type: Input }],
        afterInit: [{ type: Input }],
        afterLanguageChange: [{ type: Input }],
        afterListen: [{ type: Input }],
        afterLoadData: [{ type: Input }],
        afterMergeCells: [{ type: Input }],
        afterModifyTransformEnd: [{ type: Input }],
        afterModifyTransformStart: [{ type: Input }],
        afterMomentumScroll: [{ type: Input }],
        afterOnCellContextMenu: [{ type: Input }],
        afterOnCellCornerDblClick: [{ type: Input }],
        afterOnCellCornerMouseDown: [{ type: Input }],
        afterOnCellMouseDown: [{ type: Input }],
        afterOnCellMouseOut: [{ type: Input }],
        afterOnCellMouseOver: [{ type: Input }],
        afterOnCellMouseUp: [{ type: Input }],
        afterPaste: [{ type: Input }],
        afterPluginsInitialized: [{ type: Input }],
        afterRedo: [{ type: Input }],
        afterRedoStackChange: [{ type: Input }],
        afterRefreshDimensions: [{ type: Input }],
        afterRemoveCellMeta: [{ type: Input }],
        afterRemoveCol: [{ type: Input }],
        afterRemoveRow: [{ type: Input }],
        afterRender: [{ type: Input }],
        afterRenderer: [{ type: Input }],
        afterRowMove: [{ type: Input }],
        afterRowResize: [{ type: Input }],
        afterScrollHorizontally: [{ type: Input }],
        afterScrollVertically: [{ type: Input }],
        afterSelection: [{ type: Input }],
        afterSelectionByProp: [{ type: Input }],
        afterSelectionEnd: [{ type: Input }],
        afterSelectionEndByProp: [{ type: Input }],
        afterSetCellMeta: [{ type: Input }],
        afterSetDataAtCell: [{ type: Input }],
        afterSetDataAtRowProp: [{ type: Input }],
        afterSetSourceDataAtCell: [{ type: Input }],
        afterTrimRow: [{ type: Input }],
        afterUndo: [{ type: Input }],
        afterUndoStackChange: [{ type: Input }],
        afterUnhideColumns: [{ type: Input }],
        afterUnhideRows: [{ type: Input }],
        afterUnlisten: [{ type: Input }],
        afterUnmergeCells: [{ type: Input }],
        afterUntrimRow: [{ type: Input }],
        afterUpdateSettings: [{ type: Input }],
        afterValidate: [{ type: Input }],
        afterViewportColumnCalculatorOverride: [{ type: Input }],
        afterViewportRowCalculatorOverride: [{ type: Input }],
        afterViewRender: [{ type: Input }],
        beforeAddChild: [{ type: Input }],
        beforeAutofill: [{ type: Input }],
        beforeAutofillInsidePopulate: [{ type: Input }],
        beforeCellAlignment: [{ type: Input }],
        beforeChange: [{ type: Input }],
        beforeChangeRender: [{ type: Input }],
        beforeColumnCollapse: [{ type: Input }],
        beforeColumnExpand: [{ type: Input }],
        beforeColumnMove: [{ type: Input }],
        beforeColumnResize: [{ type: Input }],
        beforeColumnSort: [{ type: Input }],
        beforeContextMenuSetItems: [{ type: Input }],
        beforeContextMenuShow: [{ type: Input }],
        beforeCopy: [{ type: Input }],
        beforeCreateCol: [{ type: Input }],
        beforeCreateRow: [{ type: Input }],
        beforeCut: [{ type: Input }],
        beforeDetachChild: [{ type: Input }],
        beforeDrawBorders: [{ type: Input }],
        beforeDropdownMenuSetItems: [{ type: Input }],
        beforeDropdownMenuShow: [{ type: Input }],
        beforeFilter: [{ type: Input }],
        beforeGetCellMeta: [{ type: Input }],
        beforeHideColumns: [{ type: Input }],
        beforeHideRows: [{ type: Input }],
        beforeInit: [{ type: Input }],
        beforeInitWalkontable: [{ type: Input }],
        beforeKeyDown: [{ type: Input }],
        beforeLanguageChange: [{ type: Input }],
        beforeLoadData: [{ type: Input }],
        beforeMergeCells: [{ type: Input }],
        beforeOnCellContextMenu: [{ type: Input }],
        beforeOnCellMouseDown: [{ type: Input }],
        beforeOnCellMouseOut: [{ type: Input }],
        beforeOnCellMouseOver: [{ type: Input }],
        beforeOnCellMouseUp: [{ type: Input }],
        beforePaste: [{ type: Input }],
        beforeRedo: [{ type: Input }],
        beforeRedoStackChange: [{ type: Input }],
        beforeRefreshDimensions: [{ type: Input }],
        beforeRemoveCellClassNames: [{ type: Input }],
        beforeRemoveCellMeta: [{ type: Input }],
        beforeRemoveCol: [{ type: Input }],
        beforeRemoveRow: [{ type: Input }],
        beforeRender: [{ type: Input }],
        beforeRenderer: [{ type: Input }],
        beforeRowMove: [{ type: Input }],
        beforeRowResize: [{ type: Input }],
        beforeSetCellMeta: [{ type: Input }],
        beforeSetRangeEnd: [{ type: Input }],
        beforeSetRangeStart: [{ type: Input }],
        beforeSetRangeStartOnly: [{ type: Input }],
        beforeStretchingColumnWidth: [{ type: Input }],
        beforeTouchScroll: [{ type: Input }],
        beforeTrimRow: [{ type: Input }],
        beforeUndo: [{ type: Input }],
        beforeUndoStackChange: [{ type: Input }],
        beforeUnhideColumns: [{ type: Input }],
        beforeUnhideRows: [{ type: Input }],
        beforeUnmergeCells: [{ type: Input }],
        beforeUntrimRow: [{ type: Input }],
        beforeValidate: [{ type: Input }],
        beforeValueRender: [{ type: Input }],
        beforeViewRender: [{ type: Input }],
        construct: [{ type: Input }],
        init: [{ type: Input }],
        modifyAutoColumnSizeSeed: [{ type: Input }],
        modifyAutofillRange: [{ type: Input }],
        modifyColHeader: [{ type: Input }],
        modifyColumnHeaderHeight: [{ type: Input }],
        modifyColWidth: [{ type: Input }],
        modifyCopyableRange: [{ type: Input }],
        modifyData: [{ type: Input }],
        modifyGetCellCoords: [{ type: Input }],
        modifyRowData: [{ type: Input }],
        modifyRowHeader: [{ type: Input }],
        modifyRowHeaderWidth: [{ type: Input }],
        modifyRowHeight: [{ type: Input }],
        modifySourceData: [{ type: Input }],
        modifyTransformEnd: [{ type: Input }],
        modifyTransformStart: [{ type: Input }],
        persistentStateLoad: [{ type: Input }],
        persistentStateReset: [{ type: Input }],
        persistentStateSave: [{ type: Input }]
    };
    return HotTableComponent;
}());
export { HotTableComponent };
if (false) {
    /** @type {?} */
    HotTableComponent.prototype.container;
    /**
     * @type {?}
     * @private
     */
    HotTableComponent.prototype.__hotInstance;
    /**
     * @type {?}
     * @private
     */
    HotTableComponent.prototype.columnsComponents;
    /** @type {?} */
    HotTableComponent.prototype.settings;
    /** @type {?} */
    HotTableComponent.prototype.hotId;
    /** @type {?} */
    HotTableComponent.prototype.activeHeaderClassName;
    /** @type {?} */
    HotTableComponent.prototype.allowEmpty;
    /** @type {?} */
    HotTableComponent.prototype.allowHtml;
    /** @type {?} */
    HotTableComponent.prototype.allowInsertColumn;
    /** @type {?} */
    HotTableComponent.prototype.allowInsertRow;
    /** @type {?} */
    HotTableComponent.prototype.allowInvalid;
    /** @type {?} */
    HotTableComponent.prototype.allowRemoveColumn;
    /** @type {?} */
    HotTableComponent.prototype.allowRemoveRow;
    /** @type {?} */
    HotTableComponent.prototype.autoColumnSize;
    /** @type {?} */
    HotTableComponent.prototype.autoRowSize;
    /** @type {?} */
    HotTableComponent.prototype.autoWrapCol;
    /** @type {?} */
    HotTableComponent.prototype.autoWrapRow;
    /** @type {?} */
    HotTableComponent.prototype.bindRowsWithHeaders;
    /** @type {?} */
    HotTableComponent.prototype.cell;
    /** @type {?} */
    HotTableComponent.prototype.cells;
    /** @type {?} */
    HotTableComponent.prototype.checkedTemplate;
    /** @type {?} */
    HotTableComponent.prototype.className;
    /** @type {?} */
    HotTableComponent.prototype.colHeaders;
    /** @type {?} */
    HotTableComponent.prototype.collapsibleColumns;
    /** @type {?} */
    HotTableComponent.prototype.columnHeaderHeight;
    /** @type {?} */
    HotTableComponent.prototype.columns;
    /** @type {?} */
    HotTableComponent.prototype.columnSorting;
    /** @type {?} */
    HotTableComponent.prototype.columnSummary;
    /** @type {?} */
    HotTableComponent.prototype.colWidths;
    /** @type {?} */
    HotTableComponent.prototype.commentedCellClassName;
    /** @type {?} */
    HotTableComponent.prototype.comments;
    /** @type {?} */
    HotTableComponent.prototype.contextMenu;
    /** @type {?} */
    HotTableComponent.prototype.copyable;
    /** @type {?} */
    HotTableComponent.prototype.copyPaste;
    /** @type {?} */
    HotTableComponent.prototype.correctFormat;
    /** @type {?} */
    HotTableComponent.prototype.currentColClassName;
    /** @type {?} */
    HotTableComponent.prototype.currentHeaderClassName;
    /** @type {?} */
    HotTableComponent.prototype.currentRowClassName;
    /** @type {?} */
    HotTableComponent.prototype.customBorders;
    /** @type {?} */
    HotTableComponent.prototype.data;
    /** @type {?} */
    HotTableComponent.prototype.dataSchema;
    /** @type {?} */
    HotTableComponent.prototype.dateFormat;
    /** @type {?} */
    HotTableComponent.prototype.defaultDate;
    /** @type {?} */
    HotTableComponent.prototype.disableVisualSelection;
    /** @type {?} */
    HotTableComponent.prototype.dragToScroll;
    /** @type {?} */
    HotTableComponent.prototype.dropdownMenu;
    /** @type {?} */
    HotTableComponent.prototype.editor;
    /** @type {?} */
    HotTableComponent.prototype.enterBeginsEditing;
    /** @type {?} */
    HotTableComponent.prototype.enterMoves;
    /** @type {?} */
    HotTableComponent.prototype.fillHandle;
    /** @type {?} */
    HotTableComponent.prototype.filter;
    /** @type {?} */
    HotTableComponent.prototype.filteringCaseSensitive;
    /** @type {?} */
    HotTableComponent.prototype.filters;
    /** @type {?} */
    HotTableComponent.prototype.fixedColumnsLeft;
    /** @type {?} */
    HotTableComponent.prototype.fixedRowsBottom;
    /** @type {?} */
    HotTableComponent.prototype.fixedRowsTop;
    /** @type {?} */
    HotTableComponent.prototype.formulas;
    /** @type {?} */
    HotTableComponent.prototype.fragmentSelection;
    /** @type {?} */
    HotTableComponent.prototype.height;
    /** @type {?} */
    HotTableComponent.prototype.hiddenColumns;
    /** @type {?} */
    HotTableComponent.prototype.hiddenRows;
    /** @type {?} */
    HotTableComponent.prototype.invalidCellClassName;
    /** @type {?} */
    HotTableComponent.prototype.label;
    /** @type {?} */
    HotTableComponent.prototype.language;
    /** @type {?} */
    HotTableComponent.prototype.licenseKey;
    /** @type {?} */
    HotTableComponent.prototype.manualColumnFreeze;
    /** @type {?} */
    HotTableComponent.prototype.manualColumnMove;
    /** @type {?} */
    HotTableComponent.prototype.manualColumnResize;
    /** @type {?} */
    HotTableComponent.prototype.manualRowMove;
    /** @type {?} */
    HotTableComponent.prototype.manualRowResize;
    /** @type {?} */
    HotTableComponent.prototype.maxCols;
    /** @type {?} */
    HotTableComponent.prototype.maxRows;
    /** @type {?} */
    HotTableComponent.prototype.mergeCells;
    /** @type {?} */
    HotTableComponent.prototype.minCols;
    /** @type {?} */
    HotTableComponent.prototype.minRows;
    /** @type {?} */
    HotTableComponent.prototype.minSpareCols;
    /** @type {?} */
    HotTableComponent.prototype.minSpareRows;
    /** @type {?} */
    HotTableComponent.prototype.multiColumnSorting;
    /** @type {?} */
    HotTableComponent.prototype.nestedHeaders;
    /** @type {?} */
    HotTableComponent.prototype.nestedRows;
    /** @type {?} */
    HotTableComponent.prototype.noWordWrapClassName;
    /** @type {?} */
    HotTableComponent.prototype.numericFormat;
    /** @type {?} */
    HotTableComponent.prototype.observeDOMVisibility;
    /** @type {?} */
    HotTableComponent.prototype.outsideClickDeselects;
    /** @type {?} */
    HotTableComponent.prototype.persistentState;
    /** @type {?} */
    HotTableComponent.prototype.placeholder;
    /** @type {?} */
    HotTableComponent.prototype.placeholderCellClassName;
    /** @type {?} */
    HotTableComponent.prototype.preventOverflow;
    /** @type {?} */
    HotTableComponent.prototype.preventWheel;
    /** @type {?} */
    HotTableComponent.prototype.readOnly;
    /** @type {?} */
    HotTableComponent.prototype.readOnlyCellClassName;
    /** @type {?} */
    HotTableComponent.prototype.renderAllRows;
    /** @type {?} */
    HotTableComponent.prototype.renderer;
    /** @type {?} */
    HotTableComponent.prototype.rowHeaders;
    /** @type {?} */
    HotTableComponent.prototype.rowHeaderWidth;
    /** @type {?} */
    HotTableComponent.prototype.rowHeights;
    /** @type {?} */
    HotTableComponent.prototype.search;
    /** @type {?} */
    HotTableComponent.prototype.selectionMode;
    /** @type {?} */
    HotTableComponent.prototype.selectOptions;
    /** @type {?} */
    HotTableComponent.prototype.skipColumnOnPaste;
    /** @type {?} */
    HotTableComponent.prototype.skipRowOnPaste;
    /** @type {?} */
    HotTableComponent.prototype.sortByRelevance;
    /** @type {?} */
    HotTableComponent.prototype.source;
    /** @type {?} */
    HotTableComponent.prototype.startCols;
    /** @type {?} */
    HotTableComponent.prototype.startRows;
    /** @type {?} */
    HotTableComponent.prototype.stretchH;
    /** @type {?} */
    HotTableComponent.prototype.strict;
    /** @type {?} */
    HotTableComponent.prototype.tableClassName;
    /** @type {?} */
    HotTableComponent.prototype.tabMoves;
    /** @type {?} */
    HotTableComponent.prototype.title;
    /** @type {?} */
    HotTableComponent.prototype.trimDropdown;
    /** @type {?} */
    HotTableComponent.prototype.trimRows;
    /** @type {?} */
    HotTableComponent.prototype.trimWhitespace;
    /** @type {?} */
    HotTableComponent.prototype.type;
    /** @type {?} */
    HotTableComponent.prototype.uncheckedTemplate;
    /** @type {?} */
    HotTableComponent.prototype.undo;
    /** @type {?} */
    HotTableComponent.prototype.validator;
    /** @type {?} */
    HotTableComponent.prototype.viewportColumnRenderingOffset;
    /** @type {?} */
    HotTableComponent.prototype.viewportRowRenderingOffset;
    /** @type {?} */
    HotTableComponent.prototype.visibleRows;
    /** @type {?} */
    HotTableComponent.prototype.width;
    /** @type {?} */
    HotTableComponent.prototype.wordWrap;
    /** @type {?} */
    HotTableComponent.prototype.afterAddChild;
    /** @type {?} */
    HotTableComponent.prototype.afterAutofill;
    /** @type {?} */
    HotTableComponent.prototype.afterBeginEditing;
    /** @type {?} */
    HotTableComponent.prototype.afterCellMetaReset;
    /** @type {?} */
    HotTableComponent.prototype.afterChange;
    /** @type {?} */
    HotTableComponent.prototype.afterChangesObserved;
    /** @type {?} */
    HotTableComponent.prototype.afterColumnCollapse;
    /** @type {?} */
    HotTableComponent.prototype.afterColumnExpand;
    /** @type {?} */
    HotTableComponent.prototype.afterColumnMove;
    /** @type {?} */
    HotTableComponent.prototype.afterColumnResize;
    /** @type {?} */
    HotTableComponent.prototype.afterColumnSort;
    /** @type {?} */
    HotTableComponent.prototype.afterContextMenuDefaultOptions;
    /** @type {?} */
    HotTableComponent.prototype.afterContextMenuHide;
    /** @type {?} */
    HotTableComponent.prototype.afterContextMenuShow;
    /** @type {?} */
    HotTableComponent.prototype.afterCopy;
    /** @type {?} */
    HotTableComponent.prototype.afterCopyLimit;
    /** @type {?} */
    HotTableComponent.prototype.afterCreateCol;
    /** @type {?} */
    HotTableComponent.prototype.afterCreateRow;
    /** @type {?} */
    HotTableComponent.prototype.afterCut;
    /** @type {?} */
    HotTableComponent.prototype.afterDeselect;
    /** @type {?} */
    HotTableComponent.prototype.afterDestroy;
    /** @type {?} */
    HotTableComponent.prototype.afterDetachChild;
    /** @type {?} */
    HotTableComponent.prototype.afterDocumentKeyDown;
    /** @type {?} */
    HotTableComponent.prototype.afterDrawSelection;
    /** @type {?} */
    HotTableComponent.prototype.afterDropdownMenuDefaultOptions;
    /** @type {?} */
    HotTableComponent.prototype.afterDropdownMenuHide;
    /** @type {?} */
    HotTableComponent.prototype.afterDropdownMenuShow;
    /** @type {?} */
    HotTableComponent.prototype.afterFilter;
    /** @type {?} */
    HotTableComponent.prototype.afterGetCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.afterGetColHeader;
    /** @type {?} */
    HotTableComponent.prototype.afterGetColumnHeaderRenderers;
    /** @type {?} */
    HotTableComponent.prototype.afterGetRowHeader;
    /** @type {?} */
    HotTableComponent.prototype.afterGetRowHeaderRenderers;
    /** @type {?} */
    HotTableComponent.prototype.afterHideColumns;
    /** @type {?} */
    HotTableComponent.prototype.afterHideRows;
    /** @type {?} */
    HotTableComponent.prototype.afterInit;
    /** @type {?} */
    HotTableComponent.prototype.afterLanguageChange;
    /** @type {?} */
    HotTableComponent.prototype.afterListen;
    /** @type {?} */
    HotTableComponent.prototype.afterLoadData;
    /** @type {?} */
    HotTableComponent.prototype.afterMergeCells;
    /** @type {?} */
    HotTableComponent.prototype.afterModifyTransformEnd;
    /** @type {?} */
    HotTableComponent.prototype.afterModifyTransformStart;
    /** @type {?} */
    HotTableComponent.prototype.afterMomentumScroll;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellContextMenu;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellCornerDblClick;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellCornerMouseDown;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellMouseDown;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellMouseOut;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellMouseOver;
    /** @type {?} */
    HotTableComponent.prototype.afterOnCellMouseUp;
    /** @type {?} */
    HotTableComponent.prototype.afterPaste;
    /** @type {?} */
    HotTableComponent.prototype.afterPluginsInitialized;
    /** @type {?} */
    HotTableComponent.prototype.afterRedo;
    /** @type {?} */
    HotTableComponent.prototype.afterRedoStackChange;
    /** @type {?} */
    HotTableComponent.prototype.afterRefreshDimensions;
    /** @type {?} */
    HotTableComponent.prototype.afterRemoveCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.afterRemoveCol;
    /** @type {?} */
    HotTableComponent.prototype.afterRemoveRow;
    /** @type {?} */
    HotTableComponent.prototype.afterRender;
    /** @type {?} */
    HotTableComponent.prototype.afterRenderer;
    /** @type {?} */
    HotTableComponent.prototype.afterRowMove;
    /** @type {?} */
    HotTableComponent.prototype.afterRowResize;
    /** @type {?} */
    HotTableComponent.prototype.afterScrollHorizontally;
    /** @type {?} */
    HotTableComponent.prototype.afterScrollVertically;
    /** @type {?} */
    HotTableComponent.prototype.afterSelection;
    /** @type {?} */
    HotTableComponent.prototype.afterSelectionByProp;
    /** @type {?} */
    HotTableComponent.prototype.afterSelectionEnd;
    /** @type {?} */
    HotTableComponent.prototype.afterSelectionEndByProp;
    /** @type {?} */
    HotTableComponent.prototype.afterSetCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.afterSetDataAtCell;
    /** @type {?} */
    HotTableComponent.prototype.afterSetDataAtRowProp;
    /** @type {?} */
    HotTableComponent.prototype.afterSetSourceDataAtCell;
    /** @type {?} */
    HotTableComponent.prototype.afterTrimRow;
    /** @type {?} */
    HotTableComponent.prototype.afterUndo;
    /** @type {?} */
    HotTableComponent.prototype.afterUndoStackChange;
    /** @type {?} */
    HotTableComponent.prototype.afterUnhideColumns;
    /** @type {?} */
    HotTableComponent.prototype.afterUnhideRows;
    /** @type {?} */
    HotTableComponent.prototype.afterUnlisten;
    /** @type {?} */
    HotTableComponent.prototype.afterUnmergeCells;
    /** @type {?} */
    HotTableComponent.prototype.afterUntrimRow;
    /** @type {?} */
    HotTableComponent.prototype.afterUpdateSettings;
    /** @type {?} */
    HotTableComponent.prototype.afterValidate;
    /** @type {?} */
    HotTableComponent.prototype.afterViewportColumnCalculatorOverride;
    /** @type {?} */
    HotTableComponent.prototype.afterViewportRowCalculatorOverride;
    /** @type {?} */
    HotTableComponent.prototype.afterViewRender;
    /** @type {?} */
    HotTableComponent.prototype.beforeAddChild;
    /** @type {?} */
    HotTableComponent.prototype.beforeAutofill;
    /** @type {?} */
    HotTableComponent.prototype.beforeAutofillInsidePopulate;
    /** @type {?} */
    HotTableComponent.prototype.beforeCellAlignment;
    /** @type {?} */
    HotTableComponent.prototype.beforeChange;
    /** @type {?} */
    HotTableComponent.prototype.beforeChangeRender;
    /** @type {?} */
    HotTableComponent.prototype.beforeColumnCollapse;
    /** @type {?} */
    HotTableComponent.prototype.beforeColumnExpand;
    /** @type {?} */
    HotTableComponent.prototype.beforeColumnMove;
    /** @type {?} */
    HotTableComponent.prototype.beforeColumnResize;
    /** @type {?} */
    HotTableComponent.prototype.beforeColumnSort;
    /** @type {?} */
    HotTableComponent.prototype.beforeContextMenuSetItems;
    /** @type {?} */
    HotTableComponent.prototype.beforeContextMenuShow;
    /** @type {?} */
    HotTableComponent.prototype.beforeCopy;
    /** @type {?} */
    HotTableComponent.prototype.beforeCreateCol;
    /** @type {?} */
    HotTableComponent.prototype.beforeCreateRow;
    /** @type {?} */
    HotTableComponent.prototype.beforeCut;
    /** @type {?} */
    HotTableComponent.prototype.beforeDetachChild;
    /** @type {?} */
    HotTableComponent.prototype.beforeDrawBorders;
    /** @type {?} */
    HotTableComponent.prototype.beforeDropdownMenuSetItems;
    /** @type {?} */
    HotTableComponent.prototype.beforeDropdownMenuShow;
    /** @type {?} */
    HotTableComponent.prototype.beforeFilter;
    /** @type {?} */
    HotTableComponent.prototype.beforeGetCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.beforeHideColumns;
    /** @type {?} */
    HotTableComponent.prototype.beforeHideRows;
    /** @type {?} */
    HotTableComponent.prototype.beforeInit;
    /** @type {?} */
    HotTableComponent.prototype.beforeInitWalkontable;
    /** @type {?} */
    HotTableComponent.prototype.beforeKeyDown;
    /** @type {?} */
    HotTableComponent.prototype.beforeLanguageChange;
    /** @type {?} */
    HotTableComponent.prototype.beforeLoadData;
    /** @type {?} */
    HotTableComponent.prototype.beforeMergeCells;
    /** @type {?} */
    HotTableComponent.prototype.beforeOnCellContextMenu;
    /** @type {?} */
    HotTableComponent.prototype.beforeOnCellMouseDown;
    /** @type {?} */
    HotTableComponent.prototype.beforeOnCellMouseOut;
    /** @type {?} */
    HotTableComponent.prototype.beforeOnCellMouseOver;
    /** @type {?} */
    HotTableComponent.prototype.beforeOnCellMouseUp;
    /** @type {?} */
    HotTableComponent.prototype.beforePaste;
    /** @type {?} */
    HotTableComponent.prototype.beforeRedo;
    /** @type {?} */
    HotTableComponent.prototype.beforeRedoStackChange;
    /** @type {?} */
    HotTableComponent.prototype.beforeRefreshDimensions;
    /** @type {?} */
    HotTableComponent.prototype.beforeRemoveCellClassNames;
    /** @type {?} */
    HotTableComponent.prototype.beforeRemoveCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.beforeRemoveCol;
    /** @type {?} */
    HotTableComponent.prototype.beforeRemoveRow;
    /** @type {?} */
    HotTableComponent.prototype.beforeRender;
    /** @type {?} */
    HotTableComponent.prototype.beforeRenderer;
    /** @type {?} */
    HotTableComponent.prototype.beforeRowMove;
    /** @type {?} */
    HotTableComponent.prototype.beforeRowResize;
    /** @type {?} */
    HotTableComponent.prototype.beforeSetCellMeta;
    /** @type {?} */
    HotTableComponent.prototype.beforeSetRangeEnd;
    /** @type {?} */
    HotTableComponent.prototype.beforeSetRangeStart;
    /** @type {?} */
    HotTableComponent.prototype.beforeSetRangeStartOnly;
    /** @type {?} */
    HotTableComponent.prototype.beforeStretchingColumnWidth;
    /** @type {?} */
    HotTableComponent.prototype.beforeTouchScroll;
    /** @type {?} */
    HotTableComponent.prototype.beforeTrimRow;
    /** @type {?} */
    HotTableComponent.prototype.beforeUndo;
    /** @type {?} */
    HotTableComponent.prototype.beforeUndoStackChange;
    /** @type {?} */
    HotTableComponent.prototype.beforeUnhideColumns;
    /** @type {?} */
    HotTableComponent.prototype.beforeUnhideRows;
    /** @type {?} */
    HotTableComponent.prototype.beforeUnmergeCells;
    /** @type {?} */
    HotTableComponent.prototype.beforeUntrimRow;
    /** @type {?} */
    HotTableComponent.prototype.beforeValidate;
    /** @type {?} */
    HotTableComponent.prototype.beforeValueRender;
    /** @type {?} */
    HotTableComponent.prototype.beforeViewRender;
    /** @type {?} */
    HotTableComponent.prototype.construct;
    /** @type {?} */
    HotTableComponent.prototype.init;
    /** @type {?} */
    HotTableComponent.prototype.modifyAutoColumnSizeSeed;
    /** @type {?} */
    HotTableComponent.prototype.modifyAutofillRange;
    /** @type {?} */
    HotTableComponent.prototype.modifyColHeader;
    /** @type {?} */
    HotTableComponent.prototype.modifyColumnHeaderHeight;
    /** @type {?} */
    HotTableComponent.prototype.modifyColWidth;
    /** @type {?} */
    HotTableComponent.prototype.modifyCopyableRange;
    /** @type {?} */
    HotTableComponent.prototype.modifyData;
    /** @type {?} */
    HotTableComponent.prototype.modifyGetCellCoords;
    /** @type {?} */
    HotTableComponent.prototype.modifyRowData;
    /** @type {?} */
    HotTableComponent.prototype.modifyRowHeader;
    /** @type {?} */
    HotTableComponent.prototype.modifyRowHeaderWidth;
    /** @type {?} */
    HotTableComponent.prototype.modifyRowHeight;
    /** @type {?} */
    HotTableComponent.prototype.modifySourceData;
    /** @type {?} */
    HotTableComponent.prototype.modifyTransformEnd;
    /** @type {?} */
    HotTableComponent.prototype.modifyTransformStart;
    /** @type {?} */
    HotTableComponent.prototype.persistentStateLoad;
    /** @type {?} */
    HotTableComponent.prototype.persistentStateReset;
    /** @type {?} */
    HotTableComponent.prototype.persistentStateSave;
    /**
     * @type {?}
     * @private
     */
    HotTableComponent.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    HotTableComponent.prototype._hotTableRegisterer;
    /**
     * @type {?}
     * @private
     */
    HotTableComponent.prototype._hotSettingsResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYW5kc29udGFibGUvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9ob3QtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUlOLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDdEIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd0RTtJQWdURSwyQkFDVSxPQUFlLEVBQ2YsbUJBQXVDLEVBQ3ZDLG9CQUF5QztRQUZ6QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Ysd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBMVMzQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsc0JBQWlCLEdBQXlCLEVBQUUsQ0FBQztRQUc1QyxVQUFLLEdBQUcsRUFBRSxDQUFDO0lBdVNqQixDQUFDO0lBRUosc0JBQVksMENBQVc7Ozs7O1FBQXZCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFFbEYsZ0ZBQWdGO2dCQUNoRixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7YUFFM0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXBELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FB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OztJQUNqRCxxREFBeUY7O0lBQ3pGLGdEQUErRTs7SUFDL0UsNENBQXVFOztJQUN2RSxxREFBeUY7O0lBQ3pGLDJDQUFxRTs7SUFDckUsZ0RBQStFOztJQUMvRSx1Q0FBNkQ7O0lBQzdELGdEQUErRTs7SUFDL0UsMENBQW1FOztJQUNuRSw0Q0FBdUU7O0lBQ3ZFLGlEQUFpRjs7SUFDakYsNENBQXVFOztJQUN2RSw2Q0FBeUU7O0lBQ3pFLCtDQUE2RTs7SUFDN0UsaURBQWlGOztJQUNqRixnREFBK0U7O0lBQy9FLGlEQUFpRjs7SUFDakYsZ0RBQStFOzs7OztJQUc3RSxvQ0FBdUI7Ozs7O0lBQ3ZCLGdEQUErQzs7Ozs7SUFDL0MsaURBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgSGFuZHNvbnRhYmxlIGZyb20gJ2hhbmRzb250YWJsZS9iYXNlJztcbmltcG9ydCB7XG4gIEhvdFRhYmxlUmVnaXN0ZXJlcixcbiAgSE9UX0RFU1RST1lFRF9XQVJOSU5HXG59IGZyb20gJy4vaG90LXRhYmxlLXJlZ2lzdGVyZXIuc2VydmljZSc7XG5pbXBvcnQgeyBIb3RTZXR0aW5nc1Jlc29sdmVyIH0gZnJvbSAnLi9ob3Qtc2V0dGluZ3MtcmVzb2x2ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBIb3RDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL2hvdC1jb2x1bW4uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaG90LXRhYmxlJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250YWluZXIgW2lkXT1cImhvdElkXCI+PC9kaXY+JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbIEhvdFRhYmxlUmVnaXN0ZXJlciwgSG90U2V0dGluZ3NSZXNvbHZlciBdLFxufSlcbmV4cG9ydCBjbGFzcyBIb3RUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBjb250YWluZXI7XG5cbiAgcHJpdmF0ZSBfX2hvdEluc3RhbmNlOiBIYW5kc29udGFibGUgPSBudWxsO1xuICBwcml2YXRlIGNvbHVtbnNDb21wb25lbnRzOiBIb3RDb2x1bW5Db21wb25lbnRbXSA9IFtdO1xuICAvLyBjb21wb25lbnQgaW5wdXRzXG4gIEBJbnB1dCgpIHNldHRpbmdzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzO1xuICBASW5wdXQoKSBob3RJZCA9ICcnO1xuICAvLyBoYW5kc29udGFibGUgb3B0aW9uc1xuICBASW5wdXQoKSBhY3RpdmVIZWFkZXJDbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FjdGl2ZUhlYWRlckNsYXNzTmFtZSddO1xuICBASW5wdXQoKSBhbGxvd0VtcHR5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhbGxvd0VtcHR5J107XG4gIEBJbnB1dCgpIGFsbG93SHRtbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWxsb3dIdG1sJ107XG4gIEBJbnB1dCgpIGFsbG93SW5zZXJ0Q29sdW1uOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhbGxvd0luc2VydENvbHVtbiddO1xuICBASW5wdXQoKSBhbGxvd0luc2VydFJvdzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWxsb3dJbnNlcnRSb3cnXTtcbiAgQElucHV0KCkgYWxsb3dJbnZhbGlkOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhbGxvd0ludmFsaWQnXTtcbiAgQElucHV0KCkgYWxsb3dSZW1vdmVDb2x1bW46IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FsbG93UmVtb3ZlQ29sdW1uJ107XG4gIEBJbnB1dCgpIGFsbG93UmVtb3ZlUm93OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhbGxvd1JlbW92ZVJvdyddO1xuICBASW5wdXQoKSBhdXRvQ29sdW1uU2l6ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYXV0b0NvbHVtblNpemUnXTtcbiAgQElucHV0KCkgYXV0b1Jvd1NpemU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2F1dG9Sb3dTaXplJ107XG4gIEBJbnB1dCgpIGF1dG9XcmFwQ29sOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhdXRvV3JhcENvbCddO1xuICBASW5wdXQoKSBhdXRvV3JhcFJvdzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYXV0b1dyYXBSb3cnXTtcbiAgQElucHV0KCkgYmluZFJvd3NXaXRoSGVhZGVyczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmluZFJvd3NXaXRoSGVhZGVycyddO1xuICBASW5wdXQoKSBjZWxsOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjZWxsJ107XG4gIEBJbnB1dCgpIGNlbGxzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjZWxscyddO1xuICBASW5wdXQoKSBjaGVja2VkVGVtcGxhdGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2NoZWNrZWRUZW1wbGF0ZSddO1xuICBASW5wdXQoKSBjbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2NsYXNzTmFtZSddO1xuICBASW5wdXQoKSBjb2xIZWFkZXJzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjb2xIZWFkZXJzJ107XG4gIEBJbnB1dCgpIGNvbGxhcHNpYmxlQ29sdW1uczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29sbGFwc2libGVDb2x1bW5zJ107XG4gIEBJbnB1dCgpIGNvbHVtbkhlYWRlckhlaWdodDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29sdW1uSGVhZGVySGVpZ2h0J107XG4gIEBJbnB1dCgpIGNvbHVtbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2NvbHVtbnMnXTtcbiAgQElucHV0KCkgY29sdW1uU29ydGluZzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29sdW1uU29ydGluZyddO1xuICBASW5wdXQoKSBjb2x1bW5TdW1tYXJ5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjb2x1bW5TdW1tYXJ5J107XG4gIEBJbnB1dCgpIGNvbFdpZHRoczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29sV2lkdGhzJ107XG4gIEBJbnB1dCgpIGNvbW1lbnRlZENlbGxDbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2NvbW1lbnRlZENlbGxDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgY29tbWVudHM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2NvbW1lbnRzJ107XG4gIEBJbnB1dCgpIGNvbnRleHRNZW51OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjb250ZXh0TWVudSddO1xuICBASW5wdXQoKSBjb3B5YWJsZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29weWFibGUnXTtcbiAgQElucHV0KCkgY29weVBhc3RlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjb3B5UGFzdGUnXTtcbiAgQElucHV0KCkgY29ycmVjdEZvcm1hdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY29ycmVjdEZvcm1hdCddO1xuICBASW5wdXQoKSBjdXJyZW50Q29sQ2xhc3NOYW1lOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjdXJyZW50Q29sQ2xhc3NOYW1lJ107XG4gIEBJbnB1dCgpIGN1cnJlbnRIZWFkZXJDbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2N1cnJlbnRIZWFkZXJDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgY3VycmVudFJvd0NsYXNzTmFtZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snY3VycmVudFJvd0NsYXNzTmFtZSddO1xuICBASW5wdXQoKSBjdXN0b21Cb3JkZXJzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjdXN0b21Cb3JkZXJzJ107XG4gIEBJbnB1dCgpIGRhdGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2RhdGEnXTtcbiAgQElucHV0KCkgZGF0YVNjaGVtYTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZGF0YVNjaGVtYSddO1xuICBASW5wdXQoKSBkYXRlRm9ybWF0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydkYXRlRm9ybWF0J107XG4gIEBJbnB1dCgpIGRlZmF1bHREYXRlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydkZWZhdWx0RGF0ZSddO1xuICBASW5wdXQoKSBkaXNhYmxlVmlzdWFsU2VsZWN0aW9uOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydkaXNhYmxlVmlzdWFsU2VsZWN0aW9uJ107XG4gIEBJbnB1dCgpIGRyYWdUb1Njcm9sbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZHJhZ1RvU2Nyb2xsJ107XG4gIEBJbnB1dCgpIGRyb3Bkb3duTWVudTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZHJvcGRvd25NZW51J107XG4gIEBJbnB1dCgpIGVkaXRvcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZWRpdG9yJ107XG4gIEBJbnB1dCgpIGVudGVyQmVnaW5zRWRpdGluZzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZW50ZXJCZWdpbnNFZGl0aW5nJ107XG4gIEBJbnB1dCgpIGVudGVyTW92ZXM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2VudGVyTW92ZXMnXTtcbiAgQElucHV0KCkgZmlsbEhhbmRsZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZmlsbEhhbmRsZSddO1xuICBASW5wdXQoKSBmaWx0ZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2ZpbHRlciddO1xuICBASW5wdXQoKSBmaWx0ZXJpbmdDYXNlU2Vuc2l0aXZlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydmaWx0ZXJpbmdDYXNlU2Vuc2l0aXZlJ107XG4gIEBJbnB1dCgpIGZpbHRlcnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2ZpbHRlcnMnXTtcbiAgQElucHV0KCkgZml4ZWRDb2x1bW5zTGVmdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZml4ZWRDb2x1bW5zTGVmdCddO1xuICBASW5wdXQoKSBmaXhlZFJvd3NCb3R0b206IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2ZpeGVkUm93c0JvdHRvbSddO1xuICBASW5wdXQoKSBmaXhlZFJvd3NUb3A6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2ZpeGVkUm93c1RvcCddO1xuICBASW5wdXQoKSBmb3JtdWxhczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snZm9ybXVsYXMnXTtcbiAgQElucHV0KCkgZnJhZ21lbnRTZWxlY3Rpb246IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2ZyYWdtZW50U2VsZWN0aW9uJ107XG4gIEBJbnB1dCgpIGhlaWdodDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snaGVpZ2h0J107XG4gIEBJbnB1dCgpIGhpZGRlbkNvbHVtbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2hpZGRlbkNvbHVtbnMnXTtcbiAgQElucHV0KCkgaGlkZGVuUm93czogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snaGlkZGVuUm93cyddO1xuICBASW5wdXQoKSBpbnZhbGlkQ2VsbENsYXNzTmFtZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snaW52YWxpZENlbGxDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgbGFiZWw6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2xhYmVsJ107XG4gIEBJbnB1dCgpIGxhbmd1YWdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydsYW5ndWFnZSddO1xuICBASW5wdXQoKSBsaWNlbnNlS2V5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydsaWNlbnNlS2V5J107XG4gIEBJbnB1dCgpIG1hbnVhbENvbHVtbkZyZWV6ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbWFudWFsQ29sdW1uRnJlZXplJ107XG4gIEBJbnB1dCgpIG1hbnVhbENvbHVtbk1vdmU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21hbnVhbENvbHVtbk1vdmUnXTtcbiAgQElucHV0KCkgbWFudWFsQ29sdW1uUmVzaXplOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtYW51YWxDb2x1bW5SZXNpemUnXTtcbiAgQElucHV0KCkgbWFudWFsUm93TW92ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbWFudWFsUm93TW92ZSddO1xuICBASW5wdXQoKSBtYW51YWxSb3dSZXNpemU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21hbnVhbFJvd1Jlc2l6ZSddO1xuICBASW5wdXQoKSBtYXhDb2xzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtYXhDb2xzJ107XG4gIEBJbnB1dCgpIG1heFJvd3M6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21heFJvd3MnXTtcbiAgQElucHV0KCkgbWVyZ2VDZWxsczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbWVyZ2VDZWxscyddO1xuICBASW5wdXQoKSBtaW5Db2xzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtaW5Db2xzJ107XG4gIEBJbnB1dCgpIG1pblJvd3M6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21pblJvd3MnXTtcbiAgQElucHV0KCkgbWluU3BhcmVDb2xzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtaW5TcGFyZUNvbHMnXTtcbiAgQElucHV0KCkgbWluU3BhcmVSb3dzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtaW5TcGFyZVJvd3MnXTtcbiAgQElucHV0KCkgbXVsdGlDb2x1bW5Tb3J0aW5nOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtdWx0aUNvbHVtblNvcnRpbmcnXTtcbiAgQElucHV0KCkgbmVzdGVkSGVhZGVyczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbmVzdGVkSGVhZGVycyddO1xuICBASW5wdXQoKSBuZXN0ZWRSb3dzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyduZXN0ZWRSb3dzJ107XG4gIEBJbnB1dCgpIG5vV29yZFdyYXBDbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ25vV29yZFdyYXBDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgbnVtZXJpY0Zvcm1hdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbnVtZXJpY0Zvcm1hdCddO1xuICBASW5wdXQoKSBvYnNlcnZlRE9NVmlzaWJpbGl0eTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snb2JzZXJ2ZURPTVZpc2liaWxpdHknXTtcbiAgQElucHV0KCkgb3V0c2lkZUNsaWNrRGVzZWxlY3RzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydvdXRzaWRlQ2xpY2tEZXNlbGVjdHMnXTtcbiAgQElucHV0KCkgcGVyc2lzdGVudFN0YXRlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydwZXJzaXN0ZW50U3RhdGUnXTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3BsYWNlaG9sZGVyJ107XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyQ2VsbENsYXNzTmFtZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sncGxhY2Vob2xkZXJDZWxsQ2xhc3NOYW1lJ107XG4gIEBJbnB1dCgpIHByZXZlbnRPdmVyZmxvdzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sncHJldmVudE92ZXJmbG93J107XG4gIEBJbnB1dCgpIHByZXZlbnRXaGVlbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sncHJldmVudFdoZWVsJ107XG4gIEBJbnB1dCgpIHJlYWRPbmx5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyZWFkT25seSddO1xuICBASW5wdXQoKSByZWFkT25seUNlbGxDbGFzc05hbWU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3JlYWRPbmx5Q2VsbENsYXNzTmFtZSddO1xuICBASW5wdXQoKSByZW5kZXJBbGxSb3dzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyZW5kZXJBbGxSb3dzJ107XG4gIEBJbnB1dCgpIHJlbmRlcmVyOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyZW5kZXJlciddO1xuICBASW5wdXQoKSByb3dIZWFkZXJzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyb3dIZWFkZXJzJ107XG4gIEBJbnB1dCgpIHJvd0hlYWRlcldpZHRoOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyb3dIZWFkZXJXaWR0aCddO1xuICBASW5wdXQoKSByb3dIZWlnaHRzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydyb3dIZWlnaHRzJ107XG4gIEBJbnB1dCgpIHNlYXJjaDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snc2VhcmNoJ107XG4gIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3NlbGVjdGlvbk1vZGUnXTtcbiAgQElucHV0KCkgc2VsZWN0T3B0aW9uczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snc2VsZWN0T3B0aW9ucyddO1xuICBASW5wdXQoKSBza2lwQ29sdW1uT25QYXN0ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snc2tpcENvbHVtbk9uUGFzdGUnXTtcbiAgQElucHV0KCkgc2tpcFJvd09uUGFzdGU6IGFueTtcbiAgQElucHV0KCkgc29ydEJ5UmVsZXZhbmNlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydzb3J0QnlSZWxldmFuY2UnXTtcbiAgQElucHV0KCkgc291cmNlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydzb3VyY2UnXTtcbiAgQElucHV0KCkgc3RhcnRDb2xzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydzdGFydENvbHMnXTtcbiAgQElucHV0KCkgc3RhcnRSb3dzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydzdGFydFJvd3MnXTtcbiAgQElucHV0KCkgc3RyZXRjaEg6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3N0cmV0Y2hIJ107XG4gIEBJbnB1dCgpIHN0cmljdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snc3RyaWN0J107XG4gIEBJbnB1dCgpIHRhYmxlQ2xhc3NOYW1lOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd0YWJsZUNsYXNzTmFtZSddO1xuICBASW5wdXQoKSB0YWJNb3ZlczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sndGFiTW92ZXMnXTtcbiAgQElucHV0KCkgdGl0bGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3RpdGxlJ107XG4gIEBJbnB1dCgpIHRyaW1Ecm9wZG93bjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sndHJpbURyb3Bkb3duJ107XG4gIEBJbnB1dCgpIHRyaW1Sb3dzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyduZXN0ZWRSb3dzJ107XG4gIEBJbnB1dCgpIHRyaW1XaGl0ZXNwYWNlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd0cmltV2hpdGVzcGFjZSddO1xuICBASW5wdXQoKSB0eXBlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd0eXBlJ107XG4gIEBJbnB1dCgpIHVuY2hlY2tlZFRlbXBsYXRlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd1bmNoZWNrZWRUZW1wbGF0ZSddO1xuICBASW5wdXQoKSB1bmRvOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd1bmRvJ107XG4gIEBJbnB1dCgpIHZhbGlkYXRvcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sndmFsaWRhdG9yJ107XG4gIEBJbnB1dCgpIHZpZXdwb3J0Q29sdW1uUmVuZGVyaW5nT2Zmc2V0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd2aWV3cG9ydENvbHVtblJlbmRlcmluZ09mZnNldCddO1xuICBASW5wdXQoKSB2aWV3cG9ydFJvd1JlbmRlcmluZ09mZnNldDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1sndmlld3BvcnRSb3dSZW5kZXJpbmdPZmZzZXQnXTtcbiAgQElucHV0KCkgdmlzaWJsZVJvd3M6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ3Zpc2libGVSb3dzJ107XG4gIEBJbnB1dCgpIHdpZHRoOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWyd3aWR0aCddO1xuICBASW5wdXQoKSB3b3JkV3JhcDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snd29yZFdyYXAnXTtcblxuICAvLyBoYW5kc29udGFibGUgaG9va3NcbiAgQElucHV0KCkgYWZ0ZXJBZGRDaGlsZDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJBZGRDaGlsZCddO1xuICBASW5wdXQoKSBhZnRlckF1dG9maWxsOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckF1dG9maWxsJ107XG4gIEBJbnB1dCgpIGFmdGVyQmVnaW5FZGl0aW5nOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckJlZ2luRWRpdGluZyddO1xuICBASW5wdXQoKSBhZnRlckNlbGxNZXRhUmVzZXQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ2VsbE1ldGFSZXNldCddO1xuICBASW5wdXQoKSBhZnRlckNoYW5nZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJDaGFuZ2UnXTtcbiAgQElucHV0KCkgYWZ0ZXJDaGFuZ2VzT2JzZXJ2ZWQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ2hhbmdlc09ic2VydmVkJ107XG4gIEBJbnB1dCgpIGFmdGVyQ29sdW1uQ29sbGFwc2U6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ29sdW1uQ29sbGFwc2UnXTtcbiAgQElucHV0KCkgYWZ0ZXJDb2x1bW5FeHBhbmQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ29sdW1uRXhwYW5kJ107XG4gIEBJbnB1dCgpIGFmdGVyQ29sdW1uTW92ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJDb2x1bW5Nb3ZlJ107XG4gIEBJbnB1dCgpIGFmdGVyQ29sdW1uUmVzaXplOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckNvbHVtblJlc2l6ZSddO1xuICBASW5wdXQoKSBhZnRlckNvbHVtblNvcnQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ29sdW1uU29ydCddO1xuICBASW5wdXQoKSBhZnRlckNvbnRleHRNZW51RGVmYXVsdE9wdGlvbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ29udGV4dE1lbnVEZWZhdWx0T3B0aW9ucyddO1xuICBASW5wdXQoKSBhZnRlckNvbnRleHRNZW51SGlkZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJDb250ZXh0TWVudUhpZGUnXTtcbiAgQElucHV0KCkgYWZ0ZXJDb250ZXh0TWVudVNob3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ29udGV4dE1lbnVTaG93J107XG4gIEBJbnB1dCgpIGFmdGVyQ29weTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJDb3B5J107XG4gIEBJbnB1dCgpIGFmdGVyQ29weUxpbWl0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckNvcHlMaW1pdCddO1xuICBASW5wdXQoKSBhZnRlckNyZWF0ZUNvbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJDcmVhdGVDb2wnXTtcbiAgQElucHV0KCkgYWZ0ZXJDcmVhdGVSb3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyQ3JlYXRlUm93J107XG4gIEBJbnB1dCgpIGFmdGVyQ3V0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckN1dCddO1xuICBASW5wdXQoKSBhZnRlckRlc2VsZWN0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckRlc2VsZWN0J107XG4gIEBJbnB1dCgpIGFmdGVyRGVzdHJveTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJEZXN0cm95J107XG4gIEBJbnB1dCgpIGFmdGVyRGV0YWNoQ2hpbGQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyRGV0YWNoQ2hpbGQnXTtcbiAgQElucHV0KCkgYWZ0ZXJEb2N1bWVudEtleURvd246IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyRG9jdW1lbnRLZXlEb3duJ107XG4gIEBJbnB1dCgpIGFmdGVyRHJhd1NlbGVjdGlvbjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJEcmF3U2VsZWN0aW9uJ107XG4gIEBJbnB1dCgpIGFmdGVyRHJvcGRvd25NZW51RGVmYXVsdE9wdGlvbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyRHJvcGRvd25NZW51RGVmYXVsdE9wdGlvbnMnXTtcbiAgQElucHV0KCkgYWZ0ZXJEcm9wZG93bk1lbnVIaWRlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckRyb3Bkb3duTWVudUhpZGUnXTtcbiAgQElucHV0KCkgYWZ0ZXJEcm9wZG93bk1lbnVTaG93OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckRyb3Bkb3duTWVudVNob3cnXTtcbiAgQElucHV0KCkgYWZ0ZXJGaWx0ZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyRmlsdGVyJ107XG4gIEBJbnB1dCgpIGFmdGVyR2V0Q2VsbE1ldGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyR2V0Q2VsbE1ldGEnXTtcbiAgQElucHV0KCkgYWZ0ZXJHZXRDb2xIZWFkZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyR2V0Q29sSGVhZGVyJ107XG4gIEBJbnB1dCgpIGFmdGVyR2V0Q29sdW1uSGVhZGVyUmVuZGVyZXJzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckdldENvbHVtbkhlYWRlclJlbmRlcmVycyddO1xuICBASW5wdXQoKSBhZnRlckdldFJvd0hlYWRlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJHZXRSb3dIZWFkZXInXTtcbiAgQElucHV0KCkgYWZ0ZXJHZXRSb3dIZWFkZXJSZW5kZXJlcnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyR2V0Um93SGVhZGVyUmVuZGVyZXJzJ107XG4gIEBJbnB1dCgpIGFmdGVySGlkZUNvbHVtbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVySGlkZUNvbHVtbnMnXTtcbiAgQElucHV0KCkgYWZ0ZXJIaWRlUm93czogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJIaWRlUm93cyddO1xuICBASW5wdXQoKSBhZnRlckluaXQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVySW5pdCddO1xuICBASW5wdXQoKSBhZnRlckxhbmd1YWdlQ2hhbmdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckxhbmd1YWdlQ2hhbmdlJ107XG4gIEBJbnB1dCgpIGFmdGVyTGlzdGVuOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckxpc3RlbiddO1xuICBASW5wdXQoKSBhZnRlckxvYWREYXRhOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlckxvYWREYXRhJ107XG4gIEBJbnB1dCgpIGFmdGVyTWVyZ2VDZWxsczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJNZXJnZUNlbGxzJ107XG4gIEBJbnB1dCgpIGFmdGVyTW9kaWZ5VHJhbnNmb3JtRW5kOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlck1vZGlmeVRyYW5zZm9ybUVuZCddO1xuICBASW5wdXQoKSBhZnRlck1vZGlmeVRyYW5zZm9ybVN0YXJ0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlck1vZGlmeVRyYW5zZm9ybVN0YXJ0J107XG4gIEBJbnB1dCgpIGFmdGVyTW9tZW50dW1TY3JvbGw6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyTW9tZW50dW1TY3JvbGwnXTtcbiAgQElucHV0KCkgYWZ0ZXJPbkNlbGxDb250ZXh0TWVudTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJPbkNlbGxDb250ZXh0TWVudSddO1xuICBASW5wdXQoKSBhZnRlck9uQ2VsbENvcm5lckRibENsaWNrOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlck9uQ2VsbENvcm5lckRibENsaWNrJ107XG4gIEBJbnB1dCgpIGFmdGVyT25DZWxsQ29ybmVyTW91c2VEb3duOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlck9uQ2VsbENvcm5lck1vdXNlRG93biddO1xuICBASW5wdXQoKSBhZnRlck9uQ2VsbE1vdXNlRG93bjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJPbkNlbGxNb3VzZURvd24nXTtcbiAgQElucHV0KCkgYWZ0ZXJPbkNlbGxNb3VzZU91dDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJPbkNlbGxNb3VzZU91dCddO1xuICBASW5wdXQoKSBhZnRlck9uQ2VsbE1vdXNlT3ZlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJPbkNlbGxNb3VzZU92ZXInXTtcbiAgQElucHV0KCkgYWZ0ZXJPbkNlbGxNb3VzZVVwOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlck9uQ2VsbE1vdXNlVXAnXTtcbiAgQElucHV0KCkgYWZ0ZXJQYXN0ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJQYXN0ZSddO1xuICBASW5wdXQoKSBhZnRlclBsdWdpbnNJbml0aWFsaXplZDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJQbHVnaW5zSW5pdGlhbGl6ZWQnXTtcbiAgQElucHV0KCkgYWZ0ZXJSZWRvOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclJlZG8nXTtcbiAgQElucHV0KCkgYWZ0ZXJSZWRvU3RhY2tDaGFuZ2U6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyUmVkb1N0YWNrQ2hhbmdlJ107XG4gIEBJbnB1dCgpIGFmdGVyUmVmcmVzaERpbWVuc2lvbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyUmVmcmVzaERpbWVuc2lvbnMnXTtcbiAgQElucHV0KCkgYWZ0ZXJSZW1vdmVDZWxsTWV0YTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJSZW1vdmVDZWxsTWV0YSddO1xuICBASW5wdXQoKSBhZnRlclJlbW92ZUNvbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJSZW1vdmVDb2wnXTtcbiAgQElucHV0KCkgYWZ0ZXJSZW1vdmVSb3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyUmVtb3ZlUm93J107XG4gIEBJbnB1dCgpIGFmdGVyUmVuZGVyOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclJlbmRlciddO1xuICBASW5wdXQoKSBhZnRlclJlbmRlcmVyOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclJlbmRlcmVyJ107XG4gIEBJbnB1dCgpIGFmdGVyUm93TW92ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJSb3dNb3ZlJ107XG4gIEBJbnB1dCgpIGFmdGVyUm93UmVzaXplOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclJvd1Jlc2l6ZSddO1xuICBASW5wdXQoKSBhZnRlclNjcm9sbEhvcml6b250YWxseTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJTY3JvbGxIb3Jpem9udGFsbHknXTtcbiAgQElucHV0KCkgYWZ0ZXJTY3JvbGxWZXJ0aWNhbGx5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclNjcm9sbFZlcnRpY2FsbHknXTtcbiAgQElucHV0KCkgYWZ0ZXJTZWxlY3Rpb246IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyU2VsZWN0aW9uJ107XG4gIEBJbnB1dCgpIGFmdGVyU2VsZWN0aW9uQnlQcm9wOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclNlbGVjdGlvbkJ5UHJvcCddO1xuICBASW5wdXQoKSBhZnRlclNlbGVjdGlvbkVuZDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJTZWxlY3Rpb25FbmQnXTtcbiAgQElucHV0KCkgYWZ0ZXJTZWxlY3Rpb25FbmRCeVByb3A6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyU2VsZWN0aW9uRW5kQnlQcm9wJ107XG4gIEBJbnB1dCgpIGFmdGVyU2V0Q2VsbE1ldGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyU2V0Q2VsbE1ldGEnXTtcbiAgQElucHV0KCkgYWZ0ZXJTZXREYXRhQXRDZWxsOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclNldERhdGFBdENlbGwnXTtcbiAgQElucHV0KCkgYWZ0ZXJTZXREYXRhQXRSb3dQcm9wOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclNldERhdGFBdFJvd1Byb3AnXTtcbiAgQElucHV0KCkgYWZ0ZXJTZXRTb3VyY2VEYXRhQXRDZWxsOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclNldFNvdXJjZURhdGFBdENlbGwnXTtcbiAgQElucHV0KCkgYWZ0ZXJUcmltUm93OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclRyaW1Sb3cnXTtcbiAgQElucHV0KCkgYWZ0ZXJVbmRvOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclVuZG8nXTtcbiAgQElucHV0KCkgYWZ0ZXJVbmRvU3RhY2tDaGFuZ2U6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyVW5kb1N0YWNrQ2hhbmdlJ107XG4gIEBJbnB1dCgpIGFmdGVyVW5oaWRlQ29sdW1uczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJVbmhpZGVDb2x1bW5zJ107XG4gIEBJbnB1dCgpIGFmdGVyVW5oaWRlUm93czogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJVbmhpZGVSb3dzJ107XG4gIEBJbnB1dCgpIGFmdGVyVW5saXN0ZW46IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyVW5saXN0ZW4nXTtcbiAgQElucHV0KCkgYWZ0ZXJVbm1lcmdlQ2VsbHM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyVW5tZXJnZUNlbGxzJ107XG4gIEBJbnB1dCgpIGFmdGVyVW50cmltUm93OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclVudHJpbVJvdyddO1xuICBASW5wdXQoKSBhZnRlclVwZGF0ZVNldHRpbmdzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclVwZGF0ZVNldHRpbmdzJ107XG4gIEBJbnB1dCgpIGFmdGVyVmFsaWRhdGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2FmdGVyVmFsaWRhdGUnXTtcbiAgQElucHV0KCkgYWZ0ZXJWaWV3cG9ydENvbHVtbkNhbGN1bGF0b3JPdmVycmlkZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJWaWV3cG9ydENvbHVtbkNhbGN1bGF0b3JPdmVycmlkZSddO1xuICBASW5wdXQoKSBhZnRlclZpZXdwb3J0Um93Q2FsY3VsYXRvck92ZXJyaWRlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydhZnRlclZpZXdwb3J0Um93Q2FsY3VsYXRvck92ZXJyaWRlJ107XG4gIEBJbnB1dCgpIGFmdGVyVmlld1JlbmRlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYWZ0ZXJWaWV3UmVuZGVyJ107XG4gIEBJbnB1dCgpIGJlZm9yZUFkZENoaWxkOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVBZGRDaGlsZCddO1xuICBASW5wdXQoKSBiZWZvcmVBdXRvZmlsbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQXV0b2ZpbGwnXTtcbiAgQElucHV0KCkgYmVmb3JlQXV0b2ZpbGxJbnNpZGVQb3B1bGF0ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQXV0b2ZpbGxJbnNpZGVQb3B1bGF0ZSddO1xuICBASW5wdXQoKSBiZWZvcmVDZWxsQWxpZ25tZW50OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVDZWxsQWxpZ25tZW50J107XG4gIEBJbnB1dCgpIGJlZm9yZUNoYW5nZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ2hhbmdlJ107XG4gIEBJbnB1dCgpIGJlZm9yZUNoYW5nZVJlbmRlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ2hhbmdlUmVuZGVyJ107XG4gIEBJbnB1dCgpIGJlZm9yZUNvbHVtbkNvbGxhcHNlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVDb2x1bW5Db2xsYXBzZSddO1xuICBASW5wdXQoKSBiZWZvcmVDb2x1bW5FeHBhbmQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZUNvbHVtbkV4cGFuZCddO1xuICBASW5wdXQoKSBiZWZvcmVDb2x1bW5Nb3ZlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVDb2x1bW5Nb3ZlJ107XG4gIEBJbnB1dCgpIGJlZm9yZUNvbHVtblJlc2l6ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ29sdW1uUmVzaXplJ107XG4gIEBJbnB1dCgpIGJlZm9yZUNvbHVtblNvcnQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZUNvbHVtblNvcnQnXTtcbiAgQElucHV0KCkgYmVmb3JlQ29udGV4dE1lbnVTZXRJdGVtczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ29udGV4dE1lbnVTZXRJdGVtcyddO1xuICBASW5wdXQoKSBiZWZvcmVDb250ZXh0TWVudVNob3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZUNvbnRleHRNZW51U2hvdyddO1xuICBASW5wdXQoKSBiZWZvcmVDb3B5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVDb3B5J107XG4gIEBJbnB1dCgpIGJlZm9yZUNyZWF0ZUNvbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ3JlYXRlQ29sJ107XG4gIEBJbnB1dCgpIGJlZm9yZUNyZWF0ZVJvdzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ3JlYXRlUm93J107XG4gIEBJbnB1dCgpIGJlZm9yZUN1dDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlQ3V0J107XG4gIEBJbnB1dCgpIGJlZm9yZURldGFjaENoaWxkOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVEZXRhY2hDaGlsZCddO1xuICBASW5wdXQoKSBiZWZvcmVEcmF3Qm9yZGVyczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlRHJhd0JvcmRlcnMnXTtcbiAgQElucHV0KCkgYmVmb3JlRHJvcGRvd25NZW51U2V0SXRlbXM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZURyb3Bkb3duTWVudVNldEl0ZW1zJ107XG4gIEBJbnB1dCgpIGJlZm9yZURyb3Bkb3duTWVudVNob3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZURyb3Bkb3duTWVudVNob3cnXTtcbiAgQElucHV0KCkgYmVmb3JlRmlsdGVyOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVGaWx0ZXInXTtcbiAgQElucHV0KCkgYmVmb3JlR2V0Q2VsbE1ldGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZUdldENlbGxNZXRhJ107XG4gIEBJbnB1dCgpIGJlZm9yZUhpZGVDb2x1bW5zOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVIaWRlQ29sdW1ucyddO1xuICBASW5wdXQoKSBiZWZvcmVIaWRlUm93czogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlSGlkZVJvd3MnXTtcbiAgQElucHV0KCkgYmVmb3JlSW5pdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlSW5pdCddO1xuICBASW5wdXQoKSBiZWZvcmVJbml0V2Fsa29udGFibGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZUluaXRXYWxrb250YWJsZSddO1xuICBASW5wdXQoKSBiZWZvcmVLZXlEb3duOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVLZXlEb3duJ107XG4gIEBJbnB1dCgpIGJlZm9yZUxhbmd1YWdlQ2hhbmdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVMYW5ndWFnZUNoYW5nZSddO1xuICBASW5wdXQoKSBiZWZvcmVMb2FkRGF0YTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlTG9hZERhdGEnXTtcbiAgQElucHV0KCkgYmVmb3JlTWVyZ2VDZWxsczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlTWVyZ2VDZWxscyddO1xuICBASW5wdXQoKSBiZWZvcmVPbkNlbGxDb250ZXh0TWVudTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlT25DZWxsQ29udGV4dE1lbnUnXTtcbiAgQElucHV0KCkgYmVmb3JlT25DZWxsTW91c2VEb3duOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVPbkNlbGxNb3VzZURvd24nXTtcbiAgQElucHV0KCkgYmVmb3JlT25DZWxsTW91c2VPdXQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZU9uQ2VsbE1vdXNlT3V0J107XG4gIEBJbnB1dCgpIGJlZm9yZU9uQ2VsbE1vdXNlT3ZlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlT25DZWxsTW91c2VPdmVyJ107XG4gIEBJbnB1dCgpIGJlZm9yZU9uQ2VsbE1vdXNlVXA6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZU9uQ2VsbE1vdXNlVXAnXTtcbiAgQElucHV0KCkgYmVmb3JlUGFzdGU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVBhc3RlJ107XG4gIEBJbnB1dCgpIGJlZm9yZVJlZG86IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVJlZG8nXTtcbiAgQElucHV0KCkgYmVmb3JlUmVkb1N0YWNrQ2hhbmdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSZWRvU3RhY2tDaGFuZ2UnXTtcbiAgQElucHV0KCkgYmVmb3JlUmVmcmVzaERpbWVuc2lvbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVJlZnJlc2hEaW1lbnNpb25zJ107XG4gIEBJbnB1dCgpIGJlZm9yZVJlbW92ZUNlbGxDbGFzc05hbWVzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSZW1vdmVDZWxsQ2xhc3NOYW1lcyddO1xuICBASW5wdXQoKSBiZWZvcmVSZW1vdmVDZWxsTWV0YTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlUmVtb3ZlQ2VsbE1ldGEnXTtcbiAgQElucHV0KCkgYmVmb3JlUmVtb3ZlQ29sOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSZW1vdmVDb2wnXTtcbiAgQElucHV0KCkgYmVmb3JlUmVtb3ZlUm93OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSZW1vdmVSb3cnXTtcbiAgQElucHV0KCkgYmVmb3JlUmVuZGVyOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSZW5kZXInXTtcbiAgQElucHV0KCkgYmVmb3JlUmVuZGVyZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVJlbmRlcmVyJ107XG4gIEBJbnB1dCgpIGJlZm9yZVJvd01vdmU6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVJvd01vdmUnXTtcbiAgQElucHV0KCkgYmVmb3JlUm93UmVzaXplOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVSb3dSZXNpemUnXTtcbiAgQElucHV0KCkgYmVmb3JlU2V0Q2VsbE1ldGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVNldENlbGxNZXRhJ107XG4gIEBJbnB1dCgpIGJlZm9yZVNldFJhbmdlRW5kOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVTZXRSYW5nZUVuZCddO1xuICBASW5wdXQoKSBiZWZvcmVTZXRSYW5nZVN0YXJ0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVTZXRSYW5nZVN0YXJ0J107XG4gIEBJbnB1dCgpIGJlZm9yZVNldFJhbmdlU3RhcnRPbmx5OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVTZXRSYW5nZVN0YXJ0T25seSddO1xuICBASW5wdXQoKSBiZWZvcmVTdHJldGNoaW5nQ29sdW1uV2lkdGg6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVN0cmV0Y2hpbmdDb2x1bW5XaWR0aCddO1xuICBASW5wdXQoKSBiZWZvcmVUb3VjaFNjcm9sbDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlVG91Y2hTY3JvbGwnXTtcbiAgQElucHV0KCkgYmVmb3JlVHJpbVJvdzogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlVHJpbVJvdyddO1xuICBASW5wdXQoKSBiZWZvcmVVbmRvOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydiZWZvcmVVbmRvJ107XG4gIEBJbnB1dCgpIGJlZm9yZVVuZG9TdGFja0NoYW5nZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlVW5kb1N0YWNrQ2hhbmdlJ107XG4gIEBJbnB1dCgpIGJlZm9yZVVuaGlkZUNvbHVtbnM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVVuaGlkZUNvbHVtbnMnXTtcbiAgQElucHV0KCkgYmVmb3JlVW5oaWRlUm93czogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlVW5oaWRlUm93cyddO1xuICBASW5wdXQoKSBiZWZvcmVVbm1lcmdlQ2VsbHM6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVVubWVyZ2VDZWxscyddO1xuICBASW5wdXQoKSBiZWZvcmVVbnRyaW1Sb3c6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVVudHJpbVJvdyddO1xuICBASW5wdXQoKSBiZWZvcmVWYWxpZGF0ZTogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snYmVmb3JlVmFsaWRhdGUnXTtcbiAgQElucHV0KCkgYmVmb3JlVmFsdWVSZW5kZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVZhbHVlUmVuZGVyJ107XG4gIEBJbnB1dCgpIGJlZm9yZVZpZXdSZW5kZXI6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ2JlZm9yZVZpZXdSZW5kZXInXTtcbiAgQElucHV0KCkgY29uc3RydWN0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydjb25zdHJ1Y3QnXTtcbiAgQElucHV0KCkgaW5pdDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snaW5pdCddO1xuICBASW5wdXQoKSBtb2RpZnlBdXRvQ29sdW1uU2l6ZVNlZWQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21vZGlmeUF1dG9Db2x1bW5TaXplU2VlZCddO1xuICBASW5wdXQoKSBtb2RpZnlBdXRvZmlsbFJhbmdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlBdXRvZmlsbFJhbmdlJ107XG4gIEBJbnB1dCgpIG1vZGlmeUNvbEhlYWRlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbW9kaWZ5Q29sSGVhZGVyJ107XG4gIEBJbnB1dCgpIG1vZGlmeUNvbHVtbkhlYWRlckhlaWdodDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbW9kaWZ5Q29sdW1uSGVhZGVySGVpZ2h0J107XG4gIEBJbnB1dCgpIG1vZGlmeUNvbFdpZHRoOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlDb2xXaWR0aCddO1xuICBASW5wdXQoKSBtb2RpZnlDb3B5YWJsZVJhbmdlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlDb3B5YWJsZVJhbmdlJ107XG4gIEBJbnB1dCgpIG1vZGlmeURhdGE6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21vZGlmeURhdGEnXTtcbiAgQElucHV0KCkgbW9kaWZ5R2V0Q2VsbENvb3JkczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbW9kaWZ5R2V0Q2VsbENvb3JkcyddO1xuICBASW5wdXQoKSBtb2RpZnlSb3dEYXRhOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlSb3dEYXRhJ107XG4gIEBJbnB1dCgpIG1vZGlmeVJvd0hlYWRlcjogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbW9kaWZ5Um93SGVhZGVyJ107XG4gIEBJbnB1dCgpIG1vZGlmeVJvd0hlYWRlcldpZHRoOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlSb3dIZWFkZXJXaWR0aCddO1xuICBASW5wdXQoKSBtb2RpZnlSb3dIZWlnaHQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3NbJ21vZGlmeVJvd0hlaWdodCddO1xuICBASW5wdXQoKSBtb2RpZnlTb3VyY2VEYXRhOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlTb3VyY2VEYXRhJ107XG4gIEBJbnB1dCgpIG1vZGlmeVRyYW5zZm9ybUVuZDogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5nc1snbW9kaWZ5VHJhbnNmb3JtRW5kJ107XG4gIEBJbnB1dCgpIG1vZGlmeVRyYW5zZm9ybVN0YXJ0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydtb2RpZnlUcmFuc2Zvcm1TdGFydCddO1xuICBASW5wdXQoKSBwZXJzaXN0ZW50U3RhdGVMb2FkOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydwZXJzaXN0ZW50U3RhdGVMb2FkJ107XG4gIEBJbnB1dCgpIHBlcnNpc3RlbnRTdGF0ZVJlc2V0OiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydwZXJzaXN0ZW50U3RhdGVSZXNldCddO1xuICBASW5wdXQoKSBwZXJzaXN0ZW50U3RhdGVTYXZlOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzWydwZXJzaXN0ZW50U3RhdGVTYXZlJ107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfaG90VGFibGVSZWdpc3RlcmVyOiBIb3RUYWJsZVJlZ2lzdGVyZXIsXG4gICAgcHJpdmF0ZSBfaG90U2V0dGluZ3NSZXNvbHZlcjogSG90U2V0dGluZ3NSZXNvbHZlcixcbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2V0IGhvdEluc3RhbmNlKCk6IEhhbmRzb250YWJsZSB8IG51bGwge1xuICAgIGlmICghdGhpcy5fX2hvdEluc3RhbmNlIHx8ICh0aGlzLl9faG90SW5zdGFuY2UgJiYgIXRoaXMuX19ob3RJbnN0YW5jZS5pc0Rlc3Ryb3llZCkpIHtcblxuICAgICAgLy8gV2lsbCByZXR1cm4gdGhlIEhhbmRzb250YWJsZSBpbnN0YW5jZSBvciBgbnVsbGAgaWYgaXQncyBub3QgeWV0IGJlZW4gY3JlYXRlZC5cbiAgICAgIHJldHVybiB0aGlzLl9faG90SW5zdGFuY2U7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faG90VGFibGVSZWdpc3RlcmVyLnJlbW92ZUluc3RhbmNlKHRoaXMuaG90SWQpO1xuXG4gICAgICBjb25zb2xlLndhcm4oSE9UX0RFU1RST1lFRF9XQVJOSU5HKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXQgaG90SW5zdGFuY2UoaG90SW5zdGFuY2UpIHtcbiAgICB0aGlzLl9faG90SW5zdGFuY2UgPSBob3RJbnN0YW5jZTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzID0gdGhpcy5faG90U2V0dGluZ3NSZXNvbHZlci5tZXJnZVNldHRpbmdzKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuY29sdW1uc0NvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuXG4gICAgICB0aGlzLmNvbHVtbnNDb21wb25lbnRzLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLnB1c2godGhpcy5faG90U2V0dGluZ3NSZXNvbHZlci5tZXJnZVNldHRpbmdzKGNvbHVtbikpO1xuICAgICAgfSk7XG5cbiAgICAgIG9wdGlvbnNbJ2NvbHVtbnMnXSA9IGNvbHVtbnM7XG4gICAgfVxuXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuaG90SW5zdGFuY2UgPSBuZXcgSGFuZHNvbnRhYmxlLkNvcmUodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgb3B0aW9ucyk7XG5cbiAgICAgIGlmICh0aGlzLmhvdElkKSB7XG4gICAgICAgIHRoaXMuX2hvdFRhYmxlUmVnaXN0ZXJlci5yZWdpc3Rlckluc3RhbmNlKHRoaXMuaG90SWQsIHRoaXMuaG90SW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5ob3RJbnN0YW5jZS5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaG90SW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdPcHRpb25zOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzID0gdGhpcy5faG90U2V0dGluZ3NSZXNvbHZlci5wcmVwYXJlQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgIHRoaXMudXBkYXRlSG90VGFibGUobmV3T3B0aW9ucyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaG90SW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5ob3RJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5ob3RJZCkge1xuICAgICAgdGhpcy5faG90VGFibGVSZWdpc3RlcmVyLnJlbW92ZUluc3RhbmNlKHRoaXMuaG90SWQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUhvdFRhYmxlKG5ld1NldHRpbmdzOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzICk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ob3RJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmhvdEluc3RhbmNlLnVwZGF0ZVNldHRpbmdzKG5ld1NldHRpbmdzLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkFmdGVyQ29sdW1uc0NoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zQ29tcG9uZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sdW1uc0NvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY29sdW1uczogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzW10gPSBbXTtcblxuICAgICAgdGhpcy5jb2x1bW5zQ29tcG9uZW50cy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgY29sdW1ucy5wdXNoKHRoaXMuX2hvdFNldHRpbmdzUmVzb2x2ZXIubWVyZ2VTZXR0aW5ncyhjb2x1bW4pKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXdPcHRpb25zID0ge1xuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnVwZGF0ZUhvdFRhYmxlKG5ld09wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWZ0ZXJDb2x1bW5zTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHVtbnM6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1tdID0gW107XG5cbiAgICBpZiAodGhpcy5jb2x1bW5zQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNvbHVtbnNDb21wb25lbnRzLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLnB1c2godGhpcy5faG90U2V0dGluZ3NSZXNvbHZlci5tZXJnZVNldHRpbmdzKGNvbHVtbikpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVIb3RUYWJsZSh7IGNvbHVtbnMgfSk7XG4gIH1cblxuICBhZGRDb2x1bW4oY29sdW1uOiBIb3RDb2x1bW5Db21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbnNDb21wb25lbnRzLnB1c2goY29sdW1uKTtcbiAgICB0aGlzLm9uQWZ0ZXJDb2x1bW5zTnVtYmVyQ2hhbmdlKCk7XG4gIH1cblxuICByZW1vdmVDb2x1bW4oY29sdW1uOiBIb3RDb2x1bW5Db21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5jb2x1bW5zQ29tcG9uZW50cy5pbmRleE9mKGNvbHVtbik7XG5cbiAgICB0aGlzLmNvbHVtbnNDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5vbkFmdGVyQ29sdW1uc051bWJlckNoYW5nZSgpO1xuICB9XG5cbn1cbiJdfQ==