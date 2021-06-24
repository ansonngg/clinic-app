USE user;
INSERT INTO account (email, password, phone_number, address) VALUES ('123@test.com', MD5('123'), '32165487', 'abc');
USE consultation;
INSERT INTO record (email, clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) VALUES ('123@test.com', 'Health Clinic', 'Dr. Chan Tai Man', 'Jim Chau', 'headaches', 'neurontin', '210', '2021-01-01 15:20:23', '1');
INSERT INTO record (email, clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) VALUES ('123@test.com', 'Health Clinic', 'Dr. Chan Tai Man', 'Jim Chau', 'headaches', 'neurontin', '210', '2021-01-01 15:21:23', '0');
INSERT INTO record (email, clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) VALUES ('123@test.com', 'Health Clinic', 'Dr. Chan Tai Man', 'Jim Chau', 'headaches', 'neurontin', '210', '2021-01-01 16:20:23', '1');
INSERT INTO record (email, clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) VALUES ('123@test.com', 'Health Clinic', 'Dr. Chan Tai Man', 'Jim Chau', 'headaches', 'neurontin', '210', '2021-01-02 15:20:23', '0');