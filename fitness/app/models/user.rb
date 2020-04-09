class User < ApplicationRecord
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  validates_presence_of :password
  validates :password, length: { minimum: 8 }

  belongs_to :activity_level
  belongs_to :goal

  has_many :food_history
end
