class CreateUsers < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE "users" (
        uid SERIAL,
        email varchar(100),
        password varchar(100)
      );
    SQL
  end
end
