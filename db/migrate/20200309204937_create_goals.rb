class CreateGoals < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE "goals" (
        id SERIAL PRIMARY KEY,
        description VARCHAR(2048)
      );
    SQL
  end
end
