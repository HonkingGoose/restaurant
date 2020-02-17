FROM node:12.16.0

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN nmp ci --only=production

# Bundle app source

COPY . .

# This is the port that the app listens to
EXPOSE 8080

CMD [ "node", "src/backend/api.js" ]

# Use node default "node"-use, to have a non-root user

USER node