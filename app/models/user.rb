# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username,
    presence: true,
    uniqueness: true,
    length: {in: 3..30},
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email,
    presence: true,
    uniqueness: true,
    length: {in: 3..255},
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: {in: 6..255}, allow_nil: true

  has_many :listings,
  class_name: :Listing,
  foreign_key: :host_id,
  dependent: :destroy

  has_many :trips
  has_many :trip_listings, through: :trips, source: :listing

  has_secure_password

  attr_reader :password
  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    # determine the field you need to query:
    #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
    #   * `username` if not
    # find the user whose email/username is equal to `credential`
    if credential.match(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    # if no such user exists, return a falsey value
    # if a matching user exists, use `authenticate` to check the provided password
    # return the user if the password is correct, otherwise return a falsey value
    if user&.authenticate(password)
      return user
    else
      return nil
    end
  end

  def password=(password)
    # .create and .new implicitly calls this setter
    # since we pass password but there is no column for password
    # we need this setter
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    # we write new because we want to create object to have access to BCrypt library
    bcrypt_object = BCrypt::Password.new(self.password_digest)
    # calls bcrypt method to check if it matches
    bcrypt_object.is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64(16)
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64(16)
    end
    token
  end
end
