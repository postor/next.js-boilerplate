# nextjs-http2-example

将nextjs服务升级到http2的例子

## 迁出代码、安装依赖

```
git checkout https://github.com/postor/nextjs-http2-example.git
cd nextjs-http2-example
npm install
```

## 生成证书自己的证书（可跳过）

```
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

## 启动服务

```
node server.js
```
