#!/bin/sh
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr -subj "/C=NP/ST=Bagmati/L=Kathmandu/O=IT/OU=Samy/emailAddress=lol@techgaun.com/CN=www.techgaun.com"
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
