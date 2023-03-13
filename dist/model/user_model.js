"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(firstName, lastName, otherName, userName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.otherName = otherName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
exports.UserModel = UserModel;
