# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all
Listing.destroy_all
Trip.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')
ApplicationRecord.connection.reset_pk_sequence!('trips')

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
user1 = User.create!(
  username: 'username',
  email: 'username@username.com',
  password: 'password'
)

user2 = User.create!(
  username: 'super-rich-guy',
  email: 'username2@username.com',
  password: 'password'
)

puts "Creating listings..."
# Create one user with an easy to remember username, email, and password:
addresses = [
  'Pacifica, California',
  'Brisbane, California',
  'Monterey, California',
  'Half Moon Bay, California',
  'Alameda, ',
  'Burlingame, ',
  'Foster City, ',
  'Newwark, ',
  'Oakland, ',
  'San Francisco, '
]

latlon = [
  [37.614694, -122.496388],
  [37.674905, -122.405720],
  [36.606411, -121.950079],
  [37.467001, -122.441354],
]

titles = [
  'Stinson Oceanfront Apt.- La Sirena',
  'Private Luxury in County Park near town',
  'SPECTACULAR OCEAN-FRONT HOME IN MONTEREY BAY',
  'Walk to the Beach from this Ocean Front Home',
  'Surfscape Beach House, Private Beach & Ocean views',
  'Amazing Welcoming Unique Ocean Home',
  'Jaw-Dropping Beach-Front Retreat!',
  'Sea Glass! Amazing Views!',
  'Coastal Estate w Hot Tub Ocean',
  'Oceanfront Beach House',
  'Oceanfront Boho Retreat - Pacific Sunset Views'
]

descriptions = [
  'Feel at home on the beach...La Sirena is a bright and clean 1 BR apartment. Full kitchen + private deck w/ gas BBQ. Available for 1 or 2 adults only. Comfy queen bed. Enjoy stunning views of the beach, ocean & mountain. Shared backyard fire pit. 1 dog welcome, $75 - charged separately once your booking is confirmed and accepted by the host.',
  'A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.',
  'California is known for some of the most beautiful beaches in the world and Pajaro Dunes is no exception. Positioned on the oceanfront, this 3,000+ sq. ft home has one of the most spectacular views along the coastline and is situated on one of the most private stretches of beach in Monterey Bay. ',
  'Come immerse yourself in the serenity of this Pacific Ocean retreat gracefully set in a secluded beach just 25 mins south of San Francisco.'
]

users = [1, 2]

# More users
4.times do |i|
  User.create!({
    username: Faker::Internet.unique.username(specifier: 3),
    email: Faker::Internet.unique.email,
    password: 'password'
  })

  listing = Listing.create!(
    title: titles[i],
    description: descriptions[i],
    host_id: users.sample,
    address: addresses[i],
    latitute: latlon[i][0],
    longitude: latlon[i][1],
    price: rand(100...999),
    num_beds: rand(3...8),
    # rating: 5,
    has_wifi: true,
    has_ac: true
  )

  listing.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p1.png"), filename: "pic1_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p2.png"), filename: "pic2_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p3.png"), filename: "pic3_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p4.png"), filename: "pic4_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p5.png"), filename: "pic5_#{i}.png"},
  ])
end

puts "Creating trips..."
Trip.create!(
  user_id: 1,
  listing_id: 1,
  start_date: Date.new(2022,1,1),
  end_date: Date.new(2022,1,7),
  num_guests: 4,
  total_price: Listing.find(1).price*7,
)

Review.create!(
  trip_id: 1,
  user_id: 1,
  listing_id: 1,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "The host is super nice and showed us around."
)

Trip.create!(
  user_id: 1,
  listing_id: 2,
  start_date: Date.new(2022,1,2),
  end_date: Date.new(2022,1,9),
  num_guests: 3,
  total_price: Listing.find(2).price*7,
)

Review.create!(
  trip_id: 1,
  user_id: 1,
  listing_id: 2,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "I recommend come here again!"
)


Trip.create!(
  user_id: 1,
  listing_id: 3,
  start_date: Date.new(2022,1,3),
  end_date: Date.new(2022,1,10),
  num_guests: 2,
  total_price: Listing.find(3).price*7,
)

Review.create!(
  trip_id: 1,
  user_id: 1,
  listing_id: 3,
  overall: 4,
  cleaniness: 4,
  accuracy: 4,
  communication: 4,
  arrival: 4,
  location: 4,
  content: "The location is not precise, home is not very clean"
)


Trip.create!(
  user_id: 1,
  listing_id: 4,
  start_date: Date.new(2026,1,14),
  end_date: Date.new(2026,1,21),
  num_guests: 2,
  total_price: Listing.find(3).price*7,
)

Trip.create!(
  user_id: 2,
  listing_id: 1,
  start_date: Date.new(2022,1,7),
  end_date: Date.new(2022,1,14),
  num_guests: 6,
  total_price: Listing.find(1).price*7,
)

Review.create!(
  trip_id: 5,
  user_id: 2,
  listing_id: 1,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "would come next time"
)


puts "Done!"
