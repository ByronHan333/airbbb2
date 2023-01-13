class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :trip, null: false
      t.references :user, null: false
      t.references :listing, null: false
      t.integer :overall, null: false
      t.integer :cleaniness, null: false
      t.integer :accuracy, null: false
      t.integer :communication, null: false
      t.integer :arrival, null: false
      t.integer :location, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
