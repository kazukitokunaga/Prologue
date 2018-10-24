FROM ruby:2.4.2

ENV RUBYOPT -EUTF-8

RUN apt-get update -qq
RUN apt-get install -y build-essential libpq-dev

RUN apt-get update \
 && apt-get install -y apt-transport-https \
 && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
 && apt-get install -y nodejs \
 && apt-get install -y vim \
 && apt remove cmdtest \
 && apt-get install -y postgresql-client

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install
RUN bundle update

ENV app /var/www/app
WORKDIR $app
ADD . $app