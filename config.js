module.exports = {
  development: {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gaupalika_complaints',
    JWT_SECRET: process.env.JWT_SECRET || 'gaupalika_jwt_secret_key_2024',
    NODE_ENV: 'development'
  },
  production: {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: 'production'
  }
};


