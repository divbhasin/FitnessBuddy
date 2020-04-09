class CreateFoodHistories < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE food_histories (
        id SERIAL NOT NULL,
        food_id INTEGER NOT NULL REFERENCES foods(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        servings DECIMAL(8, 2) NOT NULL CHECK(servings > 0),
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id, food_id, user_id)
      );
    SQL
  end
end
