# Local File Server

A simple local file sharing application built with Node.js (Express) and React.  
Easily upload, download, and manage files on your local network using a web interface.

## How to Use

1. **Download the latest `.exe` file from the [Releases page](https://github.com/udontneedtoknow787/local-file-server/releases).**
2. Extract the `.exe` file to any folder on your Windows PC.
3. **Double-click `backend.exe`** to start the server.
4. The server window will show your local IP address (e.g., `http://192.168.1.5:3000`).

## Access from Other Devices

- Connect your phone/tablet/other PC to the same WiFi/network.
- Open the server's IP address and port in a browser (e.g., `http://192.168.1.5:3000`).


## Demo Videos

See Local File Server in action!  
- [Demo Video 1: Installation and First File Upload](https://drive.google.com/file/d/1nTNC_cz4A5bGtI6m2DByo45rKcEypqQ9/view?usp=drive_link)  
- [Demo Video 2: Quick Upload & Download Workflow](https://drive.google.com/file/d/1cGGvLsimNPc_FUry6vQH9ROXmL-qUSZa/view?usp=drive_link)


## Notes

- Uploaded files are stored in the `uploads` folder next to the executable.
- For security, do **not** expose this server to the public internet without proper authentication and HTTPS.
- Large file uploads depend on your network speed.


## Features

- Upload files from any device on your network (PC, phone, tablet)
- Download files of any type (PDF, images, videos, etc.)
- Delete files from the server
- View all uploaded files
- Cross-platform web interface (React + Vite)
- Packaged as a standalone Windows executable (`.exe`) for easy sharing

## Getting Started (For developers)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) for development/building
- Windows (for running the `.exe` file)
- (Optional) npm for installing dependencies

### Installation & Usage

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/local-file-server.git
cd local-file-server/backend
```

#### 2. Install dependencies

```sh
npm install
```

#### 3. Build the frontend

```sh
cd ../client
npm install
npm run build
```
Move the generated `dist` folder into `backend/client/dist` if not already there.

#### 4. Run the server (development)

```sh
cd ../backend
node index.js
```
Open `http://localhost:3000` or `http://<your-ip>:3000` in your browser.

#### 5. Build Windows Executable (optional)

```sh
npm install -g pkg
pkg . --targets node18-win-x64 --output dist/backend.exe
```
Run `dist/backend.exe` to start the server without Node.js installed.


## License

MIT

---

**Author:** Raj Kumar