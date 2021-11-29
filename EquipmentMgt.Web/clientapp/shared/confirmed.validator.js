"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ConfirmedValidator(controlName, matchingControlName) {
    return function (formGroup) {
        var control = formGroup.controls[controlName];
        var matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
exports.ConfirmedValidator = ConfirmedValidator;
//# sourceMappingURL=confirmed.validator.js.map