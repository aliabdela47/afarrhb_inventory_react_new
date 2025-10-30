
# Project Setup and Running Instructions

This document provides detailed steps to set up and run the Afar-RHB Inventory Management System on your local machine.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

1.  **Git**: For cloning the repository.
2.  **A Modern Web Browser**: Such as Google Chrome, Firefox, or Microsoft Edge.
3.  **A Code Editor**: [Visual Studio Code](https://code.visualstudio.com/) is recommended.
4.  **A Local Web Server**: This project uses native browser ES Modules, which require the files to be served over HTTP/HTTPS, not the `file://` protocol. You **cannot** simply open `index.html` in your browser. Several easy options are listed below.

## 2. Installation

### Step 1: Clone the Repository

Open your terminal or command prompt and run the following command to clone the project to your local machine:

```bash
git clone <your-repository-url>
cd <project-directory-name>
```

### Step 2: No `npm install` Needed!

This project is configured to be extremely simple to set up. It uses a technology called **Import Maps**, which tells the browser where to find the necessary libraries (like React) directly from a CDN.

This means you **do not need to run `npm install`** or manage a `node_modules` folder.

## 3. Running the Application

To run the application, you must serve the project files from a local web server. Here are three simple methods.

### Method 1: Using VS Code Live Server (Recommended)

This is the easiest method if you are using Visual Studio Code.

1.  **Install the Extension**: Open VS Code, go to the Extensions view (`Ctrl+Shift+X`), and search for and install **Live Server** by Ritwick Dey.
2.  **Start the Server**:
    *   Open the project folder in VS Code.
    *   In the Explorer panel, right-click on the `index.html` file.
    *   Select **"Open with Live Server"** from the context menu.
3.  The application will automatically open in your default browser, and it will auto-reload whenever you save a file.

### Method 2: Using Python's Built-in Server

If you have Python installed, you can use its simple built-in web server.

1.  **Open a Terminal**: Navigate to the root directory of the project in your terminal.
2.  **Run the Command**:
    *   If you are using **Python 3**, run:
        ```bash
        python -m http.server
        ```
    *   If you are using **Python 2**, run:
        ```bash
        python -m SimpleHTTPServer
        ```
3.  **Access the App**: Open your web browser and navigate to **[http://localhost:8000](http://localhost:8000)**.

### Method 3: Using Node.js `serve` Package

If you have Node.js and npm installed, you can use the lightweight `serve` package.

1.  **Open a Terminal**: Navigate to the root directory of the project in your terminal.
2.  **Run the Command**:
    ```bash
    npx serve
    ```
    *This command will automatically download and run the `serve` package without installing it globally.*
3.  **Access the App**: The terminal will display a local address, typically **[http://localhost:3000](http://localhost:3000)**. Open this URL in your browser.

## 4. Usage

Once the application is running, you will be directed to the login page.

-   **Email**: `ardii.2000@gmail.com`
-   **Password**: `123456`

Enter these credentials to access the main dashboard and explore the application.

---

## Troubleshooting

-   **Blank Page**: If you see a blank page, open the browser's developer console (`F12` or `Ctrl+Shift+I`). The most common error is related to CORS, which means you are likely opening the `index.html` file directly instead of running it through a local web server. Please follow one of the methods in Section 3.
-   **404 Errors**: If the application loads but some assets (like images) are missing, ensure your web server is running from the root directory of the project where `index.html` is located.
