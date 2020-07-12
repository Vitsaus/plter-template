const dbUrl = process.env.DB_URL ? process.env.DB_URL : "localhost";

console.log('using db url', dbUrl);

module.exports = {
  "type": "postgres",
  "host": dbUrl,
  "port": 5432,
  "username": "app",
  "password": "app",
  "database": "app",
  "migrationsRun": false,
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entities/**/*.ts"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscribers/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  },
}
