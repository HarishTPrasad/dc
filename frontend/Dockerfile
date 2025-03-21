# Stage 1: Build the frontend
FROM node:18 AS build
WORKDIR /app

# Copy package files and install dependencies separately for better caching
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the app files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if available; otherwise, fallback to default
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure Nginx runs with non-root user for security (optional)
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
