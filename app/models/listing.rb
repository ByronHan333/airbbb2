# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text             not null
#  host_id     :bigint           not null
#  address     :string           not null
#  latitute    :float            not null
#  longitude   :float            not null
#  price       :integer          not null
#  num_beds    :integer          not null
#  rating      :integer          not null
#  has_wifi    :boolean          default(FALSE), not null
#  has_ac      :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Listing < ApplicationRecord
  validates :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :rating, :has_wifi, :has_ac, presence: true

  belongs_to :host,
  class_name: :User,
  foreign_key: :host_id,
  inverse_of: :listings

  has_many :trips
  has_many :reviews

  has_many_attached :photos
end
