clear
docker build -t andresromeroh/web-portfolio-backend .
docker run --name web-portfolio-backend -p 5000:5000 -d andresromeroh/web-portfolio-backend