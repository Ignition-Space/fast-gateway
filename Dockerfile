FROM mhart/alpine-node:16

RUN mkdir -p /home/app/

WORKDIR /home/app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start"]
