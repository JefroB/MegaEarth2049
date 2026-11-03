// Packing only: preserve all alpha and disconnected artwork. No masking.
const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const mp='tools/bounded-additions/crops-v2.json',m=JSON.parse(fs.readFileSync(mp));
 const cells=m.cells.map(c=>({...c,url:path.relative(process.cwd(),path.resolve(path.dirname(mp),c.source)).replace(/\\/g,'/')}));
 const b=await chromium.launch({channel:'chrome',headless:true});
 try{
  const p=await b.newPage();await p.route('http://game.test/**',r=>r.fulfill({path:path.resolve(decodeURIComponent(new URL(r.request().url()).pathname.slice(1)))}));await p.goto('http://game.test/index.html');
  const result=await p.evaluate(async cells=>{
   const load=src=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>j(Error(src));i.src=src;});
   const images={};for(const c of cells)if(!images[c.url])images[c.url]=await load(c.url);
   const old=await load('img/system/IconSet.png'),icons=document.createElement('canvas'),sheet=document.createElement('canvas');
   icons.width=512;icons.height=Math.max(old.height,Math.ceil(2129/16)*32);sheet.width=sheet.height=960;
   const ix=icons.getContext('2d'),sx=sheet.getContext('2d');ix.drawImage(old,0,0);
   function contain(q,im,rect,x,y,size,extent){const[a,b,w,h]=rect,s=extent/Math.max(w,h),dw=Math.round(w*s),dh=Math.round(h*s);q.drawImage(im,a,b,w,h,x+Math.floor((size-dw)/2),y+Math.floor((size-dh)/2),dw,dh);}
   cells.forEach((c,k)=>{const[x,y]=c.target_rect;ix.clearRect(x,y,32,32);contain(ix,images[c.url],c.source_rect,x,y,32,26);contain(sx,images[c.url],c.source_rect,k%5*192,Math.floor(k/5)*192,192,150);});
   return {icons:icons.toDataURL().split(',')[1],sheet:sheet.toDataURL().split(',')[1]};
  },cells);
  fs.writeFileSync('img/system/IconSet.png',Buffer.from(result.icons,'base64'));fs.writeFileSync('img/animations/ME_BoundedAdditions.png',Buffer.from(result.sheet,'base64'));
  const runtime={...m,alpha_threshold:0,source_margin:0,target_margin:2,cells:m.cells.flatMap((c,k)=>[
   {...c,name:c.name+' icon',source:'../../img/system/IconSet.png',source_rect:c.target_rect},
   {...c,name:c.name+' effect',source:'../../img/animations/ME_BoundedAdditions.png',source_rect:[k%5*192,Math.floor(k/5)*192,192,192],target:'../../img/animations/ME_BoundedAdditions.png',target_rect:[k%5*192,Math.floor(k/5)*192,192,192],target_margin:16}
  ])};fs.writeFileSync('tools/bounded-additions/runtime-cells.json',JSON.stringify(runtime,null,2));
  const rows=m.cells.map((c,k)=>({name:c.name,id:c.id,pattern:k}));
  fs.writeFileSync('art/bounded/preview.html',`<!doctype html><meta charset="utf-8"><title>Bounded additions — exact runtime cells</title><style>body{background:#182433;color:#eef4fa;font:16px system-ui;margin:24px}#cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}.card{background:#26394b;padding:14px;border-radius:8px}h2{font-size:17px;min-height:42px}.pair{display:flex;gap:10px;align-items:center}.sample{padding:6px;background:#f4ede1}.dark{background:#08121c}canvas{display:block;image-rendering:pixelated}.effect{margin-top:8px;background:#101b28}p{max-width:950px;line-height:1.5}</style><h1>Salvage, off-clock stories & combat states</h1><p>Each card samples the production IconSet at 32px and 3× on light and dark backgrounds. The larger view samples the exact 192px native effect cell. Measured crops preserve alpha and separate pieces.</p><p><a style="color:#9df" href="animations.html">Play the five native battle effects</a></p><div id="cards"></div><script>const rows=${JSON.stringify(rows)};const load=s=>new Promise(r=>{let i=new Image;i.onload=()=>r(i);i.src=s});(async()=>{const icons=await load('../../img/system/IconSet.png'),effects=await load('../../img/animations/ME_BoundedAdditions.png');for(const r of rows){let card=document.createElement('div');card.className='card';card.innerHTML='<h2>'+r.id+' · '+r.name+'</h2>';for(const dark of[false,true]){let pair=document.createElement('div');pair.className='pair sample'+(dark?' dark':'');for(const size of[32,96]){let c=document.createElement('canvas');c.width=c.height=size;let q=c.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(icons,r.id%16*32,Math.floor(r.id/16)*32,32,32,0,0,size,size);pair.append(c)}card.append(pair)}let c=document.createElement('canvas');c.className='effect';c.width=c.height=192;c.getContext('2d').drawImage(effects,r.pattern%5*192,Math.floor(r.pattern/5)*192,192,192,0,0,192,192);card.append(c);cards.append(card)}})();</script>`);
  await p.goto('http://game.test/art/bounded/preview.html');await p.waitForFunction(()=>document.querySelectorAll('.card').length===24);await p.screenshot({path:'art/bounded/icons.png',fullPage:true});
  console.log('Packed 24 measured illustrations without masks; exact runtime-cell manifest and preview written.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exit(1)});
