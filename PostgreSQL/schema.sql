
/*
Use this command line to create the database first in terminal
CREATE DATABASE SDC WITH OWNER = julianzthong ENCODING = 'UTF8';
then run this file with the command:
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
  body VARCHAR(200) NOT NULL,
  date_written DATE,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  helpful SMALLINT,
  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000),
  date_written DATE,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(100),
  reported BOOLEAN,
  helpful SMALLINT,
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


-- import CSV files statements

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

-- create indexes

CREATE INDEX question_prod_index ON questions(product_id);
CREATE INDEX answer_question_index ON answers(question_id);
CREATE INDEX photo_answer_index ON answers_photos(answer_id);