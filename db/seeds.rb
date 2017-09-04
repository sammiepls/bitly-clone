require_relative '../app/models/url'
require 'byebug'

Url.transaction do
    values = File.read("urls")
    # values = "(http://example.com/205f73f5524708814c220e24f0),
    # (http://example.com/67428fc65b66f7c27a3e9b55db),
    # (http://example.com/a8e3b671c50b732ce8f64f52a4),
    # (http://example.com/ea734b1bbb3c2d6ecdbe1e2223),
    # (http://example.com/0b1e436875cf1c6bb187019e39)"

    values = values.tr("();\n",'').split(",").each do |x|
        url = Url.new(ori_url:x.strip)
        url.save
      end
    #  Url.connection.execute "INSERT INTO urls (ori_url) VALUES #{values}"
  end
