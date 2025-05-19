# JobJack-file-system

This is a basic file system that shows directories where the backend will be hosted. The UI shows what is underneath

## Technologies Used

- **Framework**: Angular
- **Language**: TypeScript & JavaScript
- **Build Tool**: npm

## Project Structure

- `src/app/components`: Contains reusable components
- `src/app/services`: Contains services that will be used to access our endpoint
- `src/environments`: Contains global environment settings for the project
- `src/styles.scss`: Contains global styles

## How to Run the Application 
### Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   
2. Navigate to backend:
   ```bash
   cd backend
   npm install
   
3. Navigate to frontend:
   ```bash
   cd frontend
   npm install
   
4. Start backend:
   ```bash
   npm start

5. Start frontend:
   ```bash
   npm start

## How to Run the Application
### Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Navigate to the project:
   ```bash
    cd jobjack
   
3. Build the images
    ```bash
    docker-compose build

4. Start your app
    ```bash
    API_URL=http://localhost:3000 UI_HOST_MACHINE=http://localhost docker-compose up -d