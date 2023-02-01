class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:index, :create, :update, :destroy]
  before_action :set_listing, only: [:show]
  before_action :set_review, only: [:update, :destroy]

  def index
    @reviews = current_user.reviews
    @listings = current_user.trip_listings
    @trips = current_user.trips
    render :index
  end

  def create
    @review = Review.new(review_params)
    puts @review
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @reviews = @listing.reviews
    render :show
  end

  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    head :no_content
  end

  private
  def set_listing
    @listing = Listing.find(params[:id])
  rescue
    render json: ['Listing not found'], status: :not_found
  end

  def set_review
    @review = Review.find(params[:id])
  rescue
    render json: ['Review not found'], status: :not_found
  end

  def review_params
    params.require(:review).permit(:trip_id, :user_id, :listing_id, :overall, :cleaniness, :accuracy, :communication, :arrival, :location, :content)
  end
end
