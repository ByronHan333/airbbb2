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

  users = [1, 2]

  # More users
  10.times do |i|
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })

    listing = Listing.create!(
      title: Faker::Company.unique.bs.chars.take(25).join(''),
      description: 'description test',
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
      {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic2.png"), filename: "pic2.png"},
      {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/pic1.png"), filename: "pic1.png"}
    ])
  end

  puts "Done!"
end
