class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :username, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end