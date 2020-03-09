class User < ApplicationRecord
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  validates_presence_of :password
  validates :password, length: { minimum: 8 }

  has_one :activity_level
  has_one :goal
end
