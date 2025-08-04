#!/bin/bash

# Wait for database to be ready
until mysqladmin ping -h db -u root -p"$MYSQL_ROOT_PASSWORD" --silent; do
  echo "Waiting for database connection..."
  sleep 2
done

# Run migrations
python3 manage.py migrate

# Start server
python3 manage.py runserver 0.0.0.0:8000