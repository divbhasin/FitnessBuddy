class ExpandUsers < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      ALTER TABLE "users"
      ADD COLUMN first_name VARCHAR(100) NOT NULL,
      ADD COLUMN last_name VARCHAR(100) NOT NULL,
      ADD COLUMN weight REAL NOT NULL,
      ADD COLUMN height REAL NOT NULL,
      ADD COLUMN age INTEGER NOT NULL,
      ADD COLUMN gender VARCHAR(100) NOT NULL,
      ADD COLUMN goal_id INTEGER NOT NULL REFERENCES goals(id),
      ADD COLUMN activity_level_id INTEGER NOT NULL REFERENCES activity_levels(id);
    SQL
  end
end
