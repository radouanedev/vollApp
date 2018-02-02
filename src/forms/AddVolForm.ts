import {FormControl, FormGroup, Validators} from "@angular/forms";

export class AddVolForm extends FormGroup{

    private static config;

    countryDepartMessages = {
        required: "Pays de depart est requise",
    };

    countryArriveMessages = {
        required: "Pays d'arrivée est requise",
    };

    dateDepartMessages = {
        required: "Date depart est requise",
    };


    heureDepartMessages = {
        required: "Heure depart est requise"
    };


    dateArriveMessages = {
        required: "Date Arrive est requise"
    };


    heureArriveMessages = {
        required: "Heure Arrive est requise"
    };


    prixMessages = {
        required: "Prix est requise"
    };


    static buildForm(): any {

        AddVolForm.config= {
            countryDepart: new FormControl('', [Validators.required]),
            countryArrive: new FormControl('', [Validators.required]),
            dateDepart: new FormControl('', [Validators.required]),
            heureDepart: new FormControl('', [Validators.required]),
            dateArrive: new FormControl('', [Validators.required]),
            heureArrive: new FormControl('', [Validators.required]),
            prix: new FormControl('', [Validators.required])
        }

        return AddVolForm.config;
    }

    constructor() {
        super(AddVolForm.buildForm());
    }

}