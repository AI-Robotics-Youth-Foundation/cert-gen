# Certificate Generator

A web-based certificate generator for creating and managing course completion certificates with high-DPI printing and sharing capabilities.

## Features

- **Real-time Certificate Preview**: See your certificate update as you type
- **High-DPI Printing**: Generates certificates at 300 DPI for crisp, professional printing
- **Auto-save**: Form data automatically saves to browser localStorage
- **Batch Download**: Generate certificates for multiple students at once
- **Share Functionality**: Create shareable URLs to share certificate configurations
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. **Fill in Certificate Details**:
   - Student Name
   - Course Name
   - Course Date
   - Cohort
   - Instructor Name and Title

2. **Generate Certificate**:
   - Click "Generate Certificate" to update the preview
   - Use "Download Certificate" for individual downloads
   - Use the share icon (top right) to create shareable links

3. **Batch Processing**:
   - Enter multiple student names (one per line) in the student list
   - Click "Download All Certificates" to generate all certificates at once

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Certificate Generation**: HTML2Canvas for high-quality image generation
- **Storage**: Browser localStorage for form persistence
- **Sharing**: URL parameters with proper encoding for newlines

## File Structure

```
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── styles.css          # CSS styling
├── header-section.jpg  # Certificate header image
└── gold-medal.jpg      # Certificate medal image
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AI-Robotics-Youth-Foundation/cert-gen.git
   cd cert-gen
   ```

2. Serve the files using a local web server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

3. Open your browser to `http://localhost:8000`

## Browser Support

- Modern browsers with ES6 support
- HTML2Canvas library for certificate generation
- Native Web Share API support on mobile devices
- Clipboard API for copy-to-clipboard functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.