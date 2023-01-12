class Api::TripsController < ApplicationController
  before_action :require_logged_in, only: [:index, :create, :update, :destroy]
  before_action :set_trip, only: [:show, :update, :update, :destroy]

  def index
    @trips = current_user.trips
    @listings = current_user.trip_listings
    render :index
  end

  def create
    @trip = Trip.new(trip_params)

    if @trip.save
      render json: @trip
    else
      render json: @trip.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @listing = @trip.listing
    render :show
  end

  def update
    if @trip.update(tript_params)
      render json: @trip
    else
      render json: @trip.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @trip.destroy
    head :no_content
  end

  private
  def set_trip
    @trip = Trip.find(params[:id])
  rescue
    render json: ['Trip not found'], status: :not_found
  end

  def trip_params
    params.require(:trip).permit(:user_id, :listing_id, :start_date, :end_date, :total_price)
  end
end
