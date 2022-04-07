DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
   id VARCHAR(72) PRIMARY KEY,
   firstname VARCHAR(250) NOT NULL,
   lastname VARCHAR(250) NOT NULL,
   email VARCHAR(250) NOT NULL,
   password VARCHAR(72) NOT NULL,
   created TIME DEFAULT now()
);

DROP TABLE IF EXISTS schedule;
CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(72) references users(id),
    day INT NOT NULL,
    start_time VARCHAR(72),
    end_time VARCHAR(72) 
);