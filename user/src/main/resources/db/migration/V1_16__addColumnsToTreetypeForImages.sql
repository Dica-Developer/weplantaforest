ALTER TABLE TreeType CHANGE _imageFile treeImageColor varchar(255);
ALTER TABLE TreeType ADD COLUMN treeImageBW varchar(255);
ALTER TABLE TreeType ADD COLUMN fruitImageBw varchar(255);
ALTER TABLE TreeType ADD COLUMN fruiImageColor varchar(255);