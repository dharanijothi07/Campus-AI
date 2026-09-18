# =========================================================
# Stage 1: Build React Frontend
# =========================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci || npm install

# Build frontend production assets
COPY frontend/ ./
RUN npm run build

# =========================================================
# Stage 2: Build Spring Boot Backend with Bundled Frontend
# =========================================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app/backend

# Copy Maven POM and source files
COPY backend/pom.xml .
COPY backend/src ./src

# Copy built frontend assets into Spring Boot's static resources
COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static

# Build the Spring Boot executable JAR
RUN mvn clean package -DskipTests

# =========================================================
# Stage 3: Lightweight Production Runtime
# =========================================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the backend builder stage
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Render assigns a dynamic port via the PORT environment variable (default: 8080)
ENV PORT=8080
EXPOSE 8080

# Run the Spring Boot application, dynamically passing PORT to server.port
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -Djava.security.egd=file:/dev/./urandom -jar app.jar"]
