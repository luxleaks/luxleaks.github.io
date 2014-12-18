Antoine Deltour's support committee
===================================

## About

Antoine Deltour is the chief whistleblower in the Luxleaks 1, which has recently revealed a huge system of tax-saving maneuvers created by dozens of big international companies. At present he is being sued by the Luxembourg justice.

This repository contains the source of the web site for Antoine's support committee.

## Main branches

 * Branch `master` contains the static HTML served by GitHub Pages.
 * Branch `source` contains the source files used to build the suite (with [Middleman](http://middlemanapp.com/))

## How to build

To build the site, you need a recent Ruby version (Ruby 2.1 is used for deployment), with the [Bundler](http://bundler.io/) gem. You then need to fetch the site's dependencies with:

```
bundle install
```

To build the site locally:

```
bundle exec middleman build
```

Then, to deploy to GitHub Pages:

```
bundle exec middleman deploy
```

## Preview the site locally

To work on the site locally, the easiest way is to serve the site using Middleman's built-in command, invoked via Builder:

```
bundle exec middleman server
```
