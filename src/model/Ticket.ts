import {Vol} from "./Vol";
import {User} from "./User";

export class Ticket {

    private _id: string;
    private _vol:Vol;
    private _user: User ;


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get vol(): Vol {
        return this._vol;
    }

    set vol(value: Vol) {
        this._vol = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }
}