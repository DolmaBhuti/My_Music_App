export const environment = {
  production: false,
  userAPIBase: process.env['userAPIBase'] || 'DEFAULT_API',
  clientID: process.env['clientID'] || 'DEFAULT_CLIENT_ID',
  clientSecret: process.env['clientSecret'] || 'DEFAULT_CLIENT_SECRET',
};
