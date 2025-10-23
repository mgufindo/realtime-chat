Rails.application.routes.draw do
  resources :chatrooms, only: [:index, :show, :create, :destroy] do
    resources :messages, only: [:index, :create]
  end
end