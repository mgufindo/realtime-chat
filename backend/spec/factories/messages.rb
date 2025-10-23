FactoryBot.define do
  factory :message do
    username { "User#{rand(1000)}" }
    content { "Test message content" }
  end
end