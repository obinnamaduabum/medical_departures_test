const bCrypt = require('bcryptjs');

export class BcryptPasswordUtil {

    static async compare(inputPassword: string, password: string): Promise<boolean | any> {
        return new Promise((resolve, reject) => {
            bCrypt.compare(inputPassword, password, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve(res);

            });

        });
    }


    static async getHashedPassword(password: String , saltRounds: number): Promise<string | null> {
       return new Promise((resolve, reject) => {
           bCrypt.hash(password, saltRounds, function(err, hash) {

               if(err) {
                   reject(null);
               }

               resolve(hash);

           });
        });
    }
}
