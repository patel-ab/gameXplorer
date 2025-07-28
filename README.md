# GameXplorer 🎮

**GameXplorer** is a comprehensive web application that enables users to explore video games, view detailed information, and manage their favorite games. The project integrates Angular for the frontend and Django for the backend to provide a seamless user experience and efficient data management.

## Features

- **Game Search**: Search for games by name and retrieve detailed information, including release year, genres, platforms, rating, and screenshots.
- **Favorites Management**: Add and manage your favorite games in a personalized list.
- **Dynamic Display**: Dynamically display game details using an image slider and visually engaging elements.
- **Login & Signup**: Secure user authentication with the ability to save user-specific preferences and data.

---

## Tech Stack

### Frontend
- **Angular**: Used for building a dynamic and responsive user interface.
- **TypeScript**: Ensures type safety and scalability in the frontend logic.
- **HTML5 & CSS3**: For structuring and styling components.
- **Angular Router**: Manages routing between different pages (e.g., Login, Home, Game Details).

### Backend
- Spring Boot (Java 17)
- RESTful APIs with Spring MVC
- MySQL
- JPA/Hibernate
- Jackson for JSON parsing

### Backend-2
- **Django**: Provides a robust framework for managing API endpoints and database interactions.
- **Django REST Framework (DRF)**: Used for creating RESTful APIs.
- **SQLite**: The default lightweight database for development.

### APIs
- **RAWG.io**: Game information and data sourced from the RAWG.io API.

---

## Installation and Setup

### Prerequisites
- Node.js and npm (for Angular)
- Python 3.x and pip (for Django)
- Git

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your API Key
   Location - frontend/src/environments/environment.ts
   ```
4. Run the Angular application:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

### Backend (Spring Boot)

```bash
cd backend
```

1. Update `application.properties`:

```properties
spring.datasource.url=URL
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

2. Start the backend:

```bash
./mvnw spring-boot:run
```

Server: `http://localhost:8080`

---

## Key Functionalities

### 1. **Search and Display Games**
- The frontend communicates with the backend to fetch game data via API calls.
- Implemented dynamic rendering of game cards using Angular templates.

### 2. **User Authentication**
- The backend handles user login and signup securely.
- User data is passed between components using Angular services and state management.

### 3. **Favorites Management**
- The application allows users to add games to their favorites list.
- Data is stored in the backend and retrieved on user-specific requests.

### 4. **Dynamic Image Slider**
- A custom Angular component displays game screenshots in a slider.
- The slider updates every few seconds for an engaging user experience.

---

## Folder Structure

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/    # Angular components (e.g., login, game details)
│   │   ├── services/      # Angular services for API calls
│   │   └── models/        # TypeScript models for data structures
│   ├── environments/      # API keys and environment configurations
│   └── assets/            # Images and static assets
```

### Backend
```
├── backend-springboot/    # Spring Boot app
│   ├── controller/        # REST Controllers
│   ├── entity/            # JPA Entities
│   ├── repository/        # Repositories (CRUD)
│   └── application.properties
```
### Backend-2
```
backend/
├── api/
│   ├── models.py          # Django models for games and users
│   ├── serializers.py     # Django REST Framework serializers
│   ├── views.py           # API endpoint logic
│   └── urls.py            # API routing
├── settings.py            # Django project settings
├── manage.py              # Django management commands
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request.

---

## License

This project is open-source and available under the MIT License.

---

## Future Enhancements

- Add social media login options.
- Integrate a recommendation system for suggesting similar games.
- Implement game reviews and ratings from users.

---
