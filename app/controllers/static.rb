get '/' do
  @url = Url.all.limit(50000)
  erb :"static/index"
end

post '/urls' do
  url = Url.new(ori_url:params[:ori_url])
  if url.save
    { success: true, message: url }.to_json
    # url.to_json
  else
    { success: false, message: url.errors.messages }.to_json
    # ==Non-Ajax ==
    # @url = Url.all
    #@errors = url.errors.messages[:url].join.capitalize + " " + url.errors.messages[:ori_url].join.capitalize
    # erb :"static/index"
  end
end

get '/:short_url' do
  url = Url.find_by(short_url:params["short_url"])
  url.click_count += 1
  url.save
  { success: true, message: url }.to_json

  # == Non-Ajax ==
  # url = Url.find_by(short_url:params["short_url"])
  # url.click_count += 1
  # url.save
  # redirect "#{url.ori_url}"
end
