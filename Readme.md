## MM-NextJS-Strapi Boilerplate

```
IMPORTANT:

Delete node_modules in ./backend/strapi
Delete package-lock.json in ./backend/strapi
Add self-signed SSL for localhost development
update hostfile /etc/hosts and add this entry
127.0.0.0 api.dessertcorner.com
127.0.0.0 admin.dessertcorner.com
Run npm run build in ./backend/strapi
move the build folder to ./nginx folder
```
- This is a boiler plate repo for NextJS + Strapi
- NextJS code is in frontend directory
- Backend directory has a strapi folder
- Strapi is running in Docker
- Nginx as reverse proxy to Strapi API for SSL
- Redis for backend cache
- MelliSearch Plugin for in-app search

```
mysqldump -p strapi > dump.strapi.sql
```
