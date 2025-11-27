# FileDownloader

A web application that allows users to browse, filter, and download files from a server. Built with a Flask backend and a React + TypeScript frontend with Material UI.

## Table of Contents

- [Quick Project Overview](#quick-project-overview)
- [Installation Instructions](#installation-instructions)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
- [Running the Application](#running-the-application)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Frontend](#starting-the-frontend)
- [API Examples](#api-examples)
- [Running Tests](#running-tests)
- [Technical and UX Choices](#technical-and-ux-choices)

---

## Quick Project Overview

FileDownloader is a full-stack file management application that provides:

- **File browsing**: View all available files with their name, type, size, and last modified date
- **File filtering**: Filter files by type (PDF, PNG, MP3, MP4, CSV, JSON, TXT, etc.)
- **Search functionality**: Search files by name
- **File download**: Download individual files to a local folder
- **Dark/Light mode**: Toggle between dark and light themes for better user experience

---

## Installation Instructions

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
  - Download from [https://nodejs.org/](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Comes bundled with Node.js
  - Verify installation: `npm --version`

- **Python**: Version 3.10 or higher
  - Download from [https://www.python.org/](https://www.python.org/)
  - Verify installation: `python --version` or `python3 --version`

- **pip**: Python package manager (usually comes with Python)
  - Verify installation: `pip --version` or `pip3 --version`

### Installing Dependencies

#### Backend Dependencies

```bash
# Navigate to the backend directory
cd back-end

# (Optional) Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install flask flask-cors
```

#### Frontend Dependencies

```bash
# Navigate to the frontend directory
cd front-end

# Install Node.js dependencies
npm install
```

---

## Running the Application

### Starting the Backend

The backend is a Flask API server that serves file information and handles download requests.

```bash
# Navigate to the backend directory
cd back-end

# (Optional) Activate virtual environment if you created one
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run the Flask server
flask --app api run
```

The backend will start on `http://127.0.0.1:5000`

### Starting the Frontend

The frontend is a React application built with Vite.

```bash
# Navigate to the frontend directory
cd front-end

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

---

## API Examples

### Get All Files

Retrieves a list of all available files with their metadata.

**Request:**
```bash
curl http://127.0.0.1:5000/api/files
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "document.pdf",
    "type": "pdf",
    "size": "1.2 MB",
    "last_modified": "2024-01-15T14:30:00"
  },
  {
    "id": 2,
    "name": "image.png",
    "type": "png",
    "size": "500 KB",
    "last_modified": "2024-01-10T09:15:00"
  }
]
```

### Download a File

Downloads a specific file by filename.

**Request:**
```bash
curl http://127.0.0.1:5000/download/document.pdf
```

**Response:**
```
Ok 200
```

The file will be downloaded to the `download` folder in the backend directory.

### Health Check

Simple endpoint to verify the API is running.

**Request:**
```bash
curl http://127.0.0.1:5000/
```

**Response:**
```html
<p>Hello, World!</p>
```

---

## Technical and UX Choices

### Backend

- **Flask**: Chosen for its simplicity and lightweight nature, making it perfect for a straightforward file-serving API
- **Flask-CORS**: Enables Cross-Origin Resource Sharing to allow the frontend to communicate with the backend
- **File System Operations**: Uses Python's `os` module for file operations, providing cross-platform compatibility

### Frontend

- **React + TypeScript**: Provides type safety and better developer experience with autocompletion and compile-time error checking
- **Vite**: Modern build tool that offers fast hot module replacement (HMR) and optimized builds
- **Material UI (MUI)**: Comprehensive UI component library that provides:
  - Consistent design language
  - Built-in accessibility features
  - Easy theming support (dark/light mode)
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and responsive design
- **Zustand**: Lightweight state management library for React, chosen over Redux for its simplicity and smaller bundle size
- **Axios**: HTTP client for making API requests with better error handling and request/response interceptors

### UX Decisions

- **Loading Skeletons**: Display skeleton loaders while files are being fetched to provide visual feedback
- **File Type Icons**: Custom icons for different file types (PDF, PNG, MP3, etc.) for quick visual identification
- **Search Bar**: Real-time filtering as users type, no need to press Enter
- **Category Filters**: Toggle buttons to quickly filter by file type
- **Download Feedback**: Download icon changes to a checkmark after successful download
- **Dark/Light Mode**: System-aware theming with manual toggle option for user preference
- **Responsive Design**: Layout adapts to different screen sizes using CSS Flexbox and breakpoints.
