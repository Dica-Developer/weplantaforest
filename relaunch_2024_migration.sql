-- MYSQL STATEMENTS TO RUN AFTER PROD DEPLOYMENT
-- 
-- 
-- Treetype stuff
UPDATE `ipat_2019`.`TreeType`  SET _name = (SELECT _name from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET _description = (SELECT _description from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET treeImageColor = (SELECT treeImageColor from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET fruit = (SELECT fruit from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET trunk = (SELECT trunk from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET leaf = (SELECT leaf from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET treeImageBW = (SELECT treeImageBW from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET fruitImageColor = (SELECT fruitImageColor from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET trunkImageColor = (SELECT trunkImageColor from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;
UPDATE `ipat_2019`.`TreeType`  SET leafImage = (SELECT leafImage from `ipat_test`.`TreeType` WHERE `ipat_test`.`TreeType`.treeTypeId = `ipat_2019`.`TreeType`.treeTypeId) WHERE `ipat_2019`.`TreeType`.treeTypeId <> 0;

-- Content stuff 
-- FAQ 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 5;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 5;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 5);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 5);

-- Finanzen 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 18;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 18;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 18);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 18);

-- Über Uns 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 7;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 7;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 7);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 7);

-- Partner 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 3;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 3;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 3);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 3);

-- Auszeichnungen 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 24;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 24;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 24);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 24);

-- Impressum 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 15;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 15;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 15);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 15);

-- Datenschutz 
UPDATE `ipat_2019`.`Article`  SET _title = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 20;
UPDATE `ipat_2019`.`Article`  SET _intro = (SELECT _title from `ipat_test`.`Article` WHERE `ipat_test`.`Article`._articleId = `ipat_2019`.`Article`._articleId) WHERE `ipat_2019`.`Article`._articleId <> 0 AND `ipat_2019`.`Article`._articleType = 20;
UPDATE `ipat_2019`.`Paragraph`  SET _title = (SELECT _title from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 20);
UPDATE `ipat_2019`.`Paragraph`  SET _text = (SELECT _text from `ipat_test`.`Paragraph` WHERE `ipat_test`.`Paragraph`._paragraphId = `ipat_2019`.`Paragraph`._paragraphId) 
WHERE `ipat_2019`.`Paragraph`._paragraphId <> 0 AND `ipat_2019`.`Paragraph`._article__articleId IN(select _articleId from Article where _articleType = 20);