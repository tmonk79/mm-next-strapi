FROM strapi/base:14-alpine as base
WORKDIR /strapi
COPY . ./
RUN npm install
# RUN npm run build

FROM strapi/base:14-alpine
WORKDIR /strapi
COPY --from=base /strapi .
EXPOSE 1337
CMD ["npm", "start"]
