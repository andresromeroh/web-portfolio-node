clear

echo 'Stopping running container...'
docker stop web-portfolio-backend

echo 'Removing stopped container...'
docker rm --force web-portfolio-backend

echo 'Removing unused images...'
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

clear

echo 'Building image from Dockerfile...'
docker build -t andresromeroh/web-portfolio-backend .

clear

echo 'Creating new container...'
docker run --name web-portfolio-backend -p 5000:5000 -d andresromeroh/web-portfolio-backend