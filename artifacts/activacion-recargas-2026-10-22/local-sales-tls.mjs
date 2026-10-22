// TLS local para ensayar el build de producción sin rebajar la validación HTTPS.
import { createServer } from 'node:https';
import { request } from 'node:http';
import { readFileSync } from 'node:fs';
createServer({ key:readFileSync('/tmp/nitro-local-sales.key'),cert:readFileSync('/tmp/nitro-local-sales.crt') }, (req,res)=>{
  const upstream=request({hostname:'127.0.0.1',port:4323,path:req.url,method:req.method,headers:req.headers},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res);});
  upstream.on('error',()=>{res.writeHead(502);res.end();});req.pipe(upstream);
}).listen(4331,'127.0.0.1',()=>console.log('TLS local listo: 127.0.0.1:4331'));
