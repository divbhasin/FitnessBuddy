class CreateFoods < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      -- decided to have CHECKs here rather than part of ORM because we will
      -- be using a script to import data into this table (rather than user input)
      CREATE TABLE foods (
        id SERIAL NOT NULL,
        food_group_id INTEGER NOT NULL,
        name VARCHAR NOT NULL,
        calories DECIMAL(8, 2) NOT NULL CHECK(calories >= 0),
        carbs DECIMAL(8, 2) NOT NULL CHECK(carbs BETWEEN 0 AND 100),
        protein DECIMAL(8, 2) NOT NULL CHECK(protein BETWEEN 0 AND 100),
        fat DECIMAL(8, 2) NOT NULL CHECK(fat BETWEEN 0 AND 100),
        fibre DECIMAL(8, 2) NOT NULL CHECK(fibre BETWEEN 0 AND 100),
        PRIMARY KEY (id),
        FOREIGN KEY (food_group_id) REFERENCES food_groups(id)
      );
    SQL
  end
end
