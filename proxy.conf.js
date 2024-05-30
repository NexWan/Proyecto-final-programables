var backRequests = 'http://localhost:3000';

module.exports = {
    "/api": {
        "target": backRequests,
        secure: false,
        changeOrigin: true,
    }
}