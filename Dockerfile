FROM node:16
COPY ./ /mock-bank
WORKDIR /mock-bank
RUN npm i && npm run build

FROM nginx
RUN mkdir /mock-bank
COPY --from=0 /mock-bank/dist /mock-bank
COPY nginx.conf /etc/nginx/nginx.conf