FROM node:18
WORKDIR /usr/src/app
COPY . .

RUN npm install

# wrangler is optional and needed
# if you want to use wrangler commands
RUN npm install -g wrangler
ENV WRANGLER_SEND_METRICS false

ENTRYPOINT ["/usr/local/bin/npm", "run"]
CMD ["start"]

EXPOSE 3000
