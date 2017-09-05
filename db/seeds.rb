require_relative '../app/models/url'
require "activerecord-import/base"
  ActiveRecord::Import.require_adapter('mysql2')

  # Url.transaction do
#     values = File.read("urls")
#     values = values.tr("();\n",'').split(",").each do |x|
#         url = Url.new(ori_url:x.strip)
#         url.save
#       end
#   end


data_string = "INSERT INTO urls (ori_url,short_url,click_count) VALUES "
values = File.read("urls")
values = values.tr("();\n",'').split(",").each do |x|
         data_string << "('" + x.strip + "','" + SecureRandom.hex(7) + "','" + "0'),"
       end
data_string.chomp!(",")
data_string << ";"
Url.connection.execute(data_string)
