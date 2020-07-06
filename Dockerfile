#Pull the latest NodeJS image
FROM node:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install silent --only=production

# Bundle app source
COPY . .

# Expose application port
EXPOSE 5000

# Start the application server
CMD [ "ts-node", "src/server.ts"]
