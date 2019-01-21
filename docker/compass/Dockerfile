FROM ruby

ADD Gemfile.lock .
ADD Gemfile .

RUN bundle install

VOLUME /src

WORKDIR /src

ENTRYPOINT [ "compass" ]

