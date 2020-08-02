class CreateUsers < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    SQL
  end
end
