UPDATE CartItem SET _treeId = NULL WHERE _treeId NOT IN (SELECT _treeId FROM Tree);

