require 'init'
require 'sass/plugin/rack'
use Sass::Plugin::Rack

Sass::Plugin.options[:never_update] = true


 


run Sinatra::Application