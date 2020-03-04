class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
def login!
    puts("login!")
    puts(@user.id)
    session[:user_id] = @user.id
  end
def logged_in?
    !!session[:user_id]
  end
def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    puts('session user id: ')
    puts(session[:user_id])
    puts('current user email: ')
    puts(@current_user.email)
  end
def authorized_user?
     @user == current_user
   end
def logout!
    reset_session
   end
end
