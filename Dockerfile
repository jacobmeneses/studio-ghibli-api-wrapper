FROM node:20.9.0

RUN mkdir -p /var/lib/app
WORKDIR /var/lib/app
COPY startup.sh /var/lib/app
COPY package.json /var/lib/app
COPY package-lock.json /var/lib/app
COPY tsconfig.json /var/lib/app
COPY prisma/ /var/lib/app/prisma
RUN npm ci

COPY src/ /var/lib/app/src
RUN npm run tsc

CMD [ "./startup.sh" ]
