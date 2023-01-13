# == Schema Information
#
# Table name: trips
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  listing_id  :bigint           not null
#  start_date  :date             not null
#  end_date    :date             not null
#  num_guests  :integer          not null
#  total_price :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Trip < ApplicationRecord
  validates :user_id, :listing_id, :start_date, :end_date, :num_guests, :total_price, presence: true

  belongs_to :user
  belongs_to :listing

  has_one :review

end
