class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.all
    render 'api/listings/index'
  end
end
