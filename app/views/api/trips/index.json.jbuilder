json.trips do
  @trips.each do |t|
    json.set! t.id do
      json.extract! t, :id, :user_id, :listing_id, :start_date, :end_date, :total_price
    end
  end
end

json.listings do
  @listings.each do |l|
    json.set! l.id do
      json.extract! l, :id, :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :has_wifi, :has_ac
      json.photo_urls l.photos.map {|p| p.url}
    end
  end
end
