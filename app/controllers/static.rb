get '/' do
  @url = Url.all
  erb :"static/index"
end

post '/urls' do
  url = Url.new(ori_url:params[:ori_url])
  if url.save
    p "#{url.short_url}"
    url.to_json
  else
    @url = Url.all
    @errors = url.errors.messages[:url].join.capitalize + " " + url.errors.messages[:ori_url].join.capitalize
    erb :"static/index"
  end
end

# i.e. /q6bdaams[
get '/:short_url' do
  # redirect to appropriate "long" URL
  url = Url.find_by(short_url:params["short_url"])

  url.click_count += 1
  url.save
  redirect "#{url.ori_url}"
end
