class Api::ListingsController < ApplicationController
  before_action :set_listing, only: [:show]

  def index
    @listings = Listing.all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  private
  def set_listing
    @listing = Listing.find(params[:id])
  rescue
    render json: ['Listing not found'], status: :not_found
  end
end
