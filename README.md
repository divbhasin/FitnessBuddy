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

### Running Tests
1. Run the command `rails test` within the `fitness` directory.
   - To ensure correctness, no test should have returned an error or failure.
   - Tests can be found in the `fitness/test/models` directory.

### Database schema
Our schema can be found as a collection of `migration`s located in `/fitness/db/migrate`

## Implemented Features
- User sign up
    - [users_controller.rb](fitness/app/controllers/api/users_controller.rb)
    - [application_controller.rb](fitness/app/controllers/application_controller.rb)
    - [Signup.jsx](fitness/app/javascript/components/Signup.jsx)
    - [Signup.css](fitness/app/javascript/components/Signup.css)
    - [Credentials.jsx](fitness/app/javascript/components/signup/Credentials.jsx)
    - [PersonalDetails.jsx](fitness/app/javascript/components/signup/PersonalDetails.jsx)
    - [FitnessGoals.jsx](fitness/app/javascript/components/signup/FitnessGoals.jsx)
- User login
    - [users_controller.rb](fitness/app/controllers/api/users_controller.rb)
    - [sessions_controller.rb](fitness/app/controllers/api/sessions_controller.rb)
    - [application_controller.rb](fitness/app/controllers/application_controller.rb)
    - [Login.jsx](fitness/app/javascript/components/Login.jsx)
    - [Login.css](fitness/app/javascript/components/Login.css)
- Dashboard
    - [Dashboard.jsx](fitness/app/javascript/components/Dashboard.jsx)
- Session management
    - [sessions_controller.rb](fitness/app/controllers/api/sessions_controller.rb)
    - [application_controller.rb](fitness/app/controllers/application_controller.rb)
    - [App.jsx](fitness/app/javascript/components/App.jsx)

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
