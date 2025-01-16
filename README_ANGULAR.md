# create project:

ng new client
ng serve

ng g environments

# SSL:

cd ssl
mkcert localhost
add this to anular.json after "serve": "builder": ...

"options": {
"sslCert": "ssl/localhost.pem",
"sslKey": "ssl/localhost-key.pem",
"ssl": true
},

# Tuto:

c: component
m: model
s: service
g: guard
interceptor

--flat to create in the same directory without create a new directory
--skip-test to skip tests

subscribe (fih next + error)
pipe
map
take
