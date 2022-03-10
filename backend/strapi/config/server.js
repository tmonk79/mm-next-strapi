module.exports = ({ env }) => ({
  host: process.env.STRAPI_HOST,
  port: process.env.STRAPI_PORT,
  url: 'https://api.dessertcorner.com',
  admin: {
    url: '/',
    serveAdminPanel: false,
    auth: {
      secret: process.env.JWT_ADMIN_SECRET
    },
  },
});
