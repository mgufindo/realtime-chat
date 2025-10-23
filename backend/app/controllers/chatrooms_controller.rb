class ChatroomsController < ApplicationController
  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  def show
    chatroom = Chatroom.find_by(id: params[:id])
    
    if chatroom
      messages = chatroom.messages.order(created_at: :asc)
      render json: { chatroom: chatroom, messages: messages }
    else
      render json: { error: "Chatroom not found" }, status: :not_found
    end
  end

  def create
    chatroom = Chatroom.new(chatroom_params)
    
    if chatroom.save
      render json: chatroom, status: :created
    else
      render json: { errors: chatroom.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    chatroom = Chatroom.find_by(id: params[:id])
    
    if chatroom
      chatroom.destroy
      render json: { message: "Chatroom deleted successfully" }
    else
      render json: { error: "Chatroom not found" }, status: :not_found
    end
  end

  private

  def chatroom_params
    params.permit(:name)
  end
end