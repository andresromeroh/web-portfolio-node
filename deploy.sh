clear

echo 'Stopping running container...'
docker stop web-portfolio-backend

echo 'Removing stopped container...'
docker rm --force web-portfolio-backend

echo 'Removing unused images if any...'
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

echo 'Building image from Dockerfile...'
docker build -t andresromeroh/web-portfolio-backend .

echo 'Creating new container...'
docker run \
-e PORT='PORT' \
-e GITHUB_ACCESS_TOKEN='TOKEN' \
-e GITHUB_API_URL='URL' \
-e SENDGRID_AUTH_TOKEN='PORT' \
-e REDIS_HOST='HOST' \
-e REDIS_PORT='PORT' \
-e REDIS_PASSWORD='PASSWORD' \
-e ACCLAIM_PROFILE_URL='URL' \
-e ACCLAIM_BADGE_URL='URL' \
--name web-portfolio-backend -p PORT:DOCKER_PORT -d andresromeroh/web-portfolio-backend

echo 'Application has been deployed!'
