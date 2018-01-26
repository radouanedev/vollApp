var User = (function () {
    function User() {
        this._email = '';
        this._password = '';
        this._nom = '';
        this._prenom = '';
        this._dateNaiss = new Date();
        this._tel = '';
        this._nationnalite = '';
    }
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (value) {
            this._nom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "prenom", {
        get: function () {
            return this._prenom;
        },
        set: function (value) {
            this._prenom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "dateNaiss", {
        get: function () {
            return this._dateNaiss;
        },
        set: function (value) {
            this._dateNaiss = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "cin", {
        get: function () {
            return this._cin;
        },
        set: function (value) {
            this._cin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tel", {
        get: function () {
            return this._tel;
        },
        set: function (value) {
            this._tel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "nationnalite", {
        get: function () {
            return this._nationnalite;
        },
        set: function (value) {
            this._nationnalite = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map