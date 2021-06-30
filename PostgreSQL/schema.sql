
/*
Open up psql and run this command to create database
'CREATE DATABASE sdc WITH OWNER = 'your_user' ENCODING = 'UTF8';'

In terminal CLI, run this file with the command:
psql -d SDC -a -f schema.sql
to create the tables within that database
*/

CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slogan VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(200) NOT NULL,
  default_price MONEY NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(200) NOT NULL,
  question_date DATE,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  helpfulness SMALLINT,
  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000),
  date DATE,
  answerer_name VARCHAR(50),
  email VARCHAR(100),
  reported BOOLEAN,
  helpfulness SMALLINT,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(200) NOT NULL,
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(answer_id)
);


-- Importing Statements

COPY products
FROM '/Users/julianzthong/Desktop/Hack_Reactor/SDC/Atelier_Import/product.csv'
DELIMITER ','
CSV HEADER;

COPY questions
FROM '/Users/julianzthong/Desktop/Hack_Reactor/SDC/Atelier_Import/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers
FROM '/Users/julianzthong/Desktop/Hack_Reactor/SDC/Atelier_Import/answers.csv'
DELIMITER ','
CSV HEADER;

COPY answers_photos
FROM '/Users/julianzthong/Desktop/Hack_Reactor/SDC/Atelier_Import/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- Create Indexes

CREATE INDEX question_prod_index ON questions(product_id);
CREATE INDEX answer_question_index ON answers(question_id);
CREATE INDEX photo_answer_index ON answers_photos(answer_id);

-- To sync Primary Keys
SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) FROM questions)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'answer_id'), (SELECT MAX(answer_id) FROM answers)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos', 'id'), (SELECT MAX(id) FROM answers_photos)+1);