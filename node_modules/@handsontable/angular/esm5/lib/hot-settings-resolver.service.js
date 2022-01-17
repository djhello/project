/**
 * @fileoverview added by tsickle
 * Generated from: lib/hot-settings-resolver.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import Handsontable from 'handsontable/base';
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
        { type: Injectable }
    ];
    return HotSettingsResolver;
}());
export { HotSettingsResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90LXNldHRpbmdzLXJlc29sdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGFuZHNvbnRhYmxlL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvaG90LXNldHRpbmdzLXJlc29sdmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSxtQkFBbUIsQ0FBQzs7SUFFdkMsaUJBQWlCLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDOztJQUN2RSxlQUFlLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFFcEU7SUFBQTtJQWlEQSxDQUFDOzs7OztJQS9DQywyQ0FBYTs7OztJQUFiLFVBQWMsU0FBUzs7WUFDZixnQkFBZ0IsR0FBRyxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxRQUFROztZQUM1RCxjQUFjLEdBQThCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ3pGLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBRXpELE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHOztnQkFDWCxNQUFNLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O2dCQUM1QyxNQUFNO1lBRVYsSUFBSSxnQkFBZ0IsSUFBSSxNQUFNLEVBQUU7Z0JBQzlCLE1BQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckM7WUFFRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtZQUVELElBQUksTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixPQUFPO2FBRVI7aUJBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxFQUFFO2dCQUNqRCxjQUFjLENBQUMsR0FBRyxDQUFDOzs7O2dCQUFHO29CQUFBLGlCQUlyQjtvQkFKOEIsY0FBTzt5QkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO3dCQUFQLHlCQUFPOztvQkFDcEMsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUc7OztvQkFBQzt3QkFDekIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxFQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFBLENBQUM7YUFFSDtpQkFBTTtnQkFDTCxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELDRDQUFjOzs7O0lBQWQsVUFBZSxPQUFzQjs7WUFDN0IsTUFBTSxHQUE4QixFQUFFOztZQUN0QyxVQUFVLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFakQsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQUs7WUFDdkIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQzthQUM3QztRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Z0JBaERGLFVBQVU7O0lBaURYLDBCQUFDO0NBQUEsQUFqREQsSUFpREM7U0FoRFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEhhbmRzb250YWJsZSBmcm9tICdoYW5kc29udGFibGUvYmFzZSc7XG5cbmNvbnN0IEFWQUlMQUJMRV9PUFRJT05TOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKEhhbmRzb250YWJsZS5EZWZhdWx0U2V0dGluZ3MpO1xuY29uc3QgQVZBSUxBQkxFX0hPT0tTOiBzdHJpbmdbXSA9IEhhbmRzb250YWJsZS5ob29rcy5nZXRSZWdpc3RlcmVkKCk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIb3RTZXR0aW5nc1Jlc29sdmVyIHtcbiAgbWVyZ2VTZXR0aW5ncyhjb21wb25lbnQpOiBvYmplY3Qge1xuICAgIGNvbnN0IGlzU2V0dGluZ3NPYmplY3QgPSB0eXBlb2YgY29tcG9uZW50WydzZXR0aW5ncyddID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBtZXJnZWRTZXR0aW5nczogSGFuZHNvbnRhYmxlLkdyaWRTZXR0aW5ncyA9IGlzU2V0dGluZ3NPYmplY3QgPyBjb21wb25lbnRbJ3NldHRpbmdzJ10gOiB7fTtcbiAgICBjb25zdCBvcHRpb25zID0gQVZBSUxBQkxFX0hPT0tTLmNvbmNhdChBVkFJTEFCTEVfT1BUSU9OUyk7XG5cbiAgICBvcHRpb25zLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IGlzSG9vayA9IEFWQUlMQUJMRV9IT09LUy5pbmRleE9mKGtleSkgPiAtMTtcbiAgICAgIGxldCBvcHRpb247XG5cbiAgICAgIGlmIChpc1NldHRpbmdzT2JqZWN0ICYmIGlzSG9vaykge1xuICAgICAgICBvcHRpb24gPSBjb21wb25lbnRbJ3NldHRpbmdzJ11ba2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudFtrZXldICE9PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9uID0gY29tcG9uZW50W2tleV07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0hvb2spIHtcbiAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50Ll9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IG9wdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtZXJnZWRTZXR0aW5ncztcbiAgfVxuXG4gIHByZXBhcmVDaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBIYW5kc29udGFibGUuR3JpZFNldHRpbmdzIHtcbiAgICBjb25zdCByZXN1bHQ6IEhhbmRzb250YWJsZS5HcmlkU2V0dGluZ3MgPSB7fTtcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuXG4gICAgcGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgIHJlc3VsdFtwYXJhbV0gPSBjaGFuZ2VzW3BhcmFtXS5jdXJyZW50VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=