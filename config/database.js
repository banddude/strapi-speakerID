module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST', 'ixcehxfeiwkhawkxauvs.supabase.co'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'postgres'),
            user: env('DATABASE_USERNAME', 'postgres'),
            password: env('DATABASE_PASSWORD', ''),
            schema: env('DATABASE_SCHEMA', 'public'),
            ssl: {
                rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
            },
        },
        debug: false,
        pool: { min: 0, max: 7 },
    }
});