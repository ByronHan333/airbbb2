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
  'San Francisco, California',
  'Sausalito, California',
  'San Mateo, California',
  'Millbrae, California',
  'Burlingame, California',
  'Brisbane, California',
  'Daly City, California',
  'Pacifica, California'
]

titles = [
  'Ocean Mountain View Home - Walk to Trails Beach',
  'Private Luxury Cabin on Tumalo Lake near town',
  'White Heart Lodge of Ennis MT',
  'Hansel Creek Gust Tree House On 150 Acres',
  'Views ~ ATV~Kayaks/Bikes ~ Theatre ~ Hot Tub/Sauna',
  'Tiny House With Mountain View Stay, North Bend, WA',
  'Dome Sweet Dome: An OMG! Experience',
  'SummerCamp Home w/Creek 8 mi- Mt Rainier Natl Park',
  'Calowahcan Cabin',
  'Elk Cabin - Fish the Beautiful Yellowstone River'
]

descriptions = [
  'Georgeous apartment unit with modern styling. Great views of the city and gets plenty of sunlight all year round.',
  'A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.',
  'This rustic yet luxurious cabin is the perfect place to unplug. Walk through the woods, relax by a fire, and enjoy the food and wine of the Russian River Valley.',
  'Romantic retreat!  Wake up to bird song through the skylights, lounge on the deck under the redwoods with a cup of coffee, luxuriate in the oversized bathtub with candles, and cozy up in front of the wood fireplace.',
  'This unique beach house is one block from Twin Lakes beach, the finest one in Santa Cruz! It is a 2-story, designer home with an open floorplan, gridwork of glass to allow in plenty of light and offers ocean peeks.',
  'RIVERFRONT dog friendly 1.5 acre oasis on the Russian River. The property is private, lush, serene & sunny. The backyard is a quarter mile long stretch of beach.',
  'Modern and spacious with glass enclosed porch, high ceilings and lots of French doors, skylights and windows.',
  'We just added a desk to one of the bedrooms at Lucky Bend Lookout, our Mid-century modern home on the Russian River. Kid friendly, in a quiet redwood forest, and just 1 mile from Downtown Guerneville.',
  'This cozy studio cottage (lovingly called the Writer Cottage) at Stemple Creek Ranch in West Marin is a sweet retreat.',
  'Our little cabin in the woods is the perfect, secluded Russian River getaway!',
  'Bay Tree Cottage is a bright, delightful home, recently remodeled and redecorated.  Enjoy staying in the most ideal location.',
  'Escape to the Country! Stay in our cozy cabin.A romantic getaway or a family trip.',
  'Ocean & Mountain View Getaway - Walk to Recreation Open Space Parks, Beaches, Activities, Restaurants.'
]

users = [1, 2]

# More users
10.times do |i|
  User.create!({
    username: Faker::Internet.unique.username(specifier: 3),
    email: Faker::Internet.unique.email,
    password: 'password'
  })

  listing = Listing.create!(
    title: titles[i],
    description: descriptions[i],
    host_id: users.sample,
    address: addresses.sample,
    latitute: 37+rand(66..90)/100.0, #0.66 - 0.90
    longitude: -122-rand(24..44)/100.0, #0.24 - 0.44
    price: rand(100...999),
    num_beds: rand(2...8),
    has_wifi: true,
    has_ac: true
  )

  listing.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p1/p1.png"), filename: "pic1_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p1/p2.png"), filename: "pic2_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p1/p3.png"), filename: "pic3_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p1/p4.png"), filename: "pic4_#{i}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p1/p5.png"), filename: "pic5_#{i}.png"},
  ])
end

puts "Creating trips..."
Trip.create!(
  user_id: 1,
  listing_id: 1,
  start_date: Date.new(2022,1,1),
  end_date: Date.new(2022,1,7),
  total_price: Listing.find(1).price*7,
)

Trip.create!(
  user_id: 1,
  listing_id: 2,
  start_date: Date.new(2022,1,7),
  end_date: Date.new(2022,1,14),
  total_price: Listing.find(2).price*7,
)

Trip.create!(
  user_id: 1,
  listing_id: 3,
  start_date: Date.new(2022,1,14),
  end_date: Date.new(2022,1,21),
  total_price: Listing.find(3).price*7,
)

Trip.create!(
  user_id: 2,
  listing_id: 1,
  start_date: Date.new(2022,1,7),
  end_date: Date.new(2022,1,14),
  total_price: Listing.find(1).price*7,
)

puts "Done!"
