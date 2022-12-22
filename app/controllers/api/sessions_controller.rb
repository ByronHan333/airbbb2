class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json:{user: nil}
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: ['The provided credentials were invalid.']}, status: unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: {message: 'success'}
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :credential, :password)
  end
end
