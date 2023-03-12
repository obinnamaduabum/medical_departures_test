export class UserModel {
    firstName: string;
    lastName: string;
    otherName?: string;
    userName: string;
    email: string;
    password:string;


    constructor(firstName: string, lastName: string, otherName: string | undefined, userName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.otherName = otherName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
