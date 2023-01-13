json.reviews do
  @reviews.each do |r|
    json.set! r.id do
      json.extract! r, :id,  :trip_id, :user_id, :listing_id, :overall, :cleaniness, :accuracy, :communication, :arrival, :location, :content
    end
  end
end
