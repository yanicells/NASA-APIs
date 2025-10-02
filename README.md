# NASA APIs Explorer

A web application that provides access to NASA's incredible space data and imagery through various APIs. Explore astronomy pictures, Mars rover photos, NASA's extensive media library, and Mars' weather data all in one place. The APIs used in this project, and the complete list of NASA's APIs can be found through this link: [https://api.nasa.gov](https://api.nasa.gov)


## Tech Stack

- **Frontend**: TailwindCSS
- **Backend**: Node.js (Express.js, Axios)

## Setup Guide

### Prerequisites

- Node.js (>= 18.x)
- npm (>= 9.x)

### Clone the Repository

```bash
git clone https://github.com/yanicells/NASA-APIs.git
cd nasa-apis
```

### Install Dependencies

```bash
npm install
```

(Optional) Install nodemon globally:

```bash
npm install -g nodemon
```

### Environment Variables

Create a `.env` file in the root directory and add your NASA API key:

```env
API_KEY=your_nasa_api_key_here
```

#### Get NASA API Key

1. Visit [https://api.nasa.gov](https://api.nasa.gov)
2. Click "Get API Key"
3. Fill in your details and generate your key
4. Copy the key to your `.env` file

### Run the Project

```bash
# Start with nodemon
nodemon index.js
```

Project will be available at: http://localhost:3000

## Usage

1. Open the landing page at `/`
2. **Astronomy Picture of the Day (APOD)**: Browse daily space images with explanations
3. **Mars Rover Photos**: View photos captured by NASA's Mars rovers (Curiosity, Perseverance, etc.)
4. **NASA Media Library**: Search NASA's extensive photo and video collection
5. **Mars Weather**: Check historical Mars weather data 

## Features

- Daily astronomy pictures with detailed descriptions
- Mars rover photo gallery with date filtering
- Searchable NASA media library
- Responsive design for all devices