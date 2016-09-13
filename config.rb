require_relative "./lib/build_cleaner"

###
# Blog settings
###

Time.zone = "Paris"

activate :blog do |blog|
  blog.name = "fr"
  # This adds a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.default_extension = ".md"
  # blog.permalink = "{year}/{month}/{day}/{title}.html"
  blog.sources = "fr/{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "article"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"
  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end
activate :blog do |blog|
  blog.name = "en"
  # This adds a prefix to all links, template references and source paths
  blog.prefix = ""
  blog.default_extension = ".md"
  blog.permalink = "en/blog/{year}/{month}/{day}/{title}.html"
  blog.sources = "blog/en/{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "article"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  blog.year_link = "en/blog/{year}.html"
  blog.month_link = "en/blog/{year}/{month}.html"
  blog.day_link = "en/blog/{year}/{month}/{day}.html"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"
  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

###
# Page options, layouts, aliases and proxies
###

page "/404.html", :directory_index => false
page "/google33e00909822f176c.html", :directory_index => false
# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end
page "/sitemap.xml", layout: false, :directory_index => false
page "/feed.xml", layout: false, :directory_index => false
page "en/feed.xml", layout: false, :directory_index => false

# Localization
activate :i18n, :path => "/:locale/", :mount_at_root => :fr

# Nice URLs
activate :directory_indexes

###
# Helpers
###
helpers do
  def i18n_path(path)
    if I18n.locale != I18n.default_locale
      return "/"+I18n.locale.to_s+path
    end
    return path
  end
  def is_home?
    (I18n.locale == I18n.default_locale) && current_page.url=='/'\
    or\
    current_page.url=="/#{I18n.locale.to_s}/"
  end
  def current_locale?(locale)
    return locale == nil || I18n.locale.to_s == locale
  end
  def alt_locale()
    return (I18n.locale == I18n.default_locale) ? "en" : "fr"
  end
  def switch_locale(locale)
    localized = ""
    if (locale=='en' && !current_page.url.start_with?("/en/"))
      localized = "/en#{current_page.url}"
    elsif (locale=='fr' && current_page.url.start_with?("/en/"))
      localized = current_page.url.sub(/^\/en/, '')
    end
    # return the localized page if found in the sitemap
    if (sitemap.find_resource_by_destination_path(localized+"index.html"))
      return localized
    else
      return (locale == 'en') ? "/en/" : "/"
    end
  end
  def base_url
    data.info.url + "#{"/en/" if I18n.locale != I18n.default_locale}"
  end
  def encode_t(string)
    Addressable::URI.encode_component(t(string), Addressable::URI::CharacterClasses::UNRESERVED)
  end

end


# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

# Post-process CSS with vendor prefixes
activate :autoprefixer do |config|
  config.browsers = ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Explorer 7", "Firefox 3.6"]
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# set :relative_links, true

# Build-specific configuration
configure :build do
  # Clean the build directory
  activate :build_cleaner

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # GZip
  activate :gzip

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :deploy do |deploy|
  # set :skip_build_clean do |path|
  #   path =~ /\.git/
  # end
  deploy.method = :git
  deploy.branch = 'master'
end
