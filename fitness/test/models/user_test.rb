require 'test_helper'
 
class UserTest < ActiveSupport::TestCase
  def setup
    # ensure no test users are in the database before beginning
    User.where("email LIKE '%test.com'").destroy_all
  end

  test 'user can be created successfully given correct params' do
    me = User.create(email: 'test1@test.com', password: 'this should be long enough')
    assert me.valid?

    # clean up
    User.find(me.id).destroy
  end

  test 'password cannot be less than 8 chars' do
    me = User.create(email: 'test1@test.com', password: 'this sh')
    assert_not me.valid?
    assert me.errors.include?(:password)
  end

  test 'email cannot be duplicated' do
    me = User.create(email: 'test1@test.com', password: 'this should be long enough')
    assert me.valid?

    me2 = User.create(email: 'test1@test.com', password: 'im the same as test1')
    assert_not me2.valid?
    assert me2.errors.include?(:email)

    # clean up
    User.find(me.id).destroy
  end

  test 'email cannot be omitted' do
    me = User.create(password: 'this sh')
    assert_not me.valid?
    assert me.errors.include?(:email)
  end

  test 'password cannot be omitted' do
    me = User.create(email: 'test1@test.com')
    assert_not me.valid?
    assert me.errors.include?(:password)
  end
end
