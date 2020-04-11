Rails.application.routes.draw do
  namespace :api do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'
    get '/daily_analytics', to: 'users#daily_analytics'
    get '/monthly_analytics', to: 'users#monthly_analytics'
    get '/food/search', to: 'foods#search'

    resources :users, only: [:create, :show, :index, :update]
    resources :foods, only: [:index]
    resources :food_histories, only: [:index, :create]
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
