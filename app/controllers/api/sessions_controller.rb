class Api::SessionsController < ApplicationController
  def create
      @user = User.find_by(email: session_params[:email])
    
      if @user && @user.password == session_params[:password]
        login!
        render json: {
          logged_in: true,
          user: @user
        }
      else
        render json: { 
          status: 401,
          errors: ['Invalid credentials!']
        }
      end
    end
  def is_logged_in?
      if logged_in? && session[:user_id]
        render json: {
          logged_in: true,
          user: User.find(session[:user_id])
        }
      else
        render json: {
          logged_in: false,
          message: 'no such user'
        }
      end
    end
  def destroy
      logout!
      render json: {
        status: 200,
        logged_out: true
      }
    end
  private
  def session_params
      params.require(:user).permit(:email, :password)
    end
  end
