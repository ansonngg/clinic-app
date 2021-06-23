CREATE DATABASE user;
USE user;
CREATE TABLE account (
    email VARCHAR(255),
    password CHAR(32),
    phone_number CHAR(8),
    address VARCHAR(255)
);

CREATE DATABASE consultation;
USE consultation;
CREATE TABLE record (
    clinic VARCHAR(255),
    doctor_name VARCHAR(255),
    patient_name VARCHAR(255),
    diagnosis VARCHAR(255),
    medication VARCHAR(255),
    consultation_fee INTEGER,
    date DATETIME,
    follow_up BOOLEAN
);