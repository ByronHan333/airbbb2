json.listings do
  @listings.each do |p|
    json.set! p.id do
      json.extract! p, :id, :title, :description, :host_id, :address, :latitute, :longitude, :price, :num_beds, :has_wifi, :has_ac
    end
  end
end
