provider "heroku" {
  version = "~> 2.0"
}

resource "heroku_app" "appvalon" {
  name   = "appvalon"
  stack  = "container"
  region = "us"
}

resource "heroku_build" "appvalon" {
  app = "${heroku_app.appvalon.id}"
  source = {
    # A local directory, changing its contents will
    # force a new build during `terraform apply`
    path = "./"
  }


}
