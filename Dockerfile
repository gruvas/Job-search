FROM node:alpine
WORKDIR /app
EXPOSE 3000
ENV NOVE_ENV=production
COPY ./ /app
RUN npm install
CMD ["npm", "start"]