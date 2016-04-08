ALTER TABLE TreeType MODIFY column _name varchar(255) NOT NULL;
ALTER TABLE TreeType ADD UNIQUE(_name)
