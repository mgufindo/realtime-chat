FROM ruby:3.2.2

WORKDIR /app

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Install bundler
RUN gem install bundler -v 2.4.10

# Copy Gemfile
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

# Precompile assets (if any)
RUN bundle exec rails assets:precompile

# Expose port
EXPOSE 3000

# Start the server
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3000"]