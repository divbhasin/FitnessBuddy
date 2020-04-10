class ChangeDateTypeFoodHistory < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      ALTER TABLE food_histories
      ALTER COLUMN created_at SET DATA TYPE date 
    SQL
  end
end
