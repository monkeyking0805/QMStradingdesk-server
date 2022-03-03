FROM node:11-alpine

# configure ssh
RUN mkdir /root/.ssh && chmod 700 /root/.ssh
COPY docker/config /root/.ssh/config
COPY docker/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

# Create app directory
WORKDIR /usr/src/app

# Set timezone to UTC
RUN rm -f /etc/localtime && ln -s /usr/share/zoneinfo/UTC /etc/localtime

# Install openssh, git
RUN apk add --no-cache --virtual .flavorDeps openssh git yarn

# Install nodemon
RUN npm i -g --progress=false nodemon

# Bundle app source
COPY . /usr/src/app

RUN npm i

RUN npm config set unsafe-perm false

EXPOSE 8000

CMD [ "npm", "run", "start:production" ]
