FROM google/nodejs

RUN apt-get install -y git
RUN git clone -b master https://github.com/techgaun/cottonballs.git /app
WORKDIR /app
RUN npm install
COPY genkeys.sh /app/
RUN chmod +x genkeys.sh && \
    ./genkeys.sh
CMD ["-h"]
ENTRYPOINT ["/nodejs/bin/node", "cottonballs"]
