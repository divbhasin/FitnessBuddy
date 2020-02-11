class Api::V1::UsersController < Api::V1::BaseController
  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user_params 
    params.permit(:email, :password)
  end
end
