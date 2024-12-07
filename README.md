# BookMania

Welcome to BookMania, a project developed as part of the SoftUni Angular course.
This application is a mock book store and allows users to browse their book collections, view book details, and more.

## Documentation

### Frameworks and Libraries

- **Angular 18**: A platform for building mobile and desktop web applications.
- **RxJS**: A library for reactive programming using Observables.
- **Bootstrap 5**: A CSS framework for building responsive websites.
- **FontAwesome**: A library of icons for use in web projects.
- **jwt-decode**: A library for decoding JSON Web Tokens (JWT).
- **JSON Server**: A full fake REST API for quick prototyping.
  - **JSON Server Auth**: Layer on top of JSON Server, providing authentication capabilities.
  - The "database" can be found in `db/db.json` file.

### Functionality

- User Authentication: Login and registration features. `Admin` and `User` roles.
- Book Management:
  - as `User`:
    - View and filter Books, based on different criteria
  - as `Admin`:
    - same as `User` + Create, Update, Delete Books
- Book Details View: Detailed information about each book.
- Book Search
- _Book Categories_ Management:
  - as `User`:
    - View _Book Categories_
  - as `Admin`:
    - same as `User` + Create, Update, Delete _Book Categories_

### Architecture

- **Frontend**: Built with Angular, utilizing components, services, and RxJS for state management(via `BehaviorSubject`s).
- **Backend**: Simulated with JSON Server, providing a RESTful API for managing books, categories and users.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Ivan-Shaml/bookstore-ng.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd bookstore-ng
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

### Running the Application

To start the application, you need to run both the backend and the Angular frontend.

#### Start the Backend

1. **Navigate to the project directory**:

    ```bash
    cd bookstore-ng
    ```

2. **Start the backend server**:

    ```bash
    npm run backend
    ```

   This will run the backend server using `json-server`. It will be available at `http://localhost:3000`

#### Start the Frontend

1. **Open a new terminal window and navigate to the project directory**:

    ```bash
    cd bookstore-ng
    ```

2. **Start the Angular development server**:

    ```bash
    npm run start
    ```

   This will run the Angular application. By default, it will be available at `http://localhost:4200`.

