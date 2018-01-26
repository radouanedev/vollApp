var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// show-errors.component.ts
import { Component, Input } from '@angular/core';
var ShowErrors = (function () {
    function ShowErrors() {
    }
    ShowErrors_1 = ShowErrors;
    ShowErrors.prototype.shouldShowErrors = function () {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    };
    ShowErrors.prototype.listOfErrors = function () {
        var _this = this;
        return Object.keys(this.control.errors)
            .map(function (field) { return _this.getMessage(field, _this.control.errors[field]); });
    };
    ShowErrors.prototype.getMessage = function (type, params) {
        return ShowErrors_1.errorMessages[type](params);
    };
    ShowErrors.errorMessages = {
        'required': function () { return 'Ce champs est requise'; },
        'minlength': function (params) { return 'Le min de characters est ' + params.requiredLength; },
        'maxlength': function (params) { return 'Le max de characters est ' + params.requiredLength; },
        'pattern': function () { return "Vous n'avez respecter le fromat"; },
        'years': function (params) { return params.message; },
        'countryCity': function (params) { return params.message; },
        'uniqueName': function (params) { return params.message; },
        'telephoneNumbers': function (params) { return params.message; },
        'telephoneNumber': function (params) { return params.message; }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ShowErrors.prototype, "control", void 0);
    ShowErrors = ShowErrors_1 = __decorate([
        Component({
            selector: 'show-errors',
            template: "\n   <span *ngIf=\"shouldShowErrors()\" padding-left class=\"errorText\">\n     <span class=\"text-md-danger\" *ngFor=\"let error of listOfErrors()\">{{error}}</span>\n   </span>\n ",
        })
    ], ShowErrors);
    return ShowErrors;
    var ShowErrors_1;
}());
export { ShowErrors };
//# sourceMappingURL=ShowErrors.js.map