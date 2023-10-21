## Blog
This repository is a part of a blog which explains how to use keycloak as a authentication broker for a NextJS v13 application. Please go through this [blog](https://medium.com/@harshbhandariv/secure-nextjs-v13-application-with-keycloak-6f68406bb3b5)


## Getting Started

### Run keycloak with a postgres database
```bash
docker compose up -d
```
> Please note that the above method cannot be used for production.

### Run the development server

```bash
NODE_OPTIONS='--dns-result-order=ipv4first' npm run dev
```

### To build the project
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To start the nextjs server(production mode)
```bash
NODE_OPTIONS='--dns-result-order=ipv4first'  npm start
```
> Make sure to setup the environment variables.
