
# Notes Backend

This is a backend application for managing notes, where authenticated users can create notes and all users can view notes. The application ensures that only logged-in users can create new notes, edit any note, and also can delete note, while anyone can view the notes created by others.

## Features

- **Create Note:** Logged-in users can create a new note by providing a title and description.
- **Edit Note:** Logged-in users can edit any existing note.
- **Delete Note:** Logged-in users can delete any note.
- **View Notes:** All users, whether logged in or not, can view the notes created by others.
- **Authentication:** Only authenticated users can create, edit, and delete notes.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ismahin/note-backend.git
    cd notes-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Setup environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT = 5000
    MONGODB_URL = mongodb+srv://{DB_name}:{your-password}@cluster0.5xxi1s7.mongodb.net
    CORS_ORIGIN = *
    ACCESS_TOKEN_SECRET = b674dcfde2119be4edd830d24db1b8a5c1f1acbeafb8ea87fc80ee05fb50d84b
    ACCESS_TOKEN_EXPIRY = 1d
    REFRESH_TOKEN_SECRET = 3fe0758102e3be0af56339bd0a84087d155f272a2d523031f7f61b3548cbed60
    REFRESH_TOKEN_SECRET_EXPIRY = 10d
    CLOUDINARY_API_KEY = your-api-key
    CLOUDINARY_CLOUD_NAME= your-cloud-name
    CLOUDINARY_API_SECRET = your-secret
    ```

4. **Run database migrations (if applicable):**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the server:**

    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication

- **Register User:**

    ```http
    POST /api/customer/auth/register
    ```

    Request Body:
    ```json
    {
    "username": "string",
    "email": "string",
    "fullName": "string",
    "password": "string"
    }
    ```

- **Login User:**

    ```http
    POST /api/customer/auth/login
    ```

    Request Body:
    ```json
    {
    "email":"string",
    "username":"string",
    "password":"string"
    }
    ```
    - **Logout User:**

    ```http
    POST /api/customer/auth/logout
    ```

    Request Body:
    ```json
    {
        
    }
    ```

### Notes

- **Create Note:**

    ```http
    POST /api/customer/private/createContent
    ```

    Request Body:
    ```json
    {
        "title": "string",
        "description": "string"
    }
    ```

    *Requires authentication.*
  
- **Edit Note:**

    ```http
    POST /api/customer/private/edit/:id
    ```

    Request Body:
    ```json
    {
        "title": "string",
        "description": "string"
    }
    ```

    *Requires authentication.*

  - **Delete Note:**

    ```http
    POST /api/customer/private/delete/:id
    ```

    Request Body:
    ```json
    {
    
    }
    ```

    *Requires authentication.*
    
- **All Created Note:**

    ```http
    POST /api/customer/private/mycontents
    ```

    Request Body:
    ```json
    {
    
    }
    ```

    *Requires authentication.*

- **View Notes:**

    ```http
    GET /api/customer/public/view
    ```

    *Accessible by anyone.*

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [mahinshikder01@gmail.com](mahinshikder01@gmail.com).
