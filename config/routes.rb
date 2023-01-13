# == Route Map
#

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'


  namespace :api, defaults: { format: :json } do
    resources :listings, only: [:index, :create, :show, :destroy]
    resources :trips, only: [:index, :create, :show, :update, :destroy]
    resources :reviews, only: [:show, :create, :update, :destroy]
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
  end

  get '/public/favicon.ico', to: 'application#favicon'

  get '*path', to: "static_pages#frontend_index", constraints: ->(req) {
    req.path.exclude? 'rails/active_storage'
  }

end
