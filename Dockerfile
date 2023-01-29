FROM node:18

WORKDIR /app

RUN apt-get update && apt -y upgrade && apt -y autoremove
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt -y install ./google-chrome-stable_current_amd64.deb

RUN apt-get -y install xvfb

COPY . .

RUN npm install

CMD [ "npm", "run", "docker" ]