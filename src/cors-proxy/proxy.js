const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3400;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/', (req, res, next) => {
    const targetApi = req.query.targetApi;
    if (!targetApi) {
        res.status(400).json({ error: 'Missing targetApi query parameter' });
        return;
    }

    createProxyMiddleware({
        target: targetApi,
        changeOrigin: true,
        pathRewrite: {
            '^/': '',
        },
    })(req, res, next);
});

app.listen(port, () => {
    console.log(`CORS proxy listening on port ${port}`);
});
