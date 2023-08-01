# written with the help of gpt-4. Magic!
FROM node:18-alpine
ARG NODE_ENV='production'
WORKDIR /recip_elf/api
COPY ./api .
RUN npm ci
EXPOSE 3000
CMD [ "node", "bin/www" ]
