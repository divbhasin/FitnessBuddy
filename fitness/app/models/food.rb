class Food < ApplicationRecord
  belongs_to :food_group

  validates_presence_of :name
end
