// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
   <span *ngIf="shouldShowErrors()" padding-left class="errorText">
     <span class="text-md-danger" *ngFor="let error of listOfErrors()">{{error}}</span>
   </span>
 `,
})
export class ShowErrors {

  private static readonly errorMessages = {
    'required': () => 'Ce champs est requise',
    'minlength': (params) => 'Le min de characters est ' + params.requiredLength,
    'maxlength': (params) => 'Le max de characters est ' + params.requiredLength,
    'pattern': () => "Vous n'avez respecter le fromat",
    /*'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message*/
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field =>
          this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrors.errorMessages[type](params);
  }

}
