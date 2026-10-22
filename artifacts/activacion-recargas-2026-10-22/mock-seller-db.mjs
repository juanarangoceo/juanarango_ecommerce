// PostgREST mínimo, solo para comprobar el recorrido local sin escribir en Supabase.
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
const tables = { sa_contacts: [], sa_messages: [], sa_settings: [{key:'bot_enabled',value:false}], sa_events: [] };
let fail = false;
const calls = [];
function matches(row, params) {
  for (const [key, value] of params) {
    if (['select','order','limit','offset','or','on_conflict'].includes(key)) continue;
    if (value.startsWith('eq.') && String(row[key]) !== value.slice(3)) return false;
    if (value.startsWith('is.') && value.slice(3)==='null' && row[key]!=null) return false;
    if (value.startsWith('in.(') && !value.slice(4,-1).split(',').includes(String(row[key]))) return false;
  }
  return true;
}
createServer(async (req,res) => {
  const url=new URL(req.url,'http://localhost');
  const reply=(status,data)=>{res.writeHead(status,{'content-type':'application/json'});res.end(data===undefined?'':JSON.stringify(data));};
  if (url.pathname==='/__reset') { for (const key of Object.keys(tables)) if(key!=='sa_settings') tables[key]=[];calls.length=0;fail=false;return reply(200,{ok:true}); }
  if (url.pathname==='/__snapshot') return reply(200,{tables,calls});
  if (url.pathname==='/__fail') { fail=url.searchParams.get('value')==='true';return reply(200,{fail}); }
  if (!url.pathname.startsWith('/rest/v1/')) return reply(404,{});
  if (fail) return reply(503,{message:'Caída simulada'});
  const table=url.pathname.split('/').at(-1);
  calls.push({method:req.method,table});
  tables[table] ||= [];
  let raw=''; for await (const part of req) raw+=part;
  const body=raw?JSON.parse(raw):{};
  if(req.method==='POST') {
    const key=table==='sa_contacts'?'wa_id':table==='sa_messages'?'wa_message_id':null;
    const duplicate=key && tables[table].find(r=>r[key]===body[key]);
    if(duplicate) {
      if(req.headers.prefer?.includes('ignore-duplicates')) return reply(201,[]);
      return reply(409,{code:'23505',message:'Duplicado local'});
    }
    const row={id:randomUUID(), created_at:new Date().toISOString(),updated_at:new Date().toISOString(), ...(table==='sa_contacts'?{facts:{},stage:'new',origin:null,offer:null,opted_out:false,bot_paused_until:null,last_inbound_at:null,last_outbound_at:null,followups_sent:0,next_action:null,next_action_at:null,max_stage_rank:0}:{}),...body};
    tables[table].push(row);return reply(201,[row]);
  }
  let rows=tables[table].filter(r=>matches(r,url.searchParams));
  if(req.method==='PATCH') { for(const row of rows) Object.assign(row,body);return reply(200,rows); }
  const order=url.searchParams.get('order');
  if(order){const [key,direction]=order.split('.');rows.sort((a,b)=>String(a[key]??'').localeCompare(String(b[key]??''))*(direction==='desc'?-1:1));}
  const limit=Number(url.searchParams.get('limit')||rows.length); rows=rows.slice(0,limit);
  if(req.headers.accept?.includes('vnd.pgrst.object')) return rows.length===1?reply(200,rows[0]):reply(406,{code:'PGRST116',message:'No hay fila'});
  reply(200,rows);
}).listen(4330,'127.0.0.1',()=>console.log('PostgREST aislado listo: 127.0.0.1:4330'));
