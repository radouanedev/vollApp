import {FormControl, FormGroup, Validators} from "@angular/forms";


export class RegisterForm extends FormGroup{

    private static config;

    emailMessages = {
        required: "Email est requise",
        pattern: "Email est invalid"
    };

    nomMessages = {
        required: "Nom est requise",
        minlength: "Le min de characteres est 3 "
    };

    prenomMessages = {
        required: "Prenom est requise",
        minlength: "Le min de characteres est 3 "
    };

    dateNaissMessages = {
        required: "DateNaiss est requise"
    };

    cinMessages = {
        required: "CIN est requise",
        minlength: "Le min de characteres est 4 "
    };

    codeMessages = {
        required: "Code est requise"
    };

    telMessages = {
        required: "Telephone est requise",
        minlength: "Le min de characteres est 3"
    };

    passwordMessages = {
        required: "Mot de passe requise",
        minlength: "Le min de characteres est 8"
    };

    passwordConfMessages = {
        required: "Confirmation de mot de passe est requise",
        equalTo: "Confirmation de mot de passe est non egal"

    };

    nationnaliteMessages = {
        required: "Nationnalite est requise"
    };


    static buildForm(): any {

        RegisterForm.config= {
            email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
            nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
            prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
            dateNaiss: new FormControl('', Validators.required),
            cin: new FormControl('', [Validators.required, Validators.minLength(4)]),
            code: new FormControl('', Validators.required),
            tel: new FormControl('', [Validators.required, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            passwordConf: new FormControl('', [Validators.required]),
            nationnalite: new FormControl('', [Validators.required] )
        }

        return RegisterForm.config;
    }

    constructor() {
        super(RegisterForm.buildForm());
    }

}

