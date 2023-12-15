# VAM Backend

This is the backend for the Veterinary Appointment Management (VAM) project. It provides an API for managing information about veterinarians and patients.

## Requirements

Make sure you have Node.js and npm installed on your system before running the backend.

- Node.js (v14.x or higher)
- npm (usually installed with Node.js)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/TrujiDev/VAM-Backend-FS.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vam-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project's root directory and configure the necessary environment variables (e.g., `MONGO_URI`, `JWT_SECRET`).

   ```env
   MONGO_URI=your_mongo_url
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

## Configuration

Ensure that you correctly configure the environment variables in the `.env` file to connect to your MongoDB database and set up any required secret keys.

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will be available at [http://localhost:4000](http://localhost:4000).

## Endpoints

- **/api/vets**: Endpoints related to veterinarians.
- **/api/patients**: Endpoints related to patients.

## Contributions

Contributions are welcome. If you find any issues or have suggestions, please open an issue or create a pull request.
