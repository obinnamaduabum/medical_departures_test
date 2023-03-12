import { Sequelize } from "sequelize";

if(!process.env.MYSQL_DATABASE) {
    throw "Database Configuration properties not found";
}

const mySqlDatabase = new Sequelize({
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
        define: {
            timestamps: true
        },
        logging: false,
        pool: {
            max: 10,
            min: 1,
            idle: 1,
            evict: 15000,
            acquire: 6000000
        }
});

try {

    mySqlDatabase.authenticate().then(async (_err)=> {
        console.log('Connection has been established successfully.');
    }).catch(function (err) {
        console.log('Unable to connect to the database:', err);
        if (err) throw new Error(err);
    });

} catch (err: any) {
    console.log('database error');
    if (err) {
        throw new Error(err);
    }
}

export  { mySqlDatabase };
