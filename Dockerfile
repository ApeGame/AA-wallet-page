FROM node:16
COPY ./ /AA-wallet-page
WORKDIR /AA-wallet-page
RUN npm i && npm run build

FROM nginx
RUN mkdir /AA-wallet-page
COPY --from=0 /AA-wallet-page/dist /AA-wallet-page
COPY nginx.conf /etc/nginx/nginx.conf