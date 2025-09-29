# Stage 1: Build with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom first to leverage caching
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the application and skip tests completely
RUN mvn clean package -DskipTests -Dmaven.test.skip=true

# Stage 2: Run with JDK
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Environment variables (override at runtime)
ENV SERVER_PORT=8081
ENV MONGODB_URI="mongodb+srv://JcareManu:2NBWnaOE1ErBGsSN@jcarecluster01.gl7h2ma.mongodb.net/"
ENV MONGODB_DB=JcareApp

# Copy the packaged jar
COPY --from=build /app/target/*.jar app.jar

# Expose the server port
EXPOSE ${SERVER_PORT}

# Run the Spring Boot application
ENTRYPOINT ["java", "-Dserver.port=${SERVER_PORT}", "-Dspring.data.mongodb.uri=${MONGODB_URI}", "-Dspring.data.mongodb.database=${MONGODB_DB}", "-jar", "app.jar"]
