class CreateActivityLevels < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE "activity_levels" (
        id SERIAL PRIMARY KEY,
        description VARCHAR(2048)
      );
    SQL
  end
end
