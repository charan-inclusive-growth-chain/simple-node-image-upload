const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs'); // Required for file operations
const app = express();
const port = 3000; // Choose a suitable port

// Middleware to handle file uploads
app.use(fileUpload());

// Define the destination folder for uploaded images
const uploadFolder = './uploads'; // Modify this path as needed

// Ensure the destination folder exists, create it if it doesn't
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Handle the image upload
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.imageFile) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const uploadedFile = req.files.imageFile;
  const fileName = uploadedFile.name;
  const filePath = `${uploadFolder}/${fileName}`; // Destination path

  // Save the uploaded image to the specified folder
  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Successfully saved the file
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  });
});

app.get("/check", (req,res) => {
  res.status(200).send("Test API Working");
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
