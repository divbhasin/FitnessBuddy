class AddIndexOnUser < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE INDEX email_index ON "users"(email)
    SQL
  end
end
