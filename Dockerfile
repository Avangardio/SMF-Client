FROM node:16-alpine as dependencies
WORKDIR /SMF-Client
COPY ../package.json ./
RUN npm run install

FROM node:16-alpine as builder
WORKDIR /SMF
COPY .. .
COPY --from=dependencies /SMF-Client/node_modules ./node_modules
RUN npm build

FROM node:16-alpine as runner
WORKDIR /SMF
ENV NODE_ENV production
ENV NEXT_PUBLIC_FINANCE_LINK='https://finance.savemyfinance.com'
ENV NEXT_PUBLIC_AUTH_LINK='https://login.savemyfinance.com'
ENV NEXTAUTH_URL='https://savemyfinance.com
'
COPY --from=builder /SMF-Client/public ./public
COPY --from=builder /SMF-Client/package.json ./package.json
COPY --from=builder /SMF-Client/.next ./.next
COPY --from=builder /SMF-Client/node_modules ./node_modules

EXPOSE 8080
CMD ["npm", "start"]