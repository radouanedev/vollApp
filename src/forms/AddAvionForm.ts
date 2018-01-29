import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterForm} from "./RegisterForm";

export class AddAvionForm extends FormGroup{

    private static config;

    nomMessages = {
        required: "Nom est requise",
        minlength: "Le min de characteres est 3 "
    };


    nbrePlcMaxMessages = {
        required: "Nombre max de place est requise"
    };


    descriptionMessages = {
        minlength: "Le min de characteres est 20"
    }


    urlImgMessages = {

    }


    static buildForm(): any {

        AddAvionForm.config= {
            nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
            nbrePlcMax: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.minLength(20)]),
            //urlImg: new FormControl('', [Validators.required])
        }

        return AddAvionForm.config;
    }

    constructor() {
        super(AddAvionForm.buildForm());
    }

}