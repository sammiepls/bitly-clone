require 'securerandom'

class Url < ActiveRecord::Base
  before_create :shorten
  validates :ori_url, presence: true

	def shorten
    self.short_url = SecureRandom.hex(5)
  end
end
