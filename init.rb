require 'rubygems'
require 'sinatra'
require 'haml'
require 'ninesixty'
require 'json'
require 'excelsior'

get '/' do
 haml :index,{:layout => :homeLayout}
end

get '/page' do
 haml :index,{:layout => :pageLayout}
end
 

def render_file(filename)
  contents = File.read('views/'+filename+'.haml')
  Haml::Engine.new(contents).render
end