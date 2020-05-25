#!/bin/bash

# Initialize variables:
default_username="changethisdefaultusernameplease"
default_password="changethisdefaultpasswordplease"
docker_database_password="changethisdefaultdockerdatabasepasswordplease"
db_directory="run/var"

# Test variables are present that will be used later in the script:
if [ -z ${default_username} ]; then
    echo -e "ERROR: shell script variable 'default_username' is empty."
    exit
fi

if [ -z ${default_password} ]; then
    echo -e "ERROR: shell script variable 'default_password' is empty."
    exit
fi

if [ -z ${docker_database_password} ]; then
    echo -e "ERROR: shell script variable 'docker_database_password' is empty."
    exit
fi

if [ -z ${db_directory} ]; then
    echo -e "ERROR: shell script variable 'db_directory' is empty."
    exit
fi

# Create a boilerplate .env file.
if [[ ! -f .env ]]; then
  echo -e "STEP: creating .env file"

  cp -v .env.example .env

  sed -i 's/DB_HOST=.*/DB_HOST=mysql-db/' .env
  sed -i 's/DB_DATABASE=.*/DB_DATABASE=molveno/' .env
  sed -i "s/DB_USERNAME=.*/DB_USERNAME=${default_username}/" .env
  sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=${default_password}/" .env
  sed -i "s/DB_ROOT_PASSWORD_FOR_DOCKER=.*/DB_ROOT_PASSWORD_FOR_DOCKER=${docker_database_password}/" .env

  echo -e "UID=${UID}" >> .env

  echo -e "WARNING: Please change the default passwords in the .env file."
  echo -e "WARNING: Then run the script again."
  exit
fi

# If the db_directory exists, remove it, return a error message and exit if removal fails.
if [ -d ${db_directory} ]; then
        echo -e "\nSTEP: Remove database directory"
        rm -rfv ${db_directory}
    elif [ -d ${db_directory} ]; then
        echo -e "\nSTEP: Remove database directory with sudo"
        sudo rm -rfv ${db_directory}
    elif [ -d ${db_directory} ]; then
        echo -e "\nERROR: Could not delete the database directory, exiting script."
        echo -e "INFO: Please delete the ${db_directory} directory manually."
        exit
fi

echo -e "\nSTEP: clean up previous docker-compose containers"
docker-compose down

echo -e "\nSTEP: docker-compose build/up"
docker-compose build && docker-compose up -d

echo -e "\nSTEP: execute composer install"
docker exec laravel-app bash -c "composer install"

echo -e "\nSTEP: execute artisan key:generate"
docker exec laravel-app bash -c "php artisan key:generate"

# sleep for 5 seconds before seeding the database
echo -e "\nSTEP: sleep for 5 seconds"
sleep 5

echo -e "\nSTEP: execute artisan migrate:fresh and seed the database"
docker exec laravel-app bash -c "php artisan migrate:fresh --seed"
