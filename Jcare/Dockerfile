# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-jammy

# Set environment variables (default values can be overridden at runtime)
ENV SERVER_PORT=8081
ENV MONGODB_URI=""
ENV MONGODB_DB=JcareApp

# Set the working directory inside the container
WORKDIR /app

# Copy Maven build files
COPY pom.xml .

# Download dependencies first (caching)
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Expose the port (can be overridden at runtime)
EXPOSE ${SERVER_PORT}

# Run the Spring Boot application with environment variables
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${SERVER_PORT} -Dspring.data.mongodb.uri=${MONGODB_URI} -Dspring.data.mongodb.database=${MONGODB_DB} -jar target/Jcare-0.0.1-SNAPSHOT.jar"]