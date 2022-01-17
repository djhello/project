/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-column.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from '@angular/core';
import { HotTableComponent } from './hot-table.component';
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
        { type: Component, args: [{
                    selector: 'hot-column',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    HotColumnComponent.ctorParameters = function () { return [
        { type: HotTableComponent }
    ]; };
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
    return HotColumnComponent;
}());
export { HotColumnComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGFuZHNvbnRhYmxlL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvaG90LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcxRDtJQThDRSw0QkFBb0IsZUFBa0M7UUFBbEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBekM5QyxhQUFRLEdBQUcsSUFBSSxDQUFDO0lBeUNpQyxDQUFDOzs7O0lBRTFELHFDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDOztnQkEvREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsRUFBRTtpQkFDYjs7OztnQkFOUSxpQkFBaUI7Ozs2QkFVdkIsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzs0QkFDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSzt5Q0FDTCxLQUFLOzJCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lDQUNMLEtBQUs7dUNBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7c0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7MkNBQ0wsS0FBSzsyQkFDTCxLQUFLO3dDQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLO29DQUNMLEtBQUs7a0NBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxLQUFLO3VCQUNMLEtBQUs7b0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQW9CUix5QkFBQztDQUFBLEFBaEVELElBZ0VDO1NBNURZLGtCQUFrQjs7Ozs7O0lBQzdCLHNDQUF3Qjs7SUFFeEIsd0NBQStEOztJQUMvRCx1Q0FBNkQ7O0lBQzdELDBDQUFtRTs7SUFDbkUsNkNBQXlFOztJQUN6RSx1Q0FBNkQ7O0lBQzdELDJDQUFxRTs7SUFDckUsdUNBQTZEOztJQUM3RCxvREFBdUY7O0lBQ3ZGLHNDQUEyRDs7SUFDM0QsMkNBQXFFOztJQUNyRSxrQ0FBbUQ7O0lBQ25ELHdDQUErRDs7SUFDL0QseUNBQWlFOztJQUNqRSxvQ0FBdUQ7O0lBQ3ZELG9EQUF1Rjs7SUFDdkYsa0RBQW1GOztJQUNuRixtQ0FBcUQ7O0lBQ3JELHNDQUEyRDs7SUFDM0QsaURBQWlGOztJQUNqRiwyQ0FBcUU7O0lBQ3JFLHlDQUFpRTs7SUFDakUsc0RBQTJGOztJQUMzRixzQ0FBMkQ7O0lBQzNELG1EQUFxRjs7SUFDckYsc0NBQTJEOztJQUMzRCwyQ0FBcUU7O0lBQ3JFLCtDQUE2RTs7SUFDN0UsNkNBQXlFOztJQUN6RSxvQ0FBdUQ7O0lBQ3ZELG9DQUF1RDs7SUFDdkQsbUNBQXFEOztJQUNyRCwwQ0FBbUU7O0lBQ25FLGtDQUFtRDs7SUFDbkQsK0NBQTZFOztJQUM3RSx1Q0FBNkQ7O0lBQzdELHlDQUFpRTs7SUFDakUsbUNBQXFEOztJQUNyRCxzQ0FBMkQ7Ozs7O0lBRS9DLDZDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG90VGFibGVDb21wb25lbnQgfSBmcm9tICcuL2hvdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhhbmRzb250YWJsZSBmcm9tICdoYW5kc29udGFibGUvYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hvdC1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIEhvdENvbHVtbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGZpcnN0UnVuID0gdHJ1ZTtcbiAgLy8gaGFuZHNvbnRhYmxlIGNvbHVtbiBvcHRpb25zXG4gIEBJbnB1dCgpIGFsbG93RW1wdHk6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snYWxsb3dFbXB0eSddO1xuICBASW5wdXQoKSBhbGxvd0h0bWw6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snYWxsb3dIdG1sJ107XG4gIEBJbnB1dCgpIGFsbG93SW52YWxpZDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydhbGxvd0ludmFsaWQnXTtcbiAgQElucHV0KCkgY2hlY2tlZFRlbXBsYXRlOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ2NoZWNrZWRUZW1wbGF0ZSddO1xuICBASW5wdXQoKSBjbGFzc05hbWU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snY2xhc3NOYW1lJ107XG4gIEBJbnB1dCgpIGNvbHVtblNvcnRpbmc6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snY29sdW1uU29ydGluZyddO1xuICBASW5wdXQoKSBjb2xXaWR0aHM6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snY29sV2lkdGhzJ107XG4gIEBJbnB1dCgpIGNvbW1lbnRlZENlbGxDbGFzc05hbWU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snY29tbWVudGVkQ2VsbENsYXNzTmFtZSddO1xuICBASW5wdXQoKSBjb3B5YWJsZTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydjb3B5YWJsZSddO1xuICBASW5wdXQoKSBjb3JyZWN0Rm9ybWF0OiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ2NvcnJlY3RGb3JtYXQnXTtcbiAgQElucHV0KCkgZGF0YTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydkYXRhJ107XG4gIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snZGF0ZUZvcm1hdCddO1xuICBASW5wdXQoKSBkZWZhdWx0RGF0ZTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydkZWZhdWx0RGF0ZSddO1xuICBASW5wdXQoKSBlZGl0b3I6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snZWRpdG9yJ107XG4gIEBJbnB1dCgpIGZpbHRlcmluZ0Nhc2VTZW5zaXRpdmU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snZmlsdGVyaW5nQ2FzZVNlbnNpdGl2ZSddO1xuICBASW5wdXQoKSBpbnZhbGlkQ2VsbENsYXNzTmFtZTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydpbnZhbGlkQ2VsbENsYXNzTmFtZSddO1xuICBASW5wdXQoKSBsYWJlbDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydsYWJlbCddO1xuICBASW5wdXQoKSBsYW5ndWFnZTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydsYW5ndWFnZSddO1xuICBASW5wdXQoKSBub1dvcmRXcmFwQ2xhc3NOYW1lOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ25vV29yZFdyYXBDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgbnVtZXJpY0Zvcm1hdDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydudW1lcmljRm9ybWF0J107XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3BsYWNlaG9sZGVyJ107XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyQ2VsbENsYXNzTmFtZTogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydwbGFjZWhvbGRlckNlbGxDbGFzc05hbWUnXTtcbiAgQElucHV0KCkgcmVhZE9ubHk6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1sncmVhZE9ubHknXTtcbiAgQElucHV0KCkgcmVhZE9ubHlDZWxsQ2xhc3NOYW1lOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3JlYWRPbmx5Q2VsbENsYXNzTmFtZSddO1xuICBASW5wdXQoKSByZW5kZXJlcjogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydyZW5kZXJlciddO1xuICBASW5wdXQoKSBzZWxlY3RPcHRpb25zOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3NlbGVjdE9wdGlvbnMnXTtcbiAgQElucHV0KCkgc2tpcENvbHVtbk9uUGFzdGU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snc2tpcENvbHVtbk9uUGFzdGUnXTtcbiAgQElucHV0KCkgc29ydEJ5UmVsZXZhbmNlOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3NvcnRCeVJlbGV2YW5jZSddO1xuICBASW5wdXQoKSBzb3VyY2U6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1snc291cmNlJ107XG4gIEBJbnB1dCgpIHN0cmljdDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWydzdHJpY3QnXTtcbiAgQElucHV0KCkgdGl0bGU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1sndGl0bGUnXTtcbiAgQElucHV0KCkgdHJpbURyb3Bkb3duOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3RyaW1Ecm9wZG93biddO1xuICBASW5wdXQoKSB0eXBlOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3R5cGUnXTtcbiAgQElucHV0KCkgdW5jaGVja2VkVGVtcGxhdGU6IEhhbmRzb250YWJsZS5Db2x1bW5TZXR0aW5nc1sndW5jaGVja2VkVGVtcGxhdGUnXTtcbiAgQElucHV0KCkgdmFsaWRhdG9yOiBIYW5kc29udGFibGUuQ29sdW1uU2V0dGluZ3NbJ3ZhbGlkYXRvciddO1xuICBASW5wdXQoKSB2aXNpYmxlUm93czogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWyd2aXNpYmxlUm93cyddO1xuICBASW5wdXQoKSB3aWR0aDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWyd3aWR0aCddO1xuICBASW5wdXQoKSB3b3JkV3JhcDogSGFuZHNvbnRhYmxlLkNvbHVtblNldHRpbmdzWyd3b3JkV3JhcCddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyZW50Q29tcG9uZW50OiBIb3RUYWJsZUNvbXBvbmVudCkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZpcnN0UnVuID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ29sdW1uKHRoaXMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlyc3RSdW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudENvbXBvbmVudC5vbkFmdGVyQ29sdW1uc0NoYW5nZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnRDb21wb25lbnQucmVtb3ZlQ29sdW1uKHRoaXMpO1xuICB9XG59XG4iXX0=