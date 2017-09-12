FROM mhart/alpine-node:8.4.0

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN npm isntall -g yarn

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app

RUN yarn install --silent

# Copy app source
COPY src /app/src

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]