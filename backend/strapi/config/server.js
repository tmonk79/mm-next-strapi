module.exports = ({ env }) => ({
  host: process.env.STRAPI_HOST,
  port: process.env.STRAPI_PORT,
  admin: {
    auth: {
      secret: process.env.JWT_SECRET,
    },
  },
});
