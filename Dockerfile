FROM node:14.3.0 AS development

ENV CI=true
ENV PORT=8080

WORKDIR /code
COPY package.json package-lock.json ./

# If you are building your code for production use
# RUN npm ci --only=production
RUN npm ci
COPY src /code/src

# This is the port that the app listens to
EXPOSE 8080

CMD [ "node", "src/backend/api.js" ]

# Use node default "node"-use, to have a non-root user
USER node
