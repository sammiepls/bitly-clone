class Url < ActiveRecord::Base
	def shorten
    self.SecureRandom.hex(10)
  end
end
