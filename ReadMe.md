
To run application kindl see package.json

npm run dev # run dev
npm run deploy # aws deployment 

AWS URL: **https://df4o85snh6.execute-api.us-east-1.amazonaws.com/dev/api-docs/**




CREATE USER 'medical_departures_user'@'127.0.0.1' IDENTIFIED BY '!333435weekly193#';
# GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'medical_departures_user'@'localhost' WITH GRANT OPTION;

GRANT ALL ON *.* TO 'medical_departures_user'@'127.0.0.1';

CREATE DATABASE IF NOT EXISTS medical_departures_db;!
[UML.png](UML.png)