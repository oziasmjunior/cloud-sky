const express = require('express');
const {routes} = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/', express.static('./src/public'));

const PORT = 8742;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});