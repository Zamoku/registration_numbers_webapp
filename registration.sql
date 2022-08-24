CREATE TABLE IF NOT EXISTS Towns (
    id serial primary key, 
    town_name text not null
    );

CREATE TABLE IF NOT EXISTS Registration(
   id serial primary key,
   registration_num VARCHAR(255) NOT NULL,
   town_id INT,
   FOREIGN KEY(town_id) REFERENCES Towns(id)
);

