# Stage 1: Build with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with JDK
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Set environment variables (overridable at runtime)
ENV SERVER_PORT=8081
ENV MONGODB_URI=""
ENV MONGODB_DB=JcareApp

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE ${SERVER_PORT}

# Run Spring Boot app
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${SERVER_PORT} -Dspring.data.mongodb.uri=${MONGODB_URI} -Dspring.data.mongodb.database=${MONGODB_DB} -jar app.jar"]
