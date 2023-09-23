const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., HTML and CSS)
app.use(express.static('Public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a data object to store the form submission
    const formData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
    };

    // Convert the data to JSON format
    const formDataJSON = JSON.stringify(formData, null, 2);

    // Define the path to the file where the data will be stored
    const filePath = path.join(__dirname, 'data', 'form-submissions.json');

    // Write the data to the file
    fs.appendFile(filePath, formDataJSON + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data.');
        } else {
            console.log('Data saved successfully.');
            res.status(200).send('Data saved successfully.');
        }
    });
});

// app.post('/submit', (req, res) => {
//     const { name, email, message } = req.body;

//     // Create a data object to store the form submission
//     const formData = {
//         name,
//         email,
//         message,
//         timestamp: new Date().toISOString(),
//     };

//     // Convert the data to JSON format
//     const formDataJSON = JSON.stringify(formData, null, 2);

//     // Define the path to the file where the data will be stored
//     const filePath = path.join(__dirname, 'data', 'form-submissions.json');

//     // Write the data to the file
//     fs.appendFile(filePath, formDataJSON + '\n', (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error saving data.');
//         } else {
//             console.log('Data saved successfully.');
//             res.status(200).send('Data saved successfully.');
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
