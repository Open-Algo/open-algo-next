const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'open-algo.s3.us-east-2.amazonaws.com',
    ],
  },
};
