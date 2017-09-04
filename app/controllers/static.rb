get '/' do
  erb :"static/index"
end

post '/urls' do
  url = Url.new(ori_url:params[:ori_url])
  if url.save
    p "#{url.short_url}"
    @url = Url.find(id)
  else
    render "static/index"
  end
end

# i.e. /q6bda
get '/:short_url' do
  # redirect to appropriate "long" URL
  url = Url.find_by(params[:short_url])
  redirect url.ori_url
end
