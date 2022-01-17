/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-table-registerer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
const instances = new Map();
/** @type {?} */
export const HOT_DESTROYED_WARNING = 'The Handsontable instance bound to this component was destroyed and cannot be' +
    ' used properly.';
export class HotTableRegisterer {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXRhYmxlLXJlZ2lzdGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYW5kc29udGFibGUvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9ob3QtdGFibGUtcmVnaXN0ZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFHckMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUF3Qjs7QUFFakQsTUFBTSxPQUFPLHFCQUFxQixHQUFHLCtFQUErRTtJQUNsSCxpQkFBaUI7QUFHbkIsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFDdEIsV0FBVyxDQUFDLEVBQVU7O2NBQ3JCLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUVyQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXBDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxFQUFVLEVBQUUsUUFBc0I7UUFDeEQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLGNBQWMsQ0FBQyxFQUFVO1FBQzlCLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUFwQkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBIYW5kc29udGFibGUgZnJvbSAnaGFuZHNvbnRhYmxlL2Jhc2UnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBuZXcgTWFwPHN0cmluZywgSGFuZHNvbnRhYmxlPigpO1xuXG5leHBvcnQgY29uc3QgSE9UX0RFU1RST1lFRF9XQVJOSU5HID0gJ1RoZSBIYW5kc29udGFibGUgaW5zdGFuY2UgYm91bmQgdG8gdGhpcyBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBhbmQgY2Fubm90IGJlJyArXG4gICcgdXNlZCBwcm9wZXJseS4nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG90VGFibGVSZWdpc3RlcmVyIHtcbiAgcHVibGljIGdldEluc3RhbmNlKGlkOiBzdHJpbmcpOiBIYW5kc29udGFibGUge1xuICAgIGNvbnN0IGhvdEluc3RhbmNlID0gaW5zdGFuY2VzLmdldChpZCk7XG5cbiAgICBpZiAoaG90SW5zdGFuY2UuaXNEZXN0cm95ZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihIT1RfREVTVFJPWUVEX1dBUk5JTkcpO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gaG90SW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJJbnN0YW5jZShpZDogc3RyaW5nLCBpbnN0YW5jZTogSGFuZHNvbnRhYmxlKTogTWFwPHN0cmluZywgSGFuZHNvbnRhYmxlPiB7XG4gICAgcmV0dXJuIGluc3RhbmNlcy5zZXQoaWQsIGluc3RhbmNlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVJbnN0YW5jZShpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluc3RhbmNlcy5kZWxldGUoaWQpO1xuICB9XG59XG4iXX0=