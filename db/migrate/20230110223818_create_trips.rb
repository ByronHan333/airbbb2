class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.references :user, null: false
      t.references :listing, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :total_price, null: false
      t.timestamps
    end
  end
end
