module.exports = ({ env }) => ({
  defaultConnection: env('DATABASE_CONNECTION_NAME', 'development'),
  connections: {
    development: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
    production: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST'),
        port: env('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: { rejectUnauthorized: false }
      },
      options: {
        pool:{
          min: 0,
          max: 20,
          idleTimeoutMillis: 30000,
          createTimeoutMillis: 30000,
          acquireTimeoutMillis: 30000
      }
      }
    }
  }
});
