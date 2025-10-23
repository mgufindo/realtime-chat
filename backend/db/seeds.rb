# Hapus data lama
Message.destroy_all
Chatroom.destroy_all

# Buat default chat rooms
default_rooms = [
  "General Chat",
  "Random Talk", 
  "Tech Discussion",
  "Game Room",
  "Help & Support"
]

default_rooms.each do |room_name|
  chatroom = Chatroom.create!(name: room_name)
  puts "Created chatroom: #{chatroom.name}"
  
  # Tambahkan sample messages untuk setiap room
  if room_name == "General Chat"
    chatroom.messages.create!([
      { content: "👋 Welcome to General Chat!", username: "System" },
      { content: "Hello everyone! Feel free to introduce yourself.", username: "Admin" }
    ])
  elsif room_name == "Tech Discussion"
    chatroom.messages.create!([
      { content: "💻 Welcome to Tech Discussion!", username: "System" },
      { content: "Let's talk about programming, tech news, and new technologies!", username: "TechBot" }
    ])
  end
end

puts "✅ Seed data created successfully!"
puts "   Chatrooms: #{Chatroom.count}"
puts "   Messages: #{Message.count}"