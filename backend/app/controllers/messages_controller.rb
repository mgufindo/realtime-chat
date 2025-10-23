class MessagesController < ApplicationController
  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    messages = chatroom.messages.order(created_at: :asc)
    render json: messages
  end

  def create
    chatroom = Chatroom.find(params[:chatroom_id])
    message = chatroom.messages.build(
      content: params[:content],
      username: params[:username] || "Anonymous"
    )
    
    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end
end