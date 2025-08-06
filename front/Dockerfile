FROM node:22
WORKDIR /workdir

COPY . .
WORKDIR /workdir/next-app
RUN npm install
CMD ["npx", "next", "dev", "--turbopack"]
EXPOSE 3000
