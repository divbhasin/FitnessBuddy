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

  def daily_analytics 
    calories_results = ActiveRecord::Base.connection.execute(daily_calculator_query("calories"))
    carbs_results = ActiveRecord::Base.connection.execute(daily_calculator_query("carbs"))
    protein_results = ActiveRecord::Base.connection.execute(daily_calculator_query("protein"))
    fat_results = ActiveRecord::Base.connection.execute(daily_calculator_query("fat"))
    fibre_results = ActiveRecord::Base.connection.execute(daily_calculator_query("fibre"))
    render json: {
      calories_results: calories_results,
      carbs_results: carbs_results,
      protein_results: protein_results,
      fat_results: fat_results,
      fibre_results: fibre_results
    }
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

  def daily_calculator_query(macro)
    code = <<-SQL
      SELECT t.count, to_char(t.date, 'yyyy-mm-dd') as date FROM (
        SELECT sum(foods.#{macro} * (food_histories.servings / 100)) as count, date_trunc('day', food_histories.created_at) as date
        FROM users, foods, food_histories
        WHERE users.id = #{current_user.id} AND food_histories.user_id = users.id AND food_histories.food_id = foods.id 
        GROUP BY date_trunc('day', food_histories.created_at)
        HAVING date_trunc('day', food_histories.created_at) > now() - interval '1 month'
        AND date_trunc('day', food_histories.created_at) <= now()
      ) AS t;
    SQL
  end
end
