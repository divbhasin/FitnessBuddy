class CreateFoodGroups < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE food_groups (
        id SERIAL NOT NULL,
        name VARCHAR NOT NULL,
        PRIMARY KEY (id)
      );
    SQL
  end
end
