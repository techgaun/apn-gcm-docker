# apn-gcm-docker
=============

This repo consists of Dockerfiles for [APNS](https://gist.githubusercontent.com/rahuloak/4949381/raw/server.js) and [GCM Mock](https://github.com/jondot/cottonballs)

### [APNS](https://gist.githubusercontent.com/rahuloak/4949381/raw/server.js)
```shell
$ docker pull techgaun/apns
$ docker run -d -p 7777:7777 -t techgaun/apns

```

### [GCM Mock](https://github.com/jondot/cottonballs)
```shell
$ docker pull techgaun/gcm
$ docker run --rm -t techgaun/gcm  #runs cottonballs -h by default
```

To run a gcm mock on port 7777 with failure ratio of 0.3 and latency 50 seconds,

```shell
$ docker run -p 443:443 -p 7777:7777 --rm --t techgaun/gcm -f 0.3 -l 50 -p 7777
```

### Mention
I was going to fix middleware issues but this [cottonballs fork](https://github.com/mbarnathan-amplify/cottonballs) had already fixed the issue.
