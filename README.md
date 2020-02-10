# Fitness App
## Getting started
### Requirements
* Ruby
* Node.js
* Yarn

### Building and running app
1. Git clone
2. Navigate to `rails-app/fitness` directory
3. `bundle install`
4. `yarn install`
5. `rails s`
6. Go to [http://127.0.0.1:3000](http://127.0.0.1:3000) in your web browser

## Importing food datasets into PostgreSQL
CSV files, sample SQL statements, and output files for Food and Food Group tables are in the `datasets` folder.

### Food group table
**Create table:**
```sql
CREATE TABLE food_group (
    id integer NOT NULL,
    name varchar NOT NULL,
    PRIMARY KEY (id));
```

**Import from food_group.csv into table (in Psql shell):**
```postgresql
\COPY food_group FROM 'datasets/food_group.csv' DELIMITER ',' CSV HEADER;
```

### Food table
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

**Import from food.csv into table (in Psql shell):**
```postgresql
\COPY food FROM 'datasets/food.csv' DELIMITER ',' CSV HEADER;
```
