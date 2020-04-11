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
    activity_factors = {
      1 => 1.2,
      2 => 1.375,
      3 => 1.55,
      4 => 1.725,
      5 => 1.9
    }

    multiplier = {
      5 => -0.2,
      4 => -0.1,
      1 => 0,
      2 => 0.1,
      3 => 0.2
    }

    if (current_user.gender == "Male") then
      bmr = 5 + (10 * (current_user.weight / 2.2046)) + (6.25 * current_user.height) - (5 * current_user.age)
    else
      bmr = -161 + (10 * (current_user.weight / 2.2046)) + (6.25 * current_user.height) - (5 * current_user.age) 
    end
    tdee = activity_factors[current_user.activity_level.id] * bmr
    calories_goal = (1 + multiplier[current_user.goal.id]) * tdee

    protein_goal = 0.20 * calories_goal
    carbs_goal = 0.55 * calories_goal
    fats_goal = 0.25 * calories_goal

    time = Time.new
    progress_code = <<-SQL
      SELECT SUM(foods.calories * (food_histories.servings/100)) as calories, SUM(foods.calories * (food_histories.servings/100)) / #{calories_goal} as caloric_progress,
      SUM(foods.protein * (food_histories.servings/100)) as protein, SUM(foods.protein * (food_histories.servings/100)) / #{protein_goal} as protein_progress,
      SUM(foods.carbs * (food_histories.servings/100)) as carbs, SUM(foods.carbs * (food_histories.servings/100)) / #{carbs_goal} as carbs_progress,
      SUM(foods.fat * (food_histories.servings/100)) as fats, SUM(foods.fat * (food_histories.servings/100)) / #{fats_goal} as fats_progress
      FROM users, foods, food_histories
      WHERE food_histories.created_at = '#{time.strftime("%Y-%m-%d")}'
      AND food_histories.user_id = users.id AND foods.id = food_histories.food_id
      AND users.id = #{current_user.id}
    SQL

    daily_history_code = <<-SQL
      SELECT foods.name as name, ROUND(foods.calories * (food_histories.servings/100)) as calories, ROUND(foods.carbs * (food_histories.servings/100)) as carbs, ROUND(foods.protein * (food_histories.servings/100)) as protein, ROUND(foods.fat * (food_histories.servings/100)) as fat, ROUND(foods.fibre * (food_histories.servings/100)) as fibre,
      food_histories.servings as servings
      FROM users, foods, food_histories
      WHERE food_histories.created_at = '#{time.strftime("%Y-%m-%d")}'
      AND food_histories.user_id = users.id AND foods.id = food_histories.food_id
      AND users.id = #{current_user.id}
    SQL

    progress = ActiveRecord::Base.connection.execute(progress_code)
    daily_history = ActiveRecord::Base.connection.execute(daily_history_code)

    render json: {
      daily_history: daily_history,
      progress: progress,
      tdee: tdee,
      protein_goal: protein_goal,
      fats_goal: fats_goal,
      carbs_goal: carbs_goal
    }
  end

  def monthly_analytics 
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
