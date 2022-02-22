module.exports = ({ env }) => ({
  host: process.env.STRAPI_HOST,
  port: process.env.STRAPI_PORT,
  url: 'https://api.dessertcorner.com',
  admin: {
    auth: {
      secret: process.env.JWT_ADMIN_SECRET,
    },
    url: '/admin'
  },
});
