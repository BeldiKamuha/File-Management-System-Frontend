# File Management System - Frontend

<p align="left">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/BeldiKamuha/File-Management-System-Frontend" alt="License"></a>
</p>

## Description

The File Management System Frontend is a web application built with Vue.js and BootstrapVue that allows users to interact with a file management backend system. Users can upload, download, rename, and delete files, as well as create and navigate directories in a hierarchical structure.

This project was developed as part of an interview coding challenge to demonstrate proficiency in building a full-stack application with a RESTful API backend and a dynamic frontend.

## Features

•	RESTful API following REST standards.  
•	File Management: Upload, List, download, update, and delete files.  
•	Directory Management: Create, List, update, and delete directories.  
•	Nested Directories: Supports nested directories in a tree structure.  
•	Error Handling: Gracefully handles errors such as deleting non-existent files or directories that are not empty.  
•	Local File System Storage: Files and directories are stored on the local file system.  
•	Database Storage: Metadata stored in a MySQL database.  

## Technologies Used

•	PHP (Laravel Framework)  
•	MySQL Database  
•	Composer for dependency management  

## Installation

### Prerequisites

•	PHP (version 8.0.0 or higher) 
•	Composer  
•	MySQL  
•	Web Server (Apache) 
•	Node.js and npm (for compiling frontend assets)

## Steps

### 1. Clone the Repository
```
git clone https://github.com/BeldiKamuha/File-Management-System-Frontend.git
```

### 2.	Navigate to the Project Directory
```
cd file-management-backend
 ```

### 3.	Install PHP Dependencies
```
composer install
```

### 4.	Copy the Environment File
```
cp .env.example .env
```

### 5.	Configure Environment Variables
Open .env and set your application and database configurations:
```
APP_NAME="File Management System"
APP_ENV=local
APP_KEY=base64:YourGeneratedAppKey
APP_DEBUG=true
APP_URL=http://localhost

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

```

### 6.	Generate Application Key
```
php artisan key:generate
```

### 7.	Run Database Migrations
```
php artisan migrate
```

### 8.	Create Storage Symlink
```
php artisan storage:link
```

### 9.	Set Directory Permissions
Ensure the storage and bootstrap/cache directories are writable by the web server:
```
chmod -R 775 storage bootstrap/cache
```

## Usage

Running the Development Server
```
php artisan serve
```

