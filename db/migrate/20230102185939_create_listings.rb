class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.references :host, foreign_key: {to_table: :users}
      t.string :address, null: false
      t.decimal :latitute	, null: false
      t.decimal :longitude, null: false
      t.integer :price, null: false
      t.integer :num_beds, null: false
      t.boolean :has_wifi, null: false, default: false
      t.boolean :has_ac, null: false, default: false
      t.timestamps
    end

    add_index :listings, :title, unique: true
  end
end
