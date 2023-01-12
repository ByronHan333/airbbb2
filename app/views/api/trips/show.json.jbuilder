json.trips do
  json.set! @trip.id do
    json.extract! @trip, :id, :user_id, :listing_id, :start_date, :end_date, :total_price
  end
end

json.listings do
  json.set! @listing.id do
    json.extract! @listing, :id, :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :has_wifi, :has_ac
    json.photo_urls @listing.photos.map {|p| p.url}
  end
end
