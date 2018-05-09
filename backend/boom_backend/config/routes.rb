Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :scores, only: [:index, :update, :create]
      resources :users, only: [:index, :update, :create]
    end
  end
end
end
