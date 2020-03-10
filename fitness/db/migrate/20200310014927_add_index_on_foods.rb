class AddIndexOnFoods < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE INDEX name_index ON "foods"(name)
    SQL
  end
end
