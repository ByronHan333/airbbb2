# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')

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
  listing1 = Listing.create!(
    title: 'San Francisco, Califoria',
    description: 'top destination',
    host_id: 1,
    address: 'address',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 1000,
    num_beds: 4,
    has_wifi: true,
    has_ac: true
  )

  listing1.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  listing2 = Listing.create!(
    title: 'Sonoma, California',
    description: 'description 2',
    host_id: 1,
    address: 'address 2',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 2000,
    num_beds: 6,
    has_wifi: true,
    has_ac: true
  )

  listing2.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  listing3 = Listing.create!(
    title: 'San Martin, California',
    description: 'description 3',
    host_id: 1,
    address: 'address 2',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 2000,
    num_beds: 6,
    has_wifi: true,
    has_ac: true
  )

  listing3.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  listing4 = Listing.create!(
    title: 'Petaluma, California',
    description: 'description 4',
    host_id: 1,
    address: 'address 2',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 2000,
    num_beds: 6,
    has_wifi: true,
    has_ac: true
  )

  listing4.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  listing5 = Listing.create!(
    title: 'Orinda, California',
    description: 'description 5',
    host_id: 2,
    address: 'address 2',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 2000,
    num_beds: 6,
    has_wifi: true,
    has_ac: true
  )

  listing5.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  listing6 = Listing.create!(
    title: 'San Mateo, California',
    description: 'description 6',
    host_id: 2,
    address: 'address 2',
    latitute: 37.773972,
    longitude: -122.431297,
    price: 2000,
    num_beds: 6,
    has_wifi: true,
    has_ac: true
  )

  listing6.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
  ])

  # More users
  10.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })
  end

  puts "Done!"
end
