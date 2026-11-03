// Browser smoke test of the staged expansion with the game's installed plugins.
const fs=require('fs'),http=require('http'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),stage=path.join(__dirname,'staged');
const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.png':'image/png','.css':'text/css','.woff':'font/woff','.ttf':'font/ttf','.ogg':'audio/ogg','.m4a':'audio/mp4'};
const errors=[];
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 if(/^\/data\/Map(?:\d+|Infos)\.json$/.test(pathname)&&fs.existsSync(path.join(stage,path.basename(file))))file=path.join(stage,path.basename(file));
 fs.readFile(file,(err,buf)=>{if(err){res.writeHead(404);res.end();}else{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(buf);}});
});
(async()=>{
 let browser;
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  browser=await chromium.launch({channel:'chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:1100,height:820}});
  page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(()=>window.SceneManager&&SceneManager._scene instanceof Scene_Title,{},{timeout:30000});
  await page.evaluate(()=>{DataManager.setupNewGame();$gamePlayer.reserveTransfer(105,9,23,8,0);SceneManager.goto(Scene_Map);});
  await page.waitForFunction(()=>window.$gameMap&&$gameMap.mapId()===105&&SceneManager._scene instanceof Scene_Map&&SceneManager._scene.isActive()&&ImageManager.isReady(),{},{timeout:30000});
  const result=await page.evaluate(()=>{
   const start=[$gamePlayer.x,$gamePlayer.y],queue=[start],seen=new Map([[start.join(','),[]]]),dirs=[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]];
   for(let i=0;i<queue.length;i++){let [x,y]=queue[i];for(let [dx,dy,d]of dirs){let nx=x+dx,ny=y+dy,k=nx+','+ny;if(!seen.has(k)&&$gamePlayer.canPass(x,y,d)){seen.set(k,[...seen.get(x+','+y),d]);queue.push([nx,ny]);}}}
   return {map:$gameMap.mapId(),reachableTiles:seen.size,upperDock:seen.get('31,14'),lowerDock:seen.get('28,22'),error:document.getElementById('ErrorPrinter')?.textContent};
  });
  if(!result.upperDock||!result.lowerDock)throw Error('Installed-plugin movement cannot reach both dock ends: '+JSON.stringify(result));
  // Walk the lower-dock route with normal player movement, including all collisions.
  for(const d of result.lowerDock){await page.evaluate(d=>$gamePlayer.executeMove(d),d);await page.waitForFunction(()=>!$gamePlayer.isMoving());}
  await page.screenshot({path:path.join(__dirname,'previews','in-game-dock.png')});
  result.finalPosition=await page.evaluate(()=>[$gamePlayer.x,$gamePlayer.y]);
  result.loadedMaps=[];
  const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'manifest.json')));
  for(const mid of manifest.changed.filter(id=>id!==1)){
   await page.evaluate(mid=>{$gameMap._interpreter.clear();$gamePlayer.reserveTransfer(mid,1,1,2,0);},mid);
   await page.waitForFunction(mid=>$gameMap.mapId()===mid&&!$gamePlayer.isTransferring()&&SceneManager._scene.isActive()&&ImageManager.isReady(),mid,{timeout:15000});
   result.loadedMaps.push(mid);
  }
  result.pageErrors=errors;
  fs.writeFileSync(path.join(__dirname,'browser-validation.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
 }catch(e){console.error(e.stack);console.error('Browser errors:',errors);process.exitCode=1;}
 finally{if(browser)await browser.close();server.close();}
})();
