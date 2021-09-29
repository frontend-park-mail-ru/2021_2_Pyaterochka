const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.static('build'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
