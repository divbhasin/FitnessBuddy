class Api::UsersController < ApplicationController
  def index
    @users = User.all
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['no users found']
      }
    end
  end
  
  def show
    @user = User.find(params[:email])
   if @user
      render json: {
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: ['user not found']
      }
    end
  end

  def update
    @user = User.where(email: params[:user][:email]).take

    if @user.update(user_params)
      render json: {
        user: @user
      }
    else
      render json: { errors: @user.errors }
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: { user: @user }
    else
      render json: { errors: @user.errors }
    end
  end

  private
  def user_params 
    h = params.require(:user).permit(:email, :password, 
                                     :first_name, :last_name, :age, :weight,
                                     :height, :gender, :activity_level, :fitness_goal)
    g = Goal.find_by(description: h[:fitness_goal])
    a = ActivityLevel.find_by(description: h[:activity_level])
    h.delete(:activity_level)
    h.delete(:fitness_goal)
    activity_goal = {}

    if a
      activity_goal[:activity_level_id] = a.id
    end

    if g
      activity_goal[:goal_id] = g.id
    end

    h.merge!(activity_goal)
    h.to_h
  end
end
