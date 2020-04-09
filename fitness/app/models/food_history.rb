class FoodHistory < ApplicationRecord
	belongs_to :food
	belongs_to :user

	validates :servings, numericality: { greater_than: 0 }
end
