const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.static('public'));

app.use((request, response) => {
    response.sendFile('public/index.html', { root: process.cwd() });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
