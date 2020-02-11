class Api::V1::BaseController < ActionController::API
  protect_from_forgery with: :null_session
end
