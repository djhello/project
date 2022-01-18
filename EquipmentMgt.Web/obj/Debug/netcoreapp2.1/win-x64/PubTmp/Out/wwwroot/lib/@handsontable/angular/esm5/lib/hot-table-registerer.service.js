/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table-registerer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
var instances = new Map();
/** @type {?} */
export var HOT_DESTROYED_WARNING = 'The Handsontable instance bound to this component was destroyed and cannot be' +
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
        { type: Injectable }
    ];
    return HotTableRegisterer;
}());
export { HotTableRegisterer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRhYmxlLXJlZ2lzdGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYW5kc29udGFibGUvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9ob3QtdGFibGUtcmVnaXN0ZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFHckMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUF3Qjs7QUFFakQsTUFBTSxLQUFPLHFCQUFxQixHQUFHLCtFQUErRTtJQUNsSCxpQkFBaUI7QUFFbkI7SUFBQTtJQXFCQSxDQUFDOzs7OztJQW5CUSx3Q0FBVzs7OztJQUFsQixVQUFtQixFQUFVOztZQUNyQixXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFckMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUVwQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRU0sNkNBQWdCOzs7OztJQUF2QixVQUF3QixFQUFVLEVBQUUsUUFBc0I7UUFDeEQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLDJDQUFjOzs7O0lBQXJCLFVBQXNCLEVBQVU7UUFDOUIsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQXBCRixVQUFVOztJQXFCWCx5QkFBQztDQUFBLEFBckJELElBcUJDO1NBcEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBIYW5kc29udGFibGUgZnJvbSAnaGFuZHNvbnRhYmxlL2Jhc2UnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBuZXcgTWFwPHN0cmluZywgSGFuZHNvbnRhYmxlPigpO1xuXG5leHBvcnQgY29uc3QgSE9UX0RFU1RST1lFRF9XQVJOSU5HID0gJ1RoZSBIYW5kc29udGFibGUgaW5zdGFuY2UgYm91bmQgdG8gdGhpcyBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBhbmQgY2Fubm90IGJlJyArXG4gICcgdXNlZCBwcm9wZXJseS4nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG90VGFibGVSZWdpc3RlcmVyIHtcbiAgcHVibGljIGdldEluc3RhbmNlKGlkOiBzdHJpbmcpOiBIYW5kc29udGFibGUge1xuICAgIGNvbnN0IGhvdEluc3RhbmNlID0gaW5zdGFuY2VzLmdldChpZCk7XG5cbiAgICBpZiAoaG90SW5zdGFuY2UuaXNEZXN0cm95ZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihIT1RfREVTVFJPWUVEX1dBUk5JTkcpO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gaG90SW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJJbnN0YW5jZShpZDogc3RyaW5nLCBpbnN0YW5jZTogSGFuZHNvbnRhYmxlKTogTWFwPHN0cmluZywgSGFuZHNvbnRhYmxlPiB7XG4gICAgcmV0dXJuIGluc3RhbmNlcy5zZXQoaWQsIGluc3RhbmNlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVJbnN0YW5jZShpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluc3RhbmNlcy5kZWxldGUoaWQpO1xuICB9XG59XG4iXX0=