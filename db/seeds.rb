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
Review.destroy_all
Trip.destroy_all
Listing.destroy_all
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('reviews')
ApplicationRecord.connection.reset_pk_sequence!('trips')
ApplicationRecord.connection.reset_pk_sequence!('listings')
ApplicationRecord.connection.reset_pk_sequence!('users')

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
  'Alameda, California',
  'Burlingame, California',
  'Foster City, California',
  'Newwark, California',
  'Oakland, California',
  'San Francisco, California',
  'Sausalito, California',
  'Berkeley, California',
  'Alameda, California',
  'Daly City, California',
  'Eastport, California',
  'Sausalito, California',
  'San Francisco, California',
  'Tiburon, California',
  'Oakland, California',
  'San Mateo, California',
  'San Francisco, California'
]

latlon = [
  [37.614694, -122.496388],
  [37.674905, -122.405720],
  [36.606411, -121.950079],
  [37.467001, -122.441354],
  [37.732314, -122.384082],
  [37.674759, -122.153825],
  [37.731792, -122.231942],
  [37.892517, -122.513094],
  [37.864260, -122.289569],
  [37.910430, -122.359421],
  [37.908363, -122.479041],
  [37.804265, -122.419667],
  [37.775079, -122.283738],
  [37.689242, -122.495093],
  [37.845783, -122.187580],
  [37.838264, -122.542696],
  [37.734056, -122.461295],
  [37.882988, -122.458439],
  [37.816833, -122.289450],
  [37.568601, -122.318012],
  [37.768306, -122.506042]
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
  'Oceanfront Boho Retreat - Pacific Sunset Views',
  'Ideally Located San Francisco Bay Home',
  'Among The Stars Tiny home with views',
  'Beach Front Vacation Home',
  'The Lonsdale Cabin is on a quiet ranch',
  'The Alpaca (A Lone Juniper Ranch Cabin)',
  'Studio Cottage',
  'Paradise in the Hills of Wine Country',
  'Best Reno River Suite',
  'Private Castle Accommodation',
  'Fairy Tale Castle On 2000-acre Estate by the sea'
]

descriptions = [
  'Feel at home on the beach...La Sirena is a bright and clean 1 BR apartment. Full kitchen + private deck w/ gas BBQ. Available for 1 or 2 adults only. Comfy queen bed. Enjoy stunning views of the beach, ocean & mountain. Shared backyard fire pit. 1 dog welcome, $75 - charged separately once your booking is confirmed and accepted by the host.',
  'A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.',
  'California is known for some of the most beautiful beaches in the world and Pajaro Dunes is no exception. Positioned on the oceanfront, this 3,000+ sq. ft home has one of the most spectacular views along the coastline and is situated on one of the most private stretches of beach in Monterey Bay. ',
  'Come immerse yourself in the serenity of this Pacific Ocean retreat gracefully set in a secluded beach just 25 mins south of San Francisco.',
  'Fisherman’s Wharf or taking a tour of Alcatraz Island in no time. Spend a leisurely day relaxing at a nearby vineyard or exploring Spirits Alley before returning home to cook dinner in the modern fully-equipped kitchen!',
  'Welcome to our beach house for the Ultimate Pacific Coast Surf Experience. Perched atop a cliff overlooking the Pacific approximately 4 miles north of Bodega Bay. The photos will depict views from the actual property and the beautiful coastal inspired interior.',
  'My exceptionally beautiful, welcoming home with a breathtaking close-up ocean view provides a perfect spot for your romantic getaway, artist retreat or  small family gathering. Come sit in the garden and watch the waves roll in or sit in the hot tub in the moonlight.',
  'Monterey Bay ocean views overlooking Rio del Mar beach and the renowned SS Palo Alto “cement ship.” Swing in the hanging rope hammock chairs with your sunglasses on while basking in the warmth of the afternoon sun..',
  'Perched right on the bluff and with AMAZING views of the waves rolling in down the full length of Dillon Beach, stepping inside of Sea Glass will absolutely take your breath away!',
  'Walking access to the best State Beaches in the area, award winning restaurants, the Half Moon Bay Harbor, Hiking & Biking along the California Coastal Trail, Family activities in the area and so much more.',
  'Remodeled oceanfront home with sweeping Pacific views and whale watching! Ultra clean and comfortable. The perfect cozy boho getaway for couples, families and travelers.',
  'Boasting waterfront views and a bright sunroom, this 2-bedroom, 2-bathroom Alameda vacation rental invites you to experience the best of the Bay area! Sitting less than 20 miles from top attractions, this townhome will have you out the door and grabbing a bite of clam chowder at Fisherman’s Wharf or taking a tour of Alcatraz Island in no time.',
  'This home is not elderly friendly, as you have to climb stairs to get into the lofts to sleep. It is mostly geared towards those guests seeking to explore all the area has to offer with a fun and memorable place to recharge.',
  'Welcome to Chez Mondo, a bright and airy, stylish family home on the longest stretch of sandy beach. Stairs on the deck lead down to the south end of Mondos Cove where you can surf, boogie board or just play in the ocean. This house will not only give you a peaceful getaway but also the opportunity to discover the charming stores in downtown Ventura nearby.',
  'The Lonsdale cabin is located in picturesque Sierra Meadows Ranch just on the edge of town in Mammoth Lakes, CA. The cabin sleeps up to 4 people. The cabin has a back bedroom with a queen-sized bed and a queen sofa bed in the living room. It is well-appointed with stainless steel appliances in the kitchen and has a full bathroom with a tub and shower.',
  'The Most Amazing mountain cabin retreat on a Camelid Ranch! Enjoy the llama and Alpaca right by your window and pet them from your private fenced patio! The private, 100 + acres, mountain-top experience offers a 360-degree view of beautiful Southern California scenery. Ideal for star gazing & hiking, miles of trail access. Amazing sunrises/sunsets.',
  'This is a small Studio cottage at the rear of my home.  It craftsmanesk in style with a partially open ceiling and a skylight. Its perfect for a couple or single person.  There is a swimming pool but its not heated, fine for swimming June to Oct depending on the weather, unless you are a polar bear.',
  'Peaceful, secluded wooded retreat in the hills of wine country. but close to the area beautiful beaches.  Perfect for larger family groups and small groups alike.  Enjoy a glass of wine on one of the numerous decks and patios under the trees, then relax in the evening in the hot tub overlooking a beautiful glade.',
  'Most luxurious Stearns & Foster Queen-sized bed & plush linens. Air conditioning & heating comfort. Hair dryer, clothes iron, and fresh towels provided',
  'Kilcolgan Castle offers guests privacy and advice on touring the area if wanted. Close to the Burren, Connemara, Aran Islands and Cliffs of Moher for day trips. Short drive to Galway City. Homely atmosphere where you have full use of our spacious kitchen and all rooms but ours.',
  'Bring alive fairytales in this Edwardian castle at the heart of private 2000 acres of glen walks, forests, 3 beaches, 2 lochs, walled and woodland gardens, maze, and 2 waterfalls. Comes with a stately reception rooms, 25 bedrooms and bathrooms, with luxurious amenities and a dedicated team. An award-winning, all-inclusive catering program is available. We host exclusive use and private events for up to 90 guests.'
]

users = [1, 2]

# More users

21.times do |i|
  listing = Listing.create!(
    title: titles[i],
    description: descriptions[i],
    host_id: users.sample,
    address: addresses[i],
    latitute: latlon[i][0],
    longitude: latlon[i][1],
    price: rand(100...999),
    num_beds: rand(3...8),
    rating: 5,
    has_wifi: true,
    has_ac: true
  )

  listing.photos.attach([
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p0.png"), filename: "#{descriptions[i]}_#{0}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p1.png"), filename: "#{descriptions[i]}_#{1}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p2.png"), filename: "#{descriptions[i]}_#{2}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p3.png"), filename: "#{descriptions[i]}_#{3}.png"},
    {io: URI.open("https://airbbb-seeds.s3.us-west-1.amazonaws.com/p#{i}/p4.png"), filename: "#{descriptions[i]}_#{4}.png"},
  ])
end

puts "Creating trips..."
## user1 trips
trip = Trip.create!(
  user_id: user1.id,
  listing_id: 1,
  start_date: Date.new(2022,1,16),
  end_date: Date.new(2022,1,23),
  num_guests: 4,
  total_price: Listing.find(1).price*7,
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 1,
  start_date: Date.new(2022,3,16),
  end_date: Date.new(2022,3,23),
  num_guests: 4,
  total_price: Listing.find(1).price*7,
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 1,
  start_date: Date.new(2022,1,1),
  end_date: Date.new(2022,1,7),
  num_guests: 4,
  total_price: Listing.find(1).price*7,
)

Review.create!(
  trip_id: trip.id,
  user_id: user1.id,
  listing_id: 1,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "The host is super nice and showed us around."
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 2,
  start_date: Date.new(2022,1,2),
  end_date: Date.new(2022,1,9),
  num_guests: 3,
  total_price: Listing.find(2).price*7,
)

Review.create!(
  trip_id: trip.id,
  user_id: user1.id,
  listing_id: 2,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "I recommend come here again!"
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 3,
  start_date: Date.new(2022,1,3),
  end_date: Date.new(2022,1,10),
  num_guests: 2,
  total_price: Listing.find(3).price*7,
)

Review.create!(
  trip_id: trip.id,
  user_id: user1.id,
  listing_id: 3,
  overall: 4,
  cleaniness: 4,
  accuracy: 4,
  communication: 4,
  arrival: 4,
  location: 4,
  content: "The location is not precise, home is not very clean"
)


trip = Trip.create!(
  user_id: user1.id,
  listing_id: 4,
  start_date: Date.new(2026,1,14),
  end_date: Date.new(2026,1,21),
  num_guests: 2,
  total_price: Listing.find(4).price*7,
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 4,
  start_date: Date.new(2021,1,14),
  end_date: Date.new(2021,1,21),
  num_guests: 2,
  total_price: Listing.find(4).price*7,
)

trip = Trip.create!(
  user_id: user1.id,
  listing_id: 2,
  start_date: Date.new(2022,1,14),
  end_date: Date.new(2022,1,21),
  num_guests: 2,
  total_price: Listing.find(2).price*7,
)

21.times do |i|
  trip = Trip.create!(
    user_id: user1.id,
    listing_id: i+1,
    start_date: Date.new(2021,11,8),
    end_date: Date.new(2021,11,15),
    num_guests: 3,
    total_price: Listing.find(i+1).price*7,
  )

  Review.create!(
    trip_id: trip.id,
    user_id: user1.id,
    listing_id: i+1,
    overall: 5,
    cleaniness: 5,
    accuracy: 5,
    communication: 5,
    arrival: 5,
    location: 5,
    content: "AirBbB founder #{i+1}th trip, trying everywhere"
  )
end


# user2 trips
trip = Trip.create!(
  user_id: user2.id,
  listing_id: 1,
  start_date: Date.new(2022,1,7),
  end_date: Date.new(2022,1,14),
  num_guests: 6,
  total_price: Listing.find(1).price*7,
)

Review.create!(
  trip_id: trip.id,
  user_id: user2.id,
  listing_id: 1,
  overall: 5,
  cleaniness: 5,
  accuracy: 5,
  communication: 5,
  arrival: 5,
  location: 5,
  content: "would come next time"
)

21.times do |i|
  trip = Trip.create!(
    user_id: user2.id,
    listing_id: i+1,
    start_date: Date.new(2022,1,7),
    end_date: Date.new(2022,1,14),
    num_guests: 6,
    total_price: Listing.find(i+1).price*7,
  )

  Review.create!(
    trip_id: trip.id,
    user_id: user2.id,
    listing_id: i+1,
    overall: 5,
    cleaniness: 5,
    accuracy: 5,
    communication: 5,
    arrival: 5,
    location: 5,
    content: "my #{i+1}th trip, feels good"
  )

  trip = Trip.create!(
    user_id: user2.id,
    listing_id: i+1,
    start_date: Date.new(2022,5,7),
    end_date: Date.new(2022,5,14),
    num_guests: 2,
    total_price: Listing.find(i+1).price*7,
  )

  Review.create!(
    trip_id: trip.id,
    user_id: user2.id,
    listing_id: i+1,
    overall: 4,
    cleaniness: 4,
    accuracy: 4,
    communication: 4,
    arrival: 4,
    location: 4,
    content: "2nd time here, no improvement"
  )
end


puts "Done!"
