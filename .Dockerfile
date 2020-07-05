<<<<<<< HEAD:Dockerfile
#Pull the latest Node image
=======
#Pull the latest NodeJS image
>>>>>>> 994d74533de61277945b03b72f18ebdeadeefd29:.Dockerfile
FROM node:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g typescript
RUN npm install

# Bundle app source
COPY . .

# Expose application port
EXPOSE 5000

RUN npm run build
RUN npm prune --production

# Start the application server
CMD [ "node", "dist/server.js"]
