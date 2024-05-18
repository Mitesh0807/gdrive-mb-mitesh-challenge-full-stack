
---

# Google Drive Risk Analysis Tool

This project aims to provide a risk analysis tool for Google Drive users, allowing them to assess potential security risks associated with their files and activities on Google Drive. The tool consists of a React frontend for the user interface and a Node.js backend with MongoDB database integration for data storage and analysis.

## Features

- **User Authentication**: Users can authenticate using their Google accounts to access the risk analysis tool.
- **Google Drive Integration**: The tool interacts with the Google Drive API to retrieve user files and activity data.
- **Risk Analysis**: Analyzes user files and activities to identify potential security risks such as sensitive information exposure, sharing settings, and access logs.
- **Dashboard**: Provides a dashboard interface for users to view summarized risk analysis results and insights.
- **Data Visualization**: Utilizes charts and graphs to present risk analysis findings in a visually appealing manner.
- **Data Storage**: Stores user data and analysis results in a MongoDB database using TypeORM for efficient data management.

## Installation

### Prerequisites

- Docker
- Docker Compose

## ENV setup 


### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Mitesh0807/gdrive-mb-mitesh-challenge-full-stack.git
    ```

2. Navigate to the project directory:

    ```bash
    cd gdrive-mb-mitesh-challenge-full-stack
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

4. Access the application in your web browser at `http://localhost:5173`.

## Configuration

### Environment Variables
- **PORT**=8000
- **CLIENT_ID**: Google OAuth2 client ID for authentication.
- **CLIENT_SECRET**: Google OAuth2 client secret for authentication.
- **MONGO_URI**: MongoDB connection URI.
- **REDIRECT_URI**: Redirect url after Oauth2 auth done 
- **FE_URI**=http://localhost:5173/

## Usage

1. Visit the application URL in your web browser.
2. Authenticate using your Google account.
3. Explore the risk analysis features and dashboard to assess your Google Drive security risks.
4. Customize and configure the tool as needed for your specific use case.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to adjust the sections and content based on your specific project requirements and preferences. Let me know if you need further assistance!
