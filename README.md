# Fitness App
## Importing Food Datasets into PostgreSQL
CSV files, sample SQL statements, and output files for Food and Food Group tables are in the `datasets` folder.

### Food Group Table
**Create table:**
```sql
CREATE TABLE food_group (
    id integer NOT NULL,
    name varchar NOT NULL,
    PRIMARY KEY (id));
```

**Import from food_group.csv into table:**
```postgresql
\COPY food_group FROM 'datasets/food_group.csv' DELIMITER ',' CSV HEADER;
```

### Food Table
**Create table:**
```sql
CREATE TABLE food (
    id integer NOT NULL,
    food_group_id integer NOT NULL,
    name varchar NOT NULL,
    calories DECIMAL(8, 2) NOT NULL CHECK(calories >= 0),
    carbs DECIMAL(8, 2) NOT NULL CHECK(carbs BETWEEN 0 AND 100),
    protein DECIMAL(8, 2) NOT NULL CHECK(protein BETWEEN 0 AND 100),
    fat DECIMAL(8, 2) NOT NULL CHECK(fat BETWEEN 0 AND 100),
    fibre DECIMAL(8, 2) NOT NULL CHECK(fibre BETWEEN 0 AND 100),
    PRIMARY KEY (id),
    FOREIGN KEY (food_group_id) REFERENCES food_group(id));
```

**Import from food.csv into table:**
```postgresql
\COPY food FROM 'datasets/food.csv' DELIMITER ',' CSV HEADER;
```
