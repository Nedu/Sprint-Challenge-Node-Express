const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRoutes = require('./routers/projectRoutes');
const actionRoutes = require('./routers/actionRoutes');

const server = express();

// Middlewares
server.use(cors());
server.use(helmet());
server.use(express.json());

//  Route Handlers
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
