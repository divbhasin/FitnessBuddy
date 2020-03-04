Rails.application.routes.draw do
  namespace :api do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'
    resources :users, only: [:create, :show, :index]
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
