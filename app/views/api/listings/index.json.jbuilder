json.listings do
  @listings.each do |l|
    json.set! l.id do
      json.extract! l, :id, :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :has_wifi, :has_ac
      json.photo_urls l.photos.map {|p| p.url}
    end

  end
end
