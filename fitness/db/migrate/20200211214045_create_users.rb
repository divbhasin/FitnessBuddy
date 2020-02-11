class CreateUsers < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    SQL
  end
end

