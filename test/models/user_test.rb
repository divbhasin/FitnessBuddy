require 'test_helper'
 
class UserTest < ActiveSupport::TestCase
  def setup
    # ensure no test users are in the database before beginning
    User.where("email LIKE '%test.com'").destroy_all
    @default_params = { height: 1, weight: 1, age: 1,
                        first_name: 'test', last_name: 'user',
                        gender: 'Other', activity_level_id: 1,
                        goal_id: 1}
  end

  test 'user can be created successfully given correct params' do
    me = User.create({email: 'test1@test.com', password: 'this should be long enough'}.merge(@default_params))
    assert me.valid?

    # clean up
    User.find(me.id).destroy
  end

  test 'password cannot be less than 8 chars' do
    me = User.create({email: 'test1@test.com', password: 'this sh'}.merge(@default_params))
    assert_not me.valid?
    assert me.errors.include?(:password)
  end

  test 'email cannot be duplicated' do
    me = User.create({email: 'test1@test.com', password: 'this should be long enough'}.merge(@default_params))
    assert me.valid?

    me2 = User.create({email: 'test1@test.com', password: 'im the same as test1'}.merge(@default_params))
    assert_not me2.valid?
    assert me2.errors.include?(:email)

    # clean up
    User.find(me.id).destroy
  end

  test 'email cannot be omitted' do
    me = User.create({password: 'this sh'}.merge(@default_params))
    assert_not me.valid?
    assert me.errors.include?(:email)
  end

  test 'password cannot be omitted' do
    me = User.create({email: 'test1@test.com'}.merge(@default_params))
    assert_not me.valid?
    assert me.errors.include?(:password)
  end

  test 'ensure activity level cannot be null' do
    me = User.create({email: 'test1@test.com', password: 'this should be long enough'}.merge(@default_params).except(:activity_level_id))
    assert_not me.valid?
    assert me.errors.include?(:activity_level)
  end

  test 'ensure fitness goal cannot be null' do
    me = User.create({email: 'test1@test.com', password: 'this should be long enough'}.merge(@default_params).except(:goal_id))
    assert_not me.valid?
    assert me.errors.include?(:goal)
  end
end
