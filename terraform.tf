provider "heroku" {
  version = "~> 2.0"
}

resource "heroku_app" "appvalon" {
  name   = "appvalon"
  region = "us"
}
