// Revisión de solo lectura del nuevo hero. No formularios ni mensajes externos.
import {spawn} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const OUT=new URL('./',import.meta.url).pathname;
const origin=process.env.REVIEW_ORIGIN||'http://localhost:4322';
const chrome=spawn(`${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,['--headless=new','--remote-debugging-port=9497','--no-sandbox','--disable-gpu','about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let ws;let seq=0;const pending=new Map(),errors=[],checks=[];
const check=(name,result)=>{assert.ok(result,name);checks.push(name);console.log('PASS '+name);};
try{
 for(let i=0;i<60;i++){try{const tabs=await(await fetch('http://127.0.0.1:9497/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);break;}catch{await pause(100);}}
 await new Promise(r=>ws.addEventListener('open',r));
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.description||a.value).join(' '));});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,m=>m.error?reject(m.error):resolve(m.result));ws.send(JSON.stringify({id,method,params}));});
 const js=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result?.value;};
 const wait=async expression=>{for(let i=0;i<120;i++){if(await js(expression))return;await pause(150);}throw Error('Timeout: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});writeFileSync(OUT+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:process.env.NORMAL_MOTION?'no-preference':'reduce'}]});
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:origin+'/nitro-complete'});await wait('document.readyState==="complete"&&!!document.querySelector("#nitro-orbita")');
 await wait('[...document.querySelectorAll("#nitro-orbita img")].every(i=>i.complete&&i.naturalWidth>0)');await pause(1500);
 check('imagen y logos reales cargan',await js('document.querySelectorAll("#nitro-orbita img").length===5&&[...document.querySelectorAll("#nitro-orbita img")].every(i=>i.complete&&i.naturalWidth>0)'));
 check('órbita aparece en el hero antes del video',await js('document.querySelector("#nitro-orbita").getBoundingClientRect().top<document.querySelector("#video").getBoundingClientRect().top'));
 check('contraentrega y pago anticipado presentes',await js('document.querySelector("#nitro-orbita").innerText.includes("Contraentrega")&&document.querySelector("#nitro-orbita").innerText.includes("Pago anticipado")'));
 check('se eliminó Con sonido del subtexto',await js('!document.querySelector("#video").innerText.includes("Con sonido")'));
 check('todos los enlaces de la órbita tienen destino real',await js('[...document.querySelectorAll("#nitro-orbita a")].every(a=>a.hash&&document.querySelector(a.hash))'));
 await shot('hero-escritorio');
 for(const width of [360,390,768,1024,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await pause(250);
  check('sin desbordamiento de página a '+width,await js('document.documentElement.scrollWidth<=innerWidth'));
  check('rótulos no se superponen a '+width,await js('(()=>{const [a,b]=document.querySelectorAll("#nitro-orbita>div>a");const x=a.getBoundingClientRect(),y=b.getBoundingClientRect();return x.right<=y.left||y.right<=x.left||x.bottom<=y.top||y.bottom<=x.top;})()'));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
 await js('window.scrollTo(0,0)');await pause(200);await shot('hero-movil');
 await js('document.querySelector("#nitro-orbita").scrollIntoView({block:"start"});window.scrollBy(0,-88)');await pause(300);await shot('orbita-movil');
 await js('document.querySelector("#nitro-orbita>div>a").click()');await pause(1000);
 check('desde contraentrega se llega al recorrido de pagos y envíos',await js('location.hash==="#integraciones"&&document.querySelector("#integraciones").getBoundingClientRect().top>=0&&document.querySelector("#integraciones").getBoundingClientRect().top<innerHeight'));
 check('sin errores de consola ni excepciones JS',errors.length===0);
 writeFileSync(OUT+(process.env.NORMAL_MOTION?'verification-normal-motion.json':'verification.json'),JSON.stringify({origin,checks,errors,scope:'Navegación local de solo lectura; sin envíos ni cambios en NitroBot.'},null,2));
}finally{ws?.close();chrome.kill();}
