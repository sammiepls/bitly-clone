class AddShortUrlIndexToUrls < ActiveRecord::Migration[5.0]
	def change
    add_index :urls, :short_url, :unique => true
	end
end
