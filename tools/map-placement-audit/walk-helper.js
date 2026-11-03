// Native walking approach. Never teleport to event.y+1 or trust one passable edge.
module.exports=async function walk(page,id){return page.evaluate(async id=>{
 function floor(x,y){if(!$gameMap.isValid(x,y))return false;let ids=[0,1,2,3].map(z=>$gameMap.tileId(x,y,z)),t=ids[1]||ids[0];return ((t>=1536&&t<2048)||(t>=2816&&t<4352))&&ids.slice(2).every(t=>!t||($gameMap.mapId()===10&&[288,289,290,291,296].includes(t)));}
 const e=$gameMap.event(id),goals=[];for(const[dx,dy,d]of[[0,1,8],[-1,0,6],[1,0,4],[0,-1,2]]){if(floor(e.x+dx,e.y+dy))goals.push([e.x+dx,e.y+dy,d]);}
 if(!floor($gamePlayer.x,$gamePlayer.y))throw Error('Fixture did not start on clear floor: '+$gameMap.mapId()+' '+$gamePlayer.x+','+$gamePlayer.y);
 const queue=[[$gamePlayer.x,$gamePlayer.y,[]]],seen=new Set([$gamePlayer.x+','+$gamePlayer.y]);let route;
 for(let i=0;i<queue.length;i++){let[x,y,dirs]=queue[i],g=goals.find(g=>g[0]===x&&g[1]===y);if(g){route={dirs,facing:g[2]};break;}for(const[dx,dy,d]of[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]]){let xx=x+dx,yy=y+dy,key=xx+','+yy;if(seen.has(key)||!floor(xx,yy)||$gameMap.eventsXyNt(xx,yy).some(e=>e.isNormalPriority()||e.isTriggerIn([1,2]))||!$gamePlayer.canPass(x,y,d))continue;seen.add(key);queue.push([xx,yy,dirs.concat(d)]);}}
 if(!route)throw Error('No clear-floor walking approach to '+$gameMap.mapId()+'/'+id);
 const speed=$gamePlayer._moveSpeed;$gamePlayer.setMoveSpeed(6);try{for(const d of route.dirs){$gamePlayer.moveStraight(d);if(!$gamePlayer.isMovementSucceeded())throw Error('Native move blocked');await new Promise(resolve=>{let timer=setInterval(()=>{if(!$gamePlayer.isMoving()){clearInterval(timer);resolve();}},5);});if(!floor($gamePlayer.x,$gamePlayer.y))throw Error('Walk left floor');}}finally{$gamePlayer.setMoveSpeed(speed);}
 $gamePlayer.setDirection(route.facing);window.walkedSteps=(window.walkedSteps||0)+route.dirs.length;return {map:$gameMap.mapId(),event:id,x:$gamePlayer.x,y:$gamePlayer.y,steps:route.dirs.length};
 },id);};
