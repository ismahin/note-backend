
# Notes Backend

This is a backend application for managing notes, where authenticated users can create notes and all users can view notes. The application ensures that only logged-in users can create new notes, while anyone can view the notes created by others.

## Features

- **Create Note:** Logged-in users can create a new note by providing a title and description.
- **View Notes:** All users, whether logged in or not, can view the notes created by others.
- **Authentication:** Only authenticated users can create notes.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/notes-backend.git
    cd notes-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Setup environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=your_port_number
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Run database migrations (if applicable):**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **Register User:**

    ```http
    POST /api/register
    ```

    Request Body:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

- **Login User:**

    ```http
    POST /api/login
    ```

    Request Body:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

### Notes

- **Create Note:**

    ```http
    POST /api/notes
    ```

    Request Body:
    ```json
    {
        "title": "string",
        "description": "string"
    }
    ```

    *Requires authentication.*

- **View Notes:**

    ```http
    GET /api/notes
    ```

    *Accessible by anyone.*

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
