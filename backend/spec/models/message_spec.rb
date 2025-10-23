require 'rails_helper'

RSpec.describe 'Messages API', type: :request do
  describe 'GET /api/messages' do
    let!(:messages) { create_list(:message, 3) }

    it 'returns all messages' do
      get api_messages_path
      
      expect(response).to have_http_status(:success)
      expect(json_response.size).to eq(3)
    end
  end

  describe 'POST /api/messages' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          content: 'Hello World!',
          username: 'testuser'
        }
      end

      it 'creates a new message' do
        expect {
          post api_messages_path, params: valid_params
        }.to change(Message, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(json_response['content']).to eq('Hello World!')
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {
          content: '',
          username: 'testuser'
        }
      end

      it 'returns validation errors' do
        post api_messages_path, params: invalid_params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['errors']).to be_present
      end
    end
  end

  private

  def json_response
    JSON.parse(response.body)
  end
end