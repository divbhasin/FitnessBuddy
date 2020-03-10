-- Instructions: run `./run_tests.sh` script to product
--               output and compare to expected output in test-production.out

-- dummy query to make sure foods is working
-- expected output: 6347 
SELECT COUNT(*) FROM foods;

-- dummy query to make sure food_groups is working
-- expected ouput: 13
SELECT COUNT(*) FROM food_groups;

-- use index on food name
-- expected output: one food record
SELECT * FROM foods WHERE name='Butter, salted';

-- arbitrary query on foods
-- expected output: ten food records where each food has calories < 100
SELECT * FROM foods WHERE calories < 100 LIMIT 10;

-- get food group from food
-- expected output: Dairy and egg products
SELECT food_groups.name
FROM foods, food_groups
WHERE food_groups.id = foods.food_group_id
AND foods.name = 'Butter, salted';

