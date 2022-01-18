import { Injectable, Component, ViewEncapsulation, NgZone, ViewChild, Input, NgModule } from '@angular/core';
import Handsontable from 'handsontable/base';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table-registerer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const instances = new Map();
/** @type {?} */
const HOT_DESTROYED_WARNING = 'The Handsontable instance bound to this component was destroyed and cannot be' +
    ' used properly.';
class HotTableRegisterer {
    /**
     * @param {?} id
     * @return {?}
     */
    getInstance(id) {
        /** @type {?} */
        const hotInstance = instances.get(id);
        if (hotInstance.isDestroyed) {
            console.warn(HOT_DESTROYED_WARNING);
            return null;
        }
        return hotInstance;
    }
    /**
     * @param {?} id
     * @param {?} instance
     * @return {?}
     */
    registerInstance(id, instance) {
        return instances.set(id, instance);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeInstance(id) {
        return instances.delete(id);
    }
}
HotTableRegisterer.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-settings-resolver.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AVAILABLE_OPTIONS = Object.keys(Handsontable.DefaultSettings);
/** @type {?} */
const AVAILABLE_HOOKS = Handsontable.hooks.getRegistered();
class HotSettingsResolver {
    /**
     * @param {?} component
     * @return {?}
     */
    mergeSettings(component) {
        /** @type {?} */
        const isSettingsObject = typeof component['settings'] === 'object';
        /** @type {?} */
        const mergedSettings = isSettingsObject ? component['settings'] : {};
        /** @type {?} */
        const options = AVAILABLE_HOOKS.concat(AVAILABLE_OPTIONS);
        options.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            /** @type {?} */
            const isHook = AVAILABLE_HOOKS.indexOf(key) > -1;
            /** @type {?} */
            let option;
            if (isSettingsObject && isHook) {
                option = component['settings'][key];
            }
            if (component[key] !== void 0) {
                option = component[key];
            }
            if (option === void 0) {
                return;
            }
            else if (typeof option === 'function' && isHook) {
                mergedSettings[key] = (/**
                 * @param {...?} args
                 * @return {?}
                 */
                function (...args) {
                    return component._ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        return option.apply(this, args);
                    }));
                });
            }
            else {
                mergedSettings[key] = option;
            }
        }));
        return mergedSettings;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    prepareChanges(changes) {
        /** @type {?} */
        const result = {};
        /** @type {?} */
        const parameters = Object.keys(changes);
        parameters.forEach((/**
         * @param {?} param
         * @return {?}
         */
        (param) => {
            if (changes.hasOwnProperty(param)) {
                result[param] = changes[param].currentValue;
            }
        }));
        return result;
    }
}
HotSettingsResolver.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HotTableComponent {
    /**
     * @param {?} _ngZone
     * @param {?} _hotTableRegisterer
     * @param {?} _hotSettingsResolver
     */
    constructor(_ngZone, _hotTableRegisterer, _hotSettingsResolver) {
        this._ngZone = _ngZone;
        this._hotTableRegisterer = _hotTableRegisterer;
        this._hotSettingsResolver = _hotSettingsResolver;
        this.__hotInstance = null;
        this.columnsComponents = [];
        this.hotId = '';
    }
    /**
     * @private
     * @return {?}
     */
    get hotInstance() {
        if (!this.__hotInstance || (this.__hotInstance && !this.__hotInstance.isDestroyed)) {
            // Will return the Handsontable instance or `null` if it's not yet been created.
            return this.__hotInstance;
        }
        else {
            this._hotTableRegisterer.removeInstance(this.hotId);
            console.warn(HOT_DESTROYED_WARNING);
            return null;
        }
    }
    /**
     * @private
     * @param {?} hotInstance
     * @return {?}
     */
    set hotInstance(hotInstance) {
        this.__hotInstance = hotInstance;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const options = this._hotSettingsResolver.mergeSettings(this);
        if (this.columnsComponents.length > 0) {
            /** @type {?} */
            const columns = [];
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            (column) => {
                columns.push(this._hotSettingsResolver.mergeSettings(column));
            }));
            options['columns'] = columns;
        }
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.hotInstance = new Handsontable.Core(this.container.nativeElement, options);
            if (this.hotId) {
                this._hotTableRegisterer.registerInstance(this.hotId, this.hotInstance);
            }
            // @ts-ignore
            this.hotInstance.init();
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.hotInstance === null) {
            return;
        }
        /** @type {?} */
        const newOptions = this._hotSettingsResolver.prepareChanges(changes);
        this.updateHotTable(newOptions);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            if (this.hotInstance) {
                this.hotInstance.destroy();
            }
        }));
        if (this.hotId) {
            this._hotTableRegisterer.removeInstance(this.hotId);
        }
    }
    /**
     * @param {?} newSettings
     * @return {?}
     */
    updateHotTable(newSettings) {
        if (!this.hotInstance) {
            return;
        }
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.hotInstance.updateSettings(newSettings, false);
        }));
    }
    /**
     * @return {?}
     */
    onAfterColumnsChange() {
        if (this.columnsComponents === void 0) {
            return;
        }
        if (this.columnsComponents.length > 0) {
            /** @type {?} */
            const columns = [];
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            (column) => {
                columns.push(this._hotSettingsResolver.mergeSettings(column));
            }));
            /** @type {?} */
            const newOptions = {
                columns: columns
            };
            this.updateHotTable(newOptions);
        }
    }
    /**
     * @return {?}
     */
    onAfterColumnsNumberChange() {
        /** @type {?} */
        const columns = [];
        if (this.columnsComponents.length > 0) {
            this.columnsComponents.forEach((/**
             * @param {?} column
             * @return {?}
             */
            (column) => {
                columns.push(this._hotSettingsResolver.mergeSettings(column));
            }));
        }
        this.updateHotTable({ columns });
    }
    /**
     * @param {?} column
     * @return {?}
     */
    addColumn(column) {
        this.columnsComponents.push(column);
        this.onAfterColumnsNumberChange();
    }
    /**
     * @param {?} column
     * @return {?}
     */
    removeColumn(column) {
        /** @type {?} */
        const index = this.columnsComponents.indexOf(column);
        this.columnsComponents.splice(index, 1);
        this.onAfterColumnsNumberChange();
    }
}
HotTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-table',
                template: '<div #container [id]="hotId"></div>',
                encapsulation: ViewEncapsulation.None,
                providers: [HotTableRegisterer, HotSettingsResolver]
            }] }
];
/** @nocollapse */
HotTableComponent.ctorParameters = () => [
    { type: NgZone },
    { type: HotTableRegisterer },
    { type: HotSettingsResolver }
];
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-column.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HotColumnComponent {
    /**
     * @param {?} parentComponent
     */
    constructor(parentComponent) {
        this.parentComponent = parentComponent;
        this.firstRun = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.firstRun = false;
        this.parentComponent.addColumn(this);
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.firstRun) {
            return;
        }
        this.parentComponent.onAfterColumnsChange();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.parentComponent.removeColumn(this);
    }
}
HotColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'hot-column',
                template: ''
            }] }
];
/** @nocollapse */
HotColumnComponent.ctorParameters = () => [
    { type: HotTableComponent }
];
HotColumnComponent.propDecorators = {
    allowEmpty: [{ type: Input }],
    allowHtml: [{ type: Input }],
    allowInvalid: [{ type: Input }],
    checkedTemplate: [{ type: Input }],
    className: [{ type: Input }],
    columnSorting: [{ type: Input }],
    colWidths: [{ type: Input }],
    commentedCellClassName: [{ type: Input }],
    copyable: [{ type: Input }],
    correctFormat: [{ type: Input }],
    data: [{ type: Input }],
    dateFormat: [{ type: Input }],
    defaultDate: [{ type: Input }],
    editor: [{ type: Input }],
    filteringCaseSensitive: [{ type: Input }],
    invalidCellClassName: [{ type: Input }],
    label: [{ type: Input }],
    language: [{ type: Input }],
    noWordWrapClassName: [{ type: Input }],
    numericFormat: [{ type: Input }],
    placeholder: [{ type: Input }],
    placeholderCellClassName: [{ type: Input }],
    readOnly: [{ type: Input }],
    readOnlyCellClassName: [{ type: Input }],
    renderer: [{ type: Input }],
    selectOptions: [{ type: Input }],
    skipColumnOnPaste: [{ type: Input }],
    sortByRelevance: [{ type: Input }],
    source: [{ type: Input }],
    strict: [{ type: Input }],
    title: [{ type: Input }],
    trimDropdown: [{ type: Input }],
    type: [{ type: Input }],
    uncheckedTemplate: [{ type: Input }],
    validator: [{ type: Input }],
    visibleRows: [{ type: Input }],
    width: [{ type: Input }],
    wordWrap: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    HotColumnComponent.prototype.firstRun;
    /** @type {?} */
    HotColumnComponent.prototype.allowEmpty;
    /** @type {?} */
    HotColumnComponent.prototype.allowHtml;
    /** @type {?} */
    HotColumnComponent.prototype.allowInvalid;
    /** @type {?} */
    HotColumnComponent.prototype.checkedTemplate;
    /** @type {?} */
    HotColumnComponent.prototype.className;
    /** @type {?} */
    HotColumnComponent.prototype.columnSorting;
    /** @type {?} */
    HotColumnComponent.prototype.colWidths;
    /** @type {?} */
    HotColumnComponent.prototype.commentedCellClassName;
    /** @type {?} */
    HotColumnComponent.prototype.copyable;
    /** @type {?} */
    HotColumnComponent.prototype.correctFormat;
    /** @type {?} */
    HotColumnComponent.prototype.data;
    /** @type {?} */
    HotColumnComponent.prototype.dateFormat;
    /** @type {?} */
    HotColumnComponent.prototype.defaultDate;
    /** @type {?} */
    HotColumnComponent.prototype.editor;
    /** @type {?} */
    HotColumnComponent.prototype.filteringCaseSensitive;
    /** @type {?} */
    HotColumnComponent.prototype.invalidCellClassName;
    /** @type {?} */
    HotColumnComponent.prototype.label;
    /** @type {?} */
    HotColumnComponent.prototype.language;
    /** @type {?} */
    HotColumnComponent.prototype.noWordWrapClassName;
    /** @type {?} */
    HotColumnComponent.prototype.numericFormat;
    /** @type {?} */
    HotColumnComponent.prototype.placeholder;
    /** @type {?} */
    HotColumnComponent.prototype.placeholderCellClassName;
    /** @type {?} */
    HotColumnComponent.prototype.readOnly;
    /** @type {?} */
    HotColumnComponent.prototype.readOnlyCellClassName;
    /** @type {?} */
    HotColumnComponent.prototype.renderer;
    /** @type {?} */
    HotColumnComponent.prototype.selectOptions;
    /** @type {?} */
    HotColumnComponent.prototype.skipColumnOnPaste;
    /** @type {?} */
    HotColumnComponent.prototype.sortByRelevance;
    /** @type {?} */
    HotColumnComponent.prototype.source;
    /** @type {?} */
    HotColumnComponent.prototype.strict;
    /** @type {?} */
    HotColumnComponent.prototype.title;
    /** @type {?} */
    HotColumnComponent.prototype.trimDropdown;
    /** @type {?} */
    HotColumnComponent.prototype.type;
    /** @type {?} */
    HotColumnComponent.prototype.uncheckedTemplate;
    /** @type {?} */
    HotColumnComponent.prototype.validator;
    /** @type {?} */
    HotColumnComponent.prototype.visibleRows;
    /** @type {?} */
    HotColumnComponent.prototype.width;
    /** @type {?} */
    HotColumnComponent.prototype.wordWrap;
    /**
     * @type {?}
     * @private
     */
    HotColumnComponent.prototype.parentComponent;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HotTableModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: HotTableModule,
            providers: [HotTableRegisterer],
        };
    }
}
HotTableModule.version = '11.0.1';
HotTableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HotTableComponent,
                    HotColumnComponent,
                ],
                exports: [
                    HotTableComponent,
                    HotColumnComponent,
                ]
            },] }
];
if (false) {
    /** @type {?} */
    HotTableModule.version;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: handsontable-angular.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { HOT_DESTROYED_WARNING, HotColumnComponent, HotSettingsResolver, HotTableComponent, HotTableModule, HotTableRegisterer };
//# sourceMappingURL=handsontable-angular.js.map
