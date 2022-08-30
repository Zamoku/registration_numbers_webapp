CREATE TABLE IF NOT EXISTS Towns (
    id serial primary key, 
    town_name text not null
    -- ,town_tag text not null
    );

CREATE TABLE IF NOT EXISTS Registration(
   id serial primary key,
   registration_num VARCHAR(255) NOT NULL,
   town_id INT,
   FOREIGN KEY(town_id) REFERENCES Towns(id)
);

INSERT INTO Towns(town_name) VALUES ('CY'),('CA'),('CJ');




-- INSERT INTO Registration (registration_num, town_id) VALUES ('CA 152-152',(SELECT Towns.id FROM Towns WHERE town_name = SUBSTRING('CA 123-565',1,2)));