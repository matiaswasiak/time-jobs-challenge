/* eslint-disable prettier/prettier */
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  apiKey: process.env.API_KEY,
});
