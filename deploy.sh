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
-e PORT='5000' \
-e GITHUB_ACCESS_TOKEN='4960ee26f77ddeba995301fbb159ba7ca5c0e3e7' \
-e GITHUB_API_URL='https://api.github.com/users/ANDRESROMEROH' \
--name web-portfolio-backend -p 5000:5000 -d andresromeroh/web-portfolio-backend

echo 'Done!'
echo 'http://192.168.1.205:5000/api/v1/health'
