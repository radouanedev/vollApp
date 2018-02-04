import {FormControl, FormGroup, Validators} from "@angular/forms";

export class ReserverForm extends FormGroup{

    private static config;

    countryDepartMessages = {
        required: "Pays de depart est requise"
    };


    countryArriveMessages = {
        required: "Pays d'arrivée est requise"
    };


    static buildForm(): any {

        ReserverForm.config= {
            countryDepart: new FormControl('', [Validators.required]),
            countryArrive: new FormControl('', [Validators.required])
        }

        return ReserverForm.config;
    }

    constructor() {
        super(ReserverForm.buildForm());
    }

}