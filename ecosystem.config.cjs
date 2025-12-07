const dotenv = require('dotenv');
dotenv.config(); 

module.exports = {
    apps: [
        {
            name: 'jay-portfolio',
            script: process.env.NODE_ENV === 'development'
            ? './scripts/start_app_dev.sh'
            : './scripts/start_app.sh',
            cwd: __dirname,
        },
    ]
};
