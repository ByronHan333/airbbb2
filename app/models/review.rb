# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  trip_id       :bigint           not null
#  user_id       :bigint           not null
#  listing_id    :bigint           not null
#  overall       :integer          not null
#  cleaniness    :integer          not null
#  accuracy      :integer          not null
#  communication :integer          not null
#  arrival       :integer          not null
#  location      :integer          not null
#  content       :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Review < ApplicationRecord
  validates :trip_id, :user_id, :listing_id, :overall, :cleaniness, :accuracy, :communication, :arrival, :location, :content, presence: true

  belongs_to :trip
  belongs_to :listing
  belongs_to :user
end
