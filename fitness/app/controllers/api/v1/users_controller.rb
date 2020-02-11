class Api::V1::UsersController < Api::V1::BaseController
  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user }
    else
      render json: { errors: user.errors }
    end
  end

  private

  def user_params 
    params.require(:user).permit(:email, :password)
  end
end
