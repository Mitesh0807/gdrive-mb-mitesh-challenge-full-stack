# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Copy the entire project
COPY . .

# Build the app
RUN yarn build
# Production stage
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and install production dependencies
COPY package*.json ./
COPY yarn.lock ./

# Copy the yarn binary from the development stage
COPY --from=development /usr/local/bin/yarn /usr/local/bin/yarn

# Install production dependencies with the copied yarn binary
RUN yarn install --production

# Copy the built files
COPY --from=development /usr/src/app/dist ./dist

# Start the app
CMD ["node", "dist/main"]
