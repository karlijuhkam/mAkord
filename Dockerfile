# Use official NodeJS iamge for building application sources
FROM node:10-alpine AS builder

WORKDIR /app

# Project specific requirement to have git installed for installation process
RUN apk add --no-cache git

# Copies package.json and package-lock.json files to install dependencies before sources are copied into this image
# This will significantly decrease rebuild times
COPY package* /app/
RUN npm install

# Copy sources and build appication as late as possible
COPY . .
RUN node_modules/.bin/ng build --prod

# Create new image with only nginx to serve the app
FROM nginx:1.15-alpine

# Finally move built sources from builder to new nginx image. Using separate container for building and serving will allow for significant reduction in image size. Sample image is only 23MB.
COPY --from=builder /app/dist/makordid-client/. /usr/share/nginx/html
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
