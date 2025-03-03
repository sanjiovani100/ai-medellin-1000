import { z } from 'zod';

/**
 * Environment variables schema validation using Zod
 * This ensures type safety and validation for all environment variables
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // Database configuration
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().min(1),
  DATABASE_POOL_SIZE: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().int().positive().default(10)
  ),
  
  // API configuration
  API_BASE_URL: z.string().url().optional(),
  API_TIMEOUT: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().int().positive()
  ).optional().default('30000'),
  
  // Cache configuration (for production)
  CACHE_TTL: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().int().nonnegative()
  ).optional().default('300'), // 5 minutes in seconds
  
  // Application settings
  APP_URL: z.string().url(),
  APP_SECRET: z.string().min(32),
  
  // Logging configuration
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Auth configuration
  AUTH_PROVIDER: z.enum(['supabase', 'auth0', 'custom']).default('supabase'),
  AUTH_SECRET: z.string().min(1),
  
  // Feature flags
  ENABLE_ANALYTICS: z.enum(['true', 'false']).transform((val) => val === 'true').default('false'),
  ENABLE_WHATSAPP: z.enum(['true', 'false']).transform((val) => val === 'true').default('false'),
});

/**
 * Validate environment variables against the schema
 * Throws detailed errors if validation fails
 */
function validateEnv() {
  try {
    // Process environment variables
    const env = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
      DATABASE_POOL_SIZE: process.env.DATABASE_POOL_SIZE || '10',
      API_BASE_URL: process.env.API_BASE_URL,
      API_TIMEOUT: process.env.API_TIMEOUT || '30000',
      CACHE_TTL: process.env.CACHE_TTL || '300',
      APP_URL: process.env.APP_URL,
      APP_SECRET: process.env.APP_SECRET,
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      AUTH_PROVIDER: process.env.AUTH_PROVIDER || 'supabase',
      AUTH_SECRET: process.env.AUTH_SECRET,
      ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS || 'false',
      ENABLE_WHATSAPP: process.env.ENABLE_WHATSAPP || 'false',
    };

    // Validate and return the parsed environment
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(
        error.format(),
        null,
        2
      );
      throw new Error(`❌ Invalid environment variables: ${errorMessage}`);
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Type-safe access to all environment variables
 */
export const env = validateEnv();

/**
 * Type definition for environment variables
 * Use this type for strong typing throughout the application
 */
export type Env = z.infer<typeof envSchema>;