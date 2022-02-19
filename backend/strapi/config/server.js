module.exports = ({ env }) => ({
  host: process.env.STRAPI_HOST,
  port: process.env.STRAPI_PORT,
  url: 'https://dessertcorner.com',
  admin: {
    auth: {
      secret: process.env.JWT_SECRET,
    },
    url: '/admin'
  },
});