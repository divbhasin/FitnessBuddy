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
1\. Run the command `rails test` within the `fitness` directory.
   - To ensure correctness, no test should have returned an error or failure.
   - Tests can be found in the `fitness/test/models` directory.

2\. To test the production datasets, go to the `datasets` directory and run `run_tests.sh`
   - Please see `test-production.sql` for other comments/instructions
   - Expected output can be found in `test-production.out`

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
- User Profile
    - [Profile.jsx](fitness/app/javascript/components/Profile.jsx)
- Dashboard
    - [Dashboard.jsx](fitness/app/javascript/components/Dashboard.jsx)
- Session management
    - [sessions_controller.rb](fitness/app/controllers/api/sessions_controller.rb)
    - [application_controller.rb](fitness/app/controllers/application_controller.rb)
    - [App.jsx](fitness/app/javascript/components/App.jsx)

## How to Load Production Datasets into PostgreSQL
CSV files, sample SQL statements, and output files for Food and Food Group tables are in the `datasets` folder.
Note that we only need to load the `foods` and `food_groups` datasets. The rest of the data in our application
will be user-driven.

### Food group table
**Create table:**
[Food Group Table DDL](fitness/db/migrate/20200309220007_create_food_groups.rb)

**Import from food_group.csv into table (in Psql shell):**
```postgresql
\COPY food_groups FROM 'datasets/food_group.csv' DELIMITER ',' CSV HEADER;
```

### Food table
**Create table:**
[Food Table DDL](fitness/db/migrate/20200309220544_create_foods.rb)

**Import from food.csv into table (in Psql shell):**
```postgresql
\COPY foods FROM 'datasets/food.csv' DELIMITER ',' CSV HEADER;
```
