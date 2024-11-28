# File Management System - Frontend

<p align="left">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/BeldiKamuha/File-Management-System-Frontend" alt="License"></a>
</p>

## Description

This is the frontend system for the File Management System. The system allows users to interact with a file management system, including browsing directories, uploading files, and managing files and directories.  

## Features

•	List Directories and Files:  
•	View all high-level (root) directories and files.  
•	Navigate into directories to view their contents.  
•	File Management:  
•	View file details in a dialog.  
•	Download files.  
•	Delete files.  
•	Rename files.  
•	Navigate to parent directory.  
•	Upload new files to the current directory.  
•	Directory Management:  
•	Create new directories within the current directory.  
•	Delete directories along with their files and subdirectories.  
•	Navigate to parent directories.  
•	User Interface:  
•	Responsive design using Bootstrap for styling.  
•	User feedback through toast notifications.  

## Technologies Used

•	Vue.js - JavaScript framework for building user interfaces.  
•	BootstrapVue - Integration of Bootstrap with Vue.js for styling.  
•	Axios - Promise-based HTTP client for API requests.  
•	Moment.js - Library for parsing and formatting dates.  

## Installation

### Prerequisites

•	Node.js (version 12 or higher)  
•	npm (Node Package Manager)  

## Steps

### 1. Clone the Repository
```
git clone https://github.com/yourusername/file-management-frontend.git
```

### 2.	Navigate to the Project Directory
```
cd file-management-frontend
```

### 3.	Install Dependencies
```
npm install
```

### 4.	Configure the API Endpoint
• Open src/axios-instance.js and set the base URL to point to your backend API.
```
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

export default instance;
```
## Usage

### Running the Development Server
```
npm run serve
```
• The application will be accessible at http://localhost:8080 by default.  

### Building for Production
```
npm run build
```
• The production build will be placed in the dist directory

## API Endpoints

The frontend communicates with the backend using the following API endpoints:
Files
•	GET /api/files/ - List all files in the system.  
•	GET /api/files/:id - Get details of a specific file.  
•	POST /api/files/ - Upload a new file.  
•	PUT /api/files/:id - Update a file.  
•	DELETE /api/files/:id - Delete a file.  
•	GET /api/files/:id/download - Download a file.  
Directories  
•	GET /api/directories/ - List all directories in the system.  
•	GET /api/directories/:id/sub-directories - Get sub-directories of a directory.  
•	GET /api/directories/:id/files - Get files in a directory.  
•	POST /api/directories/ - Create a new directory.  
•	PUT /api/directories/:id - Update a directory.  
•	DELETE /api/directories/:id - Delete a directory.  

## Notes

### Backend Dependency: 
Ensure the backend application is running and accessible at the configured base URL.
### CORS Configuration: 
The backend must allow CORS requests from the frontend origin (http://localhost:8080 by default).
### Environment Variables: 
If needed, you can use environment variables to configure the API base URL.

## License
File Management System - Frontend is completely free and released under the [MIT license](https://opensource.org/licenses/MIT).

