


CREATE USER 'medical_departures_user'@'127.0.0.1' IDENTIFIED BY '!333435weekly193#';
# GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'medical_departures_user'@'localhost' WITH GRANT OPTION;

GRANT ALL ON *.* TO 'medical_departures_user'@'127.0.0.1';

CREATE DATABASE IF NOT EXISTS medical_departures_db;