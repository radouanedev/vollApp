// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
    selector: 's-errors',
    template: `
   <span padding-left class="errorText"
          *ngIf="control.errors && (control.dirty || control.touched)">
       <span class="text-md-danger" *ngIf="control.errors.required">{{messages.required}}</span>
       <span class="text-md-danger" *ngIf="control.errors.pattern">{{messages.pattern}}</span>
       <span class="text-md-danger" *ngIf="control.errors.minlength">{{messages.minlength}}</span>
   </span>
 `,
})
export class Errors {

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    @Input()
    private messages: any;

}
