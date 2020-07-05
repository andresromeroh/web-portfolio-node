#Grab the latest NodeJS image
FROM node:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose application port
EXPOSE 5000

# Build typescript app into /dist
RUN npm run build

# Start the application server
CMD [ "node", "dist/server.js"]

# End of File