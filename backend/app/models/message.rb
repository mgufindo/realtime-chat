class Message < ApplicationRecord
  belongs_to :chatroom
  
  validates :content, presence: true
  validates :username, presence: true
  validates :chatroom_id, presence: true
end