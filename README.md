# Microservices Project with Kafka

A microservices architecture project demonstrating event-driven communication using Kafka message broker, with Node.js/Express services and PostgreSQL database.

## 🏗️ Architecture

This project implements a microservices architecture with the following components:

- **Instructor Service** (Port 8080): Handles course creation/deletion requests, publishes events to Kafka, and can directly delete courses from the database
- **Student Service** (Port 8081): Consumes events from Kafka and manages course data in PostgreSQL
- **Kafka**: Message broker for asynchronous communication between services
- **Zookeeper**: Coordinates and manages Kafka cluster
- **PostgreSQL**: Database for storing course information

### Data Flow

**Adding a Course:**
```
Client → Instructor Service → Kafka → Student Service → PostgreSQL
```

**Deleting a Course:**
```
Client → Instructor Service → PostgreSQL (direct delete)
                ↓
            Kafka (notification)
                ↓
        Student Service (consumes notification)
```

## 🚀 Features

- Event-driven architecture using Kafka
- Asynchronous communication between microservices
- Direct database access for delete operations (Instructor Service)
- RESTful API endpoints
- PostgreSQL database integration
- Docker containerization
- Hot reload with nodemon

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mostafa-7ussein/microservices_Academic_system.git
   cd microservices_Academic_system
   ```

2. **Start all services:**
   ```bash
   docker compose up -d
   ```

3. **Verify services are running:**
   ```bash
   docker compose ps
   ```

4. **Check logs:**
   ```bash
   docker compose logs -f
   ```

## 📡 API Endpoints

### Instructor Service (Port 8080)

#### Add Course
```http
POST http://localhost:8080/add-course
Content-Type: application/json

{
  "id": 1,
  "name": "Node.js Basics"
}
```
**Response:** `"message sent"`

**Flow:** Instructor Service → Kafka → Student Service → PostgreSQL

#### Delete Course
```http
DELETE http://localhost:8080/delete-course
Content-Type: application/json

{
  "id": 1,
  "name": "Node.js Basics"
}
```
**Response:** `"Course deleted successfully"` or `"Course not found"`

**Flow:** Instructor Service → PostgreSQL (direct delete) → Kafka (notification) → Student Service

### Student Service (Port 8081)

#### Get Course
```http
GET http://localhost:8081/get-course
Content-Type: application/json

{
  "id": 1
}
```

#### Get All Courses
```http
GET http://localhost:8081/get-all-courses
```

## 🧪 Testing

### Using cURL

**Add a course:**
```bash
curl -X POST http://localhost:8080/add-course \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Node.js Basics"}'
```

**Delete a course:**
```bash
curl -X DELETE http://localhost:8080/delete-course \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Node.js Basics"}'
```

**Get all courses:**
```bash
curl http://localhost:8081/get-all-courses
```

### Using PowerShell

**Add a course:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/add-course" -Method POST -ContentType "application/json" -Body '{"id": 1, "name": "Node.js Basics"}'
```

**Delete a course:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/delete-course" -Method DELETE -ContentType "application/json" -Body '{"id": 1, "name": "Node.js Basics"}'
```

**Get all courses:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/get-all-courses" -Method GET
```

## 🗄️ Database

### Connection Details

- **Host:** localhost
- **Port:** 5432
- **Database:** postgres
- **Username:** postgres
- **Password:** postgres

### Access Database

```bash
docker exec -it postgres psql -U postgres -d postgres
```

### View Courses

```sql
SELECT * FROM courses;
```

## 🏛️ Project Structure

```
microservices_project-main/
├── docker-compose.yml
├── README.md
├── .gitignore
├── instructor/
│   ├── controllers/
│   │   ├── dbController.js
│   │   ├── instructorController.js
│   │   └── kafkaProducer.js
│   ├── models/
│   │   └── course.js
│   ├── routers/
│   │   └── router.js
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── student/
│   ├── controllers/
│   │   ├── kafkaConsumer.js
│   │   └── studentController.js
│   ├── models/
│   │   └── course.js
│   ├── routers/
│   │   └── router.js
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
└── data/
    ├── kafka/
    └── postgres/
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Kafka** - Message broker
- **Kafka-node** - Kafka client for Node.js
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for PostgreSQL
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📊 Service Details

### Instructor Service

- **Port:** 8080
- **Responsibilities:**
  - Receive course creation/deletion requests
  - Publish events to Kafka topic for course creation
  - Direct database access for course deletion
  - Send notifications to Kafka after successful deletion
- **Database Access:** Yes (for delete operations)
- **Dependencies:** Express, Kafka-node, Sequelize, PostgreSQL

### Student Service

- **Port:** 8081
- **Responsibilities:**
  - Consume events from Kafka
  - Manage course data in PostgreSQL (add operations)
  - Provide read endpoints for courses
  - Process delete notifications from Kafka
- **Database Access:** Yes (full CRUD operations)

## 🔄 How It Works

### Adding a Course

1. Client sends a request to Instructor Service to add a course
2. Instructor Service publishes the event to Kafka topic `topic1`
3. Student Service consumes the event from Kafka
4. Student Service processes the event and saves it to PostgreSQL database
5. Client can read courses directly from Student Service

### Deleting a Course

1. Client sends a request to Instructor Service to delete a course
2. Instructor Service directly deletes the course from PostgreSQL database
3. Instructor Service publishes a delete notification to Kafka topic `topic1`
4. Student Service consumes the notification from Kafka
5. Student Service processes the notification (course already deleted by Instructor Service)

## 🛑 Stopping Services

```bash
# Stop all services
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers with volumes (deletes database data)
docker compose down -v
```

## 📝 Environment Variables

### Instructor Service
- `PORT=8080`
- `KAFKA_BOOTSTRAP_SERVERS=kafka:9092`
- `KAFKA_TOPIC=topic1`
- `POSTGRES_URL=postgres://postgres:postgres@postgres:5432/postgres`

### Student Service
- `PORT=8081`
- `POSTGRES_URL=postgres://postgres:postgres@postgres:5432/postgres`
- `KAFKA_BOOTSTRAP_SERVERS=kafka:9092`
- `KAFKA_TOPIC=topic1`

## 🐛 Troubleshooting

### Services not starting
```bash
# Check service status
docker compose ps

# View logs
docker compose logs [service-name]
```

### Database connection issues
```bash
# Check PostgreSQL logs
docker compose logs postgres

# Verify PostgreSQL is running
docker compose ps postgres
```

### Kafka connection issues
```bash
# Check Kafka logs
docker compose logs kafka

# Verify Kafka is running
docker compose ps kafka
```

### Rebuild services after code changes
```bash
# Rebuild a specific service
docker compose build --no-cache [service-name]

# Restart the service
docker compose up -d [service-name]
```

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Repository

[GitHub Repository](https://github.com/mostafa-7ussein/microservices_Academic_system)
