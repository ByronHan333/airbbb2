json.listings do
  json.set! @listing.id do
    json.extract! @listing, :id, :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :has_wifi, :has_ac
    json.photo_urls @listing.photos.map {|p| p.url}
  end
end
