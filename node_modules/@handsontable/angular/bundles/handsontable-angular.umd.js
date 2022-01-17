/*!
 * Copyright (c) HANDSONCODE sp. z o. o.
 * 
 * HANDSONTABLE is a software distributed by HANDSONCODE sp. z o. o., a Polish corporation based in
 * Gdynia, Poland, at Aleja Zwycięstwa 96-98, registered by the District Court in Gdansk under number
 * 538651, EU tax ID number: PL5862294002, share capital: PLN 62,800.00.
 * 
 * This software is protected by applicable copyright laws, including international treaties, and dual-
 * licensed – depending on whether your use for commercial purposes, meaning intended for or
 * resulting in commercial advantage or monetary compensation, or not.
 * 
 * If your use is strictly personal or solely for evaluation purposes, meaning for the purposes of testing
 * the suitability, performance, and usefulness of this software outside the production environment,
 * you agree to be bound by the terms included in the "handsontable-non-commercial-license.pdf" file.
 * 
 * Your use of this software for commercial purposes is subject to the terms included in an applicable
 * license agreement.
 * 
 * In any case, you must not make any such use of this software as to develop software which may be
 * considered competitive with this software.
 * 
 * UNLESS EXPRESSLY AGREED OTHERWISE, HANDSONCODE PROVIDES THIS SOFTWARE ON AN &quot;AS IS&quot;
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, AND IN NO EVENT AND UNDER NO
 * LEGAL THEORY, SHALL HANDSONCODE BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY DIRECT,
 * INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER ARISING FROM
 * USE OR INABILITY TO USE THIS SOFTWARE.
 * 
 * Version: 11.0.1 (built at Wed Nov 17 2021 16:08:13 GMT+0100 (Central European Standard Time))
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('handsontable/base')) :
    typeof define === 'function' && define.amd ? define('@handsontable/angular', ['exports', '@angular/core', 'handsontable/base'], factory) :
    (global = global || self, factory((global.Handsontable = global.Handsontable || {}, global.Handsontable.angular = {}), global.ng.core, global.Handsontable));
}(this, (function (exports, core, Handsontable) { 'use strict';

    Handsontable = Handsontable && Object.prototype.hasOwnProperty.call(Handsontable, 'default') ? Handsontable['default'] : Handsontable;

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/hot-table-registerer.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var instances = new Map();
    /** @type {?} */
    var HOT_DESTROYED_WARNING = 'The Handsontable instance bound to this component was destroyed and cannot be' +
        ' used properly.';
    var HotTableRegisterer = /** @class */ (function () {
        function HotTableRegisterer() {
        }
        /**
         * @param {?} id
         * @return {?}
         */
        HotTableRegisterer.prototype.getInstance = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            /** @type {?} */
            var hotInstance = instances.get(id);
            if (hotInstance.isDestroyed) {
                console.warn(HOT_DESTROYED_WARNING);
                return null;
            }
            return hotInstance;
        };
        /**
         * @param {?} id
         * @param {?} instance
         * @return {?}
         */
        HotTableRegisterer.prototype.registerInstance = /**
         * @param {?} id
         * @param {?} instance
         * @return {?}
         */
        function (id, instance) {
            return instances.set(id, instance);
        };
        /**
         * @param {?} id
         * @return {?}
         */
        HotTableRegisterer.prototype.removeInstance = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return instances.delete(id);
        };
        HotTableRegisterer.decorators = [
            { type: core.Injectable }
        ];
        return HotTableRegisterer;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/hot-settings-resolver.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AVAILABLE_OPTIONS = Object.keys(Handsontable.DefaultSettings);
    /** @type {?} */
    var AVAILABLE_HOOKS = Handsontable.hooks.getRegistered();
    var HotSettingsResolver = /** @class */ (function () {
        function HotSettingsResolver() {
        }
        /**
         * @param {?} component
         * @return {?}
         */
        HotSettingsResolver.prototype.mergeSettings = /**
         * @param {?} component
         * @return {?}
         */
        function (component) {
            /** @type {?} */
            var isSettingsObject = typeof component['settings'] === 'object';
            /** @type {?} */
            var mergedSettings = isSettingsObject ? component['settings'] : {};
            /** @type {?} */
            var options = AVAILABLE_HOOKS.concat(AVAILABLE_OPTIONS);
            options.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var isHook = AVAILABLE_HOOKS.indexOf(key) > -1;
                /** @type {?} */
                var option;
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
                    function () {
                        var _this = this;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return component._ngZone.run((/**
                         * @return {?}
                         */
                        function () {
                            return option.apply(_this, args);
                        }));
                    });
                }
                else {
                    mergedSettings[key] = option;
                }
            }));
            return mergedSettings;
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        HotSettingsResolver.prototype.prepareChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var result = {};
            /** @type {?} */
            var parameters = Object.keys(changes);
            parameters.forEach((/**
             * @param {?} param
             * @return {?}
             */
            function (param) {
                if (changes.hasOwnProperty(param)) {
                    result[param] = changes[param].currentValue;
                }
            }));
            return result;
        };
        HotSettingsResolver.decorators = [
            { type: core.Injectable }
        ];
        return HotSettingsResolver;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/hot-table.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: core.Component, args: [{
                        selector: 'hot-table',
                        template: '<div #container [id]="hotId"></div>',
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [HotTableRegisterer, HotSettingsResolver]
                    }] }
        ];
        /** @nocollapse */
        HotTableComponent.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: HotTableRegisterer },
            { type: HotSettingsResolver }
        ]; };
        HotTableComponent.propDecorators = {
            container: [{ type: core.ViewChild, args: ['container', { static: false },] }],
            settings: [{ type: core.Input }],
            hotId: [{ type: core.Input }],
            activeHeaderClassName: [{ type: core.Input }],
            allowEmpty: [{ type: core.Input }],
            allowHtml: [{ type: core.Input }],
            allowInsertColumn: [{ type: core.Input }],
            allowInsertRow: [{ type: core.Input }],
            allowInvalid: [{ type: core.Input }],
            allowRemoveColumn: [{ type: core.Input }],
            allowRemoveRow: [{ type: core.Input }],
            autoColumnSize: [{ type: core.Input }],
            autoRowSize: [{ type: core.Input }],
            autoWrapCol: [{ type: core.Input }],
            autoWrapRow: [{ type: core.Input }],
            bindRowsWithHeaders: [{ type: core.Input }],
            cell: [{ type: core.Input }],
            cells: [{ type: core.Input }],
            checkedTemplate: [{ type: core.Input }],
            className: [{ type: core.Input }],
            colHeaders: [{ type: core.Input }],
            collapsibleColumns: [{ type: core.Input }],
            columnHeaderHeight: [{ type: core.Input }],
            columns: [{ type: core.Input }],
            columnSorting: [{ type: core.Input }],
            columnSummary: [{ type: core.Input }],
            colWidths: [{ type: core.Input }],
            commentedCellClassName: [{ type: core.Input }],
            comments: [{ type: core.Input }],
            contextMenu: [{ type: core.Input }],
            copyable: [{ type: core.Input }],
            copyPaste: [{ type: core.Input }],
            correctFormat: [{ type: core.Input }],
            currentColClassName: [{ type: core.Input }],
            currentHeaderClassName: [{ type: core.Input }],
            currentRowClassName: [{ type: core.Input }],
            customBorders: [{ type: core.Input }],
            data: [{ type: core.Input }],
            dataSchema: [{ type: core.Input }],
            dateFormat: [{ type: core.Input }],
            defaultDate: [{ type: core.Input }],
            disableVisualSelection: [{ type: core.Input }],
            dragToScroll: [{ type: core.Input }],
            dropdownMenu: [{ type: core.Input }],
            editor: [{ type: core.Input }],
            enterBeginsEditing: [{ type: core.Input }],
            enterMoves: [{ type: core.Input }],
            fillHandle: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            filteringCaseSensitive: [{ type: core.Input }],
            filters: [{ type: core.Input }],
            fixedColumnsLeft: [{ type: core.Input }],
            fixedRowsBottom: [{ type: core.Input }],
            fixedRowsTop: [{ type: core.Input }],
            formulas: [{ type: core.Input }],
            fragmentSelection: [{ type: core.Input }],
            height: [{ type: core.Input }],
            hiddenColumns: [{ type: core.Input }],
            hiddenRows: [{ type: core.Input }],
            invalidCellClassName: [{ type: core.Input }],
            label: [{ type: core.Input }],
            language: [{ type: core.Input }],
            licenseKey: [{ type: core.Input }],
            manualColumnFreeze: [{ type: core.Input }],
            manualColumnMove: [{ type: core.Input }],
            manualColumnResize: [{ type: core.Input }],
            manualRowMove: [{ type: core.Input }],
            manualRowResize: [{ type: core.Input }],
            maxCols: [{ type: core.Input }],
            maxRows: [{ type: core.Input }],
            mergeCells: [{ type: core.Input }],
            minCols: [{ type: core.Input }],
            minRows: [{ type: core.Input }],
            minSpareCols: [{ type: core.Input }],
            minSpareRows: [{ type: core.Input }],
            multiColumnSorting: [{ type: core.Input }],
            nestedHeaders: [{ type: core.Input }],
            nestedRows: [{ type: core.Input }],
            noWordWrapClassName: [{ type: core.Input }],
            numericFormat: [{ type: core.Input }],
            observeDOMVisibility: [{ type: core.Input }],
            outsideClickDeselects: [{ type: core.Input }],
            persistentState: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            placeholderCellClassName: [{ type: core.Input }],
            preventOverflow: [{ type: core.Input }],
            preventWheel: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            readOnlyCellClassName: [{ type: core.Input }],
            renderAllRows: [{ type: core.Input }],
            renderer: [{ type: core.Input }],
            rowHeaders: [{ type: core.Input }],
            rowHeaderWidth: [{ type: core.Input }],
            rowHeights: [{ type: core.Input }],
            search: [{ type: core.Input }],
            selectionMode: [{ type: core.Input }],
            selectOptions: [{ type: core.Input }],
            skipColumnOnPaste: [{ type: core.Input }],
            skipRowOnPaste: [{ type: core.Input }],
            sortByRelevance: [{ type: core.Input }],
            source: [{ type: core.Input }],
            startCols: [{ type: core.Input }],
            startRows: [{ type: core.Input }],
            stretchH: [{ type: core.Input }],
            strict: [{ type: core.Input }],
            tableClassName: [{ type: core.Input }],
            tabMoves: [{ type: core.Input }],
            title: [{ type: core.Input }],
            trimDropdown: [{ type: core.Input }],
            trimRows: [{ type: core.Input }],
            trimWhitespace: [{ type: core.Input }],
            type: [{ type: core.Input }],
            uncheckedTemplate: [{ type: core.Input }],
            undo: [{ type: core.Input }],
            validator: [{ type: core.Input }],
            viewportColumnRenderingOffset: [{ type: core.Input }],
            viewportRowRenderingOffset: [{ type: core.Input }],
            visibleRows: [{ type: core.Input }],
            width: [{ type: core.Input }],
            wordWrap: [{ type: core.Input }],
            afterAddChild: [{ type: core.Input }],
            afterAutofill: [{ type: core.Input }],
            afterBeginEditing: [{ type: core.Input }],
            afterCellMetaReset: [{ type: core.Input }],
            afterChange: [{ type: core.Input }],
            afterChangesObserved: [{ type: core.Input }],
            afterColumnCollapse: [{ type: core.Input }],
            afterColumnExpand: [{ type: core.Input }],
            afterColumnMove: [{ type: core.Input }],
            afterColumnResize: [{ type: core.Input }],
            afterColumnSort: [{ type: core.Input }],
            afterContextMenuDefaultOptions: [{ type: core.Input }],
            afterContextMenuHide: [{ type: core.Input }],
            afterContextMenuShow: [{ type: core.Input }],
            afterCopy: [{ type: core.Input }],
            afterCopyLimit: [{ type: core.Input }],
            afterCreateCol: [{ type: core.Input }],
            afterCreateRow: [{ type: core.Input }],
            afterCut: [{ type: core.Input }],
            afterDeselect: [{ type: core.Input }],
            afterDestroy: [{ type: core.Input }],
            afterDetachChild: [{ type: core.Input }],
            afterDocumentKeyDown: [{ type: core.Input }],
            afterDrawSelection: [{ type: core.Input }],
            afterDropdownMenuDefaultOptions: [{ type: core.Input }],
            afterDropdownMenuHide: [{ type: core.Input }],
            afterDropdownMenuShow: [{ type: core.Input }],
            afterFilter: [{ type: core.Input }],
            afterGetCellMeta: [{ type: core.Input }],
            afterGetColHeader: [{ type: core.Input }],
            afterGetColumnHeaderRenderers: [{ type: core.Input }],
            afterGetRowHeader: [{ type: core.Input }],
            afterGetRowHeaderRenderers: [{ type: core.Input }],
            afterHideColumns: [{ type: core.Input }],
            afterHideRows: [{ type: core.Input }],
            afterInit: [{ type: core.Input }],
            afterLanguageChange: [{ type: core.Input }],
            afterListen: [{ type: core.Input }],
            afterLoadData: [{ type: core.Input }],
            afterMergeCells: [{ type: core.Input }],
            afterModifyTransformEnd: [{ type: core.Input }],
            afterModifyTransformStart: [{ type: core.Input }],
            afterMomentumScroll: [{ type: core.Input }],
            afterOnCellContextMenu: [{ type: core.Input }],
            afterOnCellCornerDblClick: [{ type: core.Input }],
            afterOnCellCornerMouseDown: [{ type: core.Input }],
            afterOnCellMouseDown: [{ type: core.Input }],
            afterOnCellMouseOut: [{ type: core.Input }],
            afterOnCellMouseOver: [{ type: core.Input }],
            afterOnCellMouseUp: [{ type: core.Input }],
            afterPaste: [{ type: core.Input }],
            afterPluginsInitialized: [{ type: core.Input }],
            afterRedo: [{ type: core.Input }],
            afterRedoStackChange: [{ type: core.Input }],
            afterRefreshDimensions: [{ type: core.Input }],
            afterRemoveCellMeta: [{ type: core.Input }],
            afterRemoveCol: [{ type: core.Input }],
            afterRemoveRow: [{ type: core.Input }],
            afterRender: [{ type: core.Input }],
            afterRenderer: [{ type: core.Input }],
            afterRowMove: [{ type: core.Input }],
            afterRowResize: [{ type: core.Input }],
            afterScrollHorizontally: [{ type: core.Input }],
            afterScrollVertically: [{ type: core.Input }],
            afterSelection: [{ type: core.Input }],
            afterSelectionByProp: [{ type: core.Input }],
            afterSelectionEnd: [{ type: core.Input }],
            afterSelectionEndByProp: [{ type: core.Input }],
            afterSetCellMeta: [{ type: core.Input }],
            afterSetDataAtCell: [{ type: core.Input }],
            afterSetDataAtRowProp: [{ type: core.Input }],
            afterSetSourceDataAtCell: [{ type: core.Input }],
            afterTrimRow: [{ type: core.Input }],
            afterUndo: [{ type: core.Input }],
            afterUndoStackChange: [{ type: core.Input }],
            afterUnhideColumns: [{ type: core.Input }],
            afterUnhideRows: [{ type: core.Input }],
            afterUnlisten: [{ type: core.Input }],
            afterUnmergeCells: [{ type: core.Input }],
            afterUntrimRow: [{ type: core.Input }],
            afterUpdateSettings: [{ type: core.Input }],
            afterValidate: [{ type: core.Input }],
            afterViewportColumnCalculatorOverride: [{ type: core.Input }],
            afterViewportRowCalculatorOverride: [{ type: core.Input }],
            afterViewRender: [{ type: core.Input }],
            beforeAddChild: [{ type: core.Input }],
            beforeAutofill: [{ type: core.Input }],
            beforeAutofillInsidePopulate: [{ type: core.Input }],
            beforeCellAlignment: [{ type: core.Input }],
            beforeChange: [{ type: core.Input }],
            beforeChangeRender: [{ type: core.Input }],
            beforeColumnCollapse: [{ type: core.Input }],
            beforeColumnExpand: [{ type: core.Input }],
            beforeColumnMove: [{ type: core.Input }],
            beforeColumnResize: [{ type: core.Input }],
            beforeColumnSort: [{ type: core.Input }],
            beforeContextMenuSetItems: [{ type: core.Input }],
            beforeContextMenuShow: [{ type: core.Input }],
            beforeCopy: [{ type: core.Input }],
            beforeCreateCol: [{ type: core.Input }],
            beforeCreateRow: [{ type: core.Input }],
            beforeCut: [{ type: core.Input }],
            beforeDetachChild: [{ type: core.Input }],
            beforeDrawBorders: [{ type: core.Input }],
            beforeDropdownMenuSetItems: [{ type: core.Input }],
            beforeDropdownMenuShow: [{ type: core.Input }],
            beforeFilter: [{ type: core.Input }],
            beforeGetCellMeta: [{ type: core.Input }],
            beforeHideColumns: [{ type: core.Input }],
            beforeHideRows: [{ type: core.Input }],
            beforeInit: [{ type: core.Input }],
            beforeInitWalkontable: [{ type: core.Input }],
            beforeKeyDown: [{ type: core.Input }],
            beforeLanguageChange: [{ type: core.Input }],
            beforeLoadData: [{ type: core.Input }],
            beforeMergeCells: [{ type: core.Input }],
            beforeOnCellContextMenu: [{ type: core.Input }],
            beforeOnCellMouseDown: [{ type: core.Input }],
            beforeOnCellMouseOut: [{ type: core.Input }],
            beforeOnCellMouseOver: [{ type: core.Input }],
            beforeOnCellMouseUp: [{ type: core.Input }],
            beforePaste: [{ type: core.Input }],
            beforeRedo: [{ type: core.Input }],
            beforeRedoStackChange: [{ type: core.Input }],
            beforeRefreshDimensions: [{ type: core.Input }],
            beforeRemoveCellClassNames: [{ type: core.Input }],
            beforeRemoveCellMeta: [{ type: core.Input }],
            beforeRemoveCol: [{ type: core.Input }],
            beforeRemoveRow: [{ type: core.Input }],
            beforeRender: [{ type: core.Input }],
            beforeRenderer: [{ type: core.Input }],
            beforeRowMove: [{ type: core.Input }],
            beforeRowResize: [{ type: core.Input }],
            beforeSetCellMeta: [{ type: core.Input }],
            beforeSetRangeEnd: [{ type: core.Input }],
            beforeSetRangeStart: [{ type: core.Input }],
            beforeSetRangeStartOnly: [{ type: core.Input }],
            beforeStretchingColumnWidth: [{ type: core.Input }],
            beforeTouchScroll: [{ type: core.Input }],
            beforeTrimRow: [{ type: core.Input }],
            beforeUndo: [{ type: core.Input }],
            beforeUndoStackChange: [{ type: core.Input }],
            beforeUnhideColumns: [{ type: core.Input }],
            beforeUnhideRows: [{ type: core.Input }],
            beforeUnmergeCells: [{ type: core.Input }],
            beforeUntrimRow: [{ type: core.Input }],
            beforeValidate: [{ type: core.Input }],
            beforeValueRender: [{ type: core.Input }],
            beforeViewRender: [{ type: core.Input }],
            construct: [{ type: core.Input }],
            init: [{ type: core.Input }],
            modifyAutoColumnSizeSeed: [{ type: core.Input }],
            modifyAutofillRange: [{ type: core.Input }],
            modifyColHeader: [{ type: core.Input }],
            modifyColumnHeaderHeight: [{ type: core.Input }],
            modifyColWidth: [{ type: core.Input }],
            modifyCopyableRange: [{ type: core.Input }],
            modifyData: [{ type: core.Input }],
            modifyGetCellCoords: [{ type: core.Input }],
            modifyRowData: [{ type: core.Input }],
            modifyRowHeader: [{ type: core.Input }],
            modifyRowHeaderWidth: [{ type: core.Input }],
            modifyRowHeight: [{ type: core.Input }],
            modifySourceData: [{ type: core.Input }],
            modifyTransformEnd: [{ type: core.Input }],
            modifyTransformStart: [{ type: core.Input }],
            persistentStateLoad: [{ type: core.Input }],
            persistentStateReset: [{ type: core.Input }],
            persistentStateSave: [{ type: core.Input }]
        };
        return HotTableComponent;
    }());
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
    var HotColumnComponent = /** @class */ (function () {
        function HotColumnComponent(parentComponent) {
            this.parentComponent = parentComponent;
            this.firstRun = true;
        }
        /**
         * @return {?}
         */
        HotColumnComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.firstRun = false;
            this.parentComponent.addColumn(this);
        };
        /**
         * @return {?}
         */
        HotColumnComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            if (this.firstRun) {
                return;
            }
            this.parentComponent.onAfterColumnsChange();
        };
        /**
         * @return {?}
         */
        HotColumnComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.parentComponent.removeColumn(this);
        };
        HotColumnComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'hot-column',
                        template: ''
                    }] }
        ];
        /** @nocollapse */
        HotColumnComponent.ctorParameters = function () { return [
            { type: HotTableComponent }
        ]; };
        HotColumnComponent.propDecorators = {
            allowEmpty: [{ type: core.Input }],
            allowHtml: [{ type: core.Input }],
            allowInvalid: [{ type: core.Input }],
            checkedTemplate: [{ type: core.Input }],
            className: [{ type: core.Input }],
            columnSorting: [{ type: core.Input }],
            colWidths: [{ type: core.Input }],
            commentedCellClassName: [{ type: core.Input }],
            copyable: [{ type: core.Input }],
            correctFormat: [{ type: core.Input }],
            data: [{ type: core.Input }],
            dateFormat: [{ type: core.Input }],
            defaultDate: [{ type: core.Input }],
            editor: [{ type: core.Input }],
            filteringCaseSensitive: [{ type: core.Input }],
            invalidCellClassName: [{ type: core.Input }],
            label: [{ type: core.Input }],
            language: [{ type: core.Input }],
            noWordWrapClassName: [{ type: core.Input }],
            numericFormat: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            placeholderCellClassName: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            readOnlyCellClassName: [{ type: core.Input }],
            renderer: [{ type: core.Input }],
            selectOptions: [{ type: core.Input }],
            skipColumnOnPaste: [{ type: core.Input }],
            sortByRelevance: [{ type: core.Input }],
            source: [{ type: core.Input }],
            strict: [{ type: core.Input }],
            title: [{ type: core.Input }],
            trimDropdown: [{ type: core.Input }],
            type: [{ type: core.Input }],
            uncheckedTemplate: [{ type: core.Input }],
            validator: [{ type: core.Input }],
            visibleRows: [{ type: core.Input }],
            width: [{ type: core.Input }],
            wordWrap: [{ type: core.Input }]
        };
        return HotColumnComponent;
    }());
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
    var HotTableModule = /** @class */ (function () {
        function HotTableModule() {
        }
        /**
         * @return {?}
         */
        HotTableModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: HotTableModule,
                providers: [HotTableRegisterer],
            };
        };
        HotTableModule.version = '11.0.1';
        HotTableModule.decorators = [
            { type: core.NgModule, args: [{
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
        return HotTableModule;
    }());
    if (false) {
        /** @type {?} */
        HotTableModule.version;
    }

    exports.HOT_DESTROYED_WARNING = HOT_DESTROYED_WARNING;
    exports.HotColumnComponent = HotColumnComponent;
    exports.HotSettingsResolver = HotSettingsResolver;
    exports.HotTableComponent = HotTableComponent;
    exports.HotTableModule = HotTableModule;
    exports.HotTableRegisterer = HotTableRegisterer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=handsontable-angular.umd.js.map
