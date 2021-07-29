const cors = require('cors');

const corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200,
    Headers: ['Origin, X-Requested-With, Content-Type, Accept']
}

module.exports = cors(corsOptions)