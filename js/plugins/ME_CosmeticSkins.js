/*:
 * @plugindesc A24: reversible Rex chromatic-skin presets with matching native art.
 * @author MegaEarth2049
 * @help Clinic counters offer Chromatic skin: Rex. Mint80 / Ultraviolet120 Credits
 * once per preset; owned refitting and original appearance are free. Visual only.
 * Uses native hue rendering of existing art; frame geometry/alpha never changes.
 * ME.Cosmetics.open() is available outside battle with conscious walking Rex.
 */
(function(){
 'use strict';
 window.ME=window.ME||{};
 var Skin=ME.Cosmetics={},styles=[
  {id:'base',name:'Original appearance',hue:0,cost:0,description:'Factory-original Rex. All the original problems, none of the coating.'},
  {id:'mint',name:'Mint Condition',hue:90,cost:80,description:'Green-tinted skin and a chromatic coat projection. Fresh corpse sold separately.'},
  {id:'ultraviolet',name:'Ultraviolet Liability',hue:240,cost:120,description:'Violet-tinted skin and a chromatic coat projection. Your insurer can still see you.'}
 ];
 var types={walk:{folder:'img/characters/',source:'Rex_walk'},face:{folder:'img/faces/',source:'Rex'},battle:{folder:'img/sv_actors/',source:'Rex'}},virtual={};
 function byId(id){return styles.filter(function(s){return s.id===id;})[0];}
 function file(type,id){return id==='base'?types[type].source:'ME_Chromatic_'+type+'_'+id;}
 styles.forEach(function(s){if(s.id==='base')return;Object.keys(types).forEach(function(t){virtual[file(t,s.id)]={folder:types[t].folder,source:types[t].source,hue:s.hue};});});
 // Save thumbnails and asynchronous request queues use different native loaders.
 ['loadBitmap','reserveBitmap','requestBitmap'].forEach(function(method){var original=ImageManager[method];ImageManager[method]=function(folder,name,hue){var args=Array.prototype.slice.call(arguments),v=virtual[name];if(v&&v.folder===folder){args[1]=v.source;args[2]=((Number(hue)||0)+v.hue)%360;}return original.apply(this,args);};});
 function rex(){return window.$gameActors&&$gameActors.actor(1);}
 function canonical(a){return !!a&&a.actorId()===1&&a._characterName==='Rex_walk'&&a._characterIndex===0&&a._faceName==='Rex'&&a._faceIndex===0&&a._battlerName==='Rex';}
 Skin.owned=function(id){var a=rex();return id==='base'||!!(a&&a._meChromaticOwned&&a._meChromaticOwned[id]);};
 Skin.current=function(){var a=rex(),id=a&&a._meChromaticStyle;return canonical(a)&&byId(id)&&Skin.owned(id)?id:'base';};
 Skin.catalog=function(){return styles.map(function(s){return {id:s.id,name:s.name,hue:s.hue,cost:s.cost,description:s.description,owned:Skin.owned(s.id),active:Skin.current()===s.id};});};
 Skin.filename=function(type,id){return types[type]&&byId(id)?file(type,id):null;};
 Skin.ready=function(){return !!(window.$gameParty&&!$gameParty.inBattle()&&$gameParty.battleMembers().some(function(a){return a.actorId()===1&&a.isAlive();}));};
 Skin.fit=function(id){var s=byId(id),a=rex();if(!s)return {ok:false,reason:'Unknown finish.'};if(!Skin.ready())return {ok:false,reason:'Bring Rex conscious in the walking party. No charge.'};if(!canonical(a))return {ok:false,reason:'Finish the current disguise or special appearance first. No charge.'};var cost=Skin.owned(id)?0:s.cost;if($gameParty.gold()<cost)return {ok:false,reason:'Not enough Credits. No charge.'};if(cost){$gameParty.loseGold(cost);a._meChromaticOwned=a._meChromaticOwned||{};a._meChromaticOwned[id]=true;}a._meChromaticStyle=id;$gamePlayer.refresh();return {ok:true,charged:cost,id:id};};
 [['characterName','walk'],['faceName','face'],['battlerName','battle']].forEach(function(pair){var original=Game_Actor.prototype[pair[0]];Game_Actor.prototype[pair[0]]=function(){var name=original.call(this),id=Skin.current();return this.actorId()===1&&id!=='base'?file(pair[1],id):name;};});
 // Native event dialogue often names Rex's face directly rather than the actor.
 var face=Game_Message.prototype.setFaceImage;Game_Message.prototype.setFaceImage=function(name,index){if(name==='Rex'&&index===0&&Skin.current()!=='base')name=file('face',Skin.current());face.call(this,name,index);};
 function List(){this.initialize.apply(this,arguments);}List.prototype=Object.create(Window_Selectable.prototype);List.prototype.constructor=List;
 List.prototype.initialize=function(x,y,w,h){Window_Selectable.prototype.initialize.call(this,x,y,w,h);this.select(0);this.refresh();};
 List.prototype.maxItems=function(){return styles.length;};List.prototype.itemHeight=function(){return 88;};List.prototype.standardFontSize=function(){return 18;};
 List.prototype.select=function(i){Window_Selectable.prototype.select.call(this,i);if(this.changed)this.changed(i);};
 List.prototype.drawItem=function(i){var s=styles[i],r=this.itemRectForText(i);this.resetFontSettings();this.changeTextColor(Skin.current()===s.id?'#a7efba':this.normalColor());this.drawText(s.name,r.x,r.y,r.width);this.resetTextColor();this.contents.fontSize=17;this.drawText(Skin.current()===s.id?'Active':Skin.owned(s.id)?'Unlocked - free fitting':s.cost+' Credits to unlock',r.x,r.y+32,r.width);this.resetFontSettings();};
 function Preview(){this.initialize.apply(this,arguments);}Preview.prototype=Object.create(Window_Base.prototype);Preview.prototype.constructor=Preview;
 Preview.prototype.standardFontSize=function(){return 20;};
 Preview.prototype.setStyle=function(i){this._style=styles[i]||styles[0];this._tick=0;this.refresh();};
 Preview.prototype.update=function(){Window_Base.prototype.update.call(this);if(this._style&&++this._tick%18===0)this.refresh();};
 function wrap(w,t,y){var line='',rows=[];t.split(/\s+/).forEach(function(word){var n=line?line+' '+word:word;if(line&&w.textWidth(n)>w.contentsWidth()-8){rows.push(line);line=word;}else line=n;});if(line)rows.push(line);rows.forEach(function(t,i){w.drawText(t,4,y+i*28,w.contentsWidth()-8);});return y+rows.length*28;}
 Preview.prototype.refresh=function(){if(!this.contents||!this._style)return;this.contents.clear();this.resetFontSettings();var id=this._style.id,face=ImageManager.loadFace(file('face',id)),walk=ImageManager.loadCharacter(file('walk',id)),sv=ImageManager.loadSvActor(file('battle',id));if(!face.isReady()||!walk.isReady()||!sv.isReady()){var self=this;[face,walk,sv].forEach(function(b){if(!b.isReady())b.addLoadListener(function(){self.refresh();});});return;}
  this.drawText('Face',4,0,150);this.drawText('Walking',190,0,150);this.drawText('Battle',354,0,150);
  this.contents.blt(face,0,0,144,144,4,42,144,144);var pattern=[0,1,2,1][Math.floor((this._tick||0)/18)%4],cw=walk.width/12,ch=walk.height/8;this.contents.blt(walk,pattern*cw,0,cw,ch,198,76,cw*2,ch*2);var bw=sv.width/9,bh=sv.height/6;this.contents.blt(sv,pattern*bw,bh,bw,bh,358,58,bw*2,bh*2);
  var y=198;this.changeTextColor(this.systemColor());this.drawText(this._style.name,4,y,this.contentsWidth()-8);this.resetTextColor();y=wrap(this,this._style.description,y+34);y=wrap(this,'Visual only. No gameplay bonuses.',y+8);wrap(this,Skin.owned(id)?'Unlocked. Refitting and restoration: free.':'Unlock: '+this._style.cost+' Credits. Refitting is free.',y+8);
 };
 function Confirm(){this.initialize.apply(this,arguments);}Confirm.prototype=Object.create(Window_Command.prototype);Confirm.prototype.constructor=Confirm;
 Confirm.prototype.windowWidth=function(){return 470;};Confirm.prototype.standardFontSize=function(){return 20;};Confirm.prototype.makeCommandList=function(){var s=styles[this._styleIndex||0],cost=Skin.owned(s.id)?0:s.cost;this.addCommand(cost?'Fit / pay '+cost+' Credits':'Fit / no charge','fit');this.addCommand('Cancel','cancel');};
 function Scene(){this.initialize.apply(this,arguments);}Scene.prototype=Object.create(Scene_MenuBase.prototype);Scene.prototype.constructor=Scene;
 Scene.prototype.create=function(){Scene_MenuBase.prototype.create.call(this);var w=Graphics.boxWidth,h=Graphics.boxHeight,top=108,foot=108,lw=260;this._title=new Window_Base(0,0,w,top);this._title.contents.fontSize=26;this._title.drawText('Chromatic Skin - Rex',0,0,w-36);this._title.contents.fontSize=19;this._title.drawText('Coating and projection. Nothing under the skin is replaced.',0,36,w-36);this.addWindow(this._title);this._list=new List(0,top,lw,h-top-foot);this.addWindow(this._list);this._preview=new Preview(lw,top,w-lw,h-top-foot);this.addWindow(this._preview);this._footer=new Window_Base(0,h-foot,w,foot);this.addWindow(this._footer);this._confirm=new Confirm((w-470)/2,(h-108)/2);this._confirm.hide();this._confirm.deactivate();this.addWindow(this._confirm);this._list.changed=function(i){this._preview.setStyle(i);this.hint('OK: review fitting   Cancel: leave');}.bind(this);this._list.setHandler('ok',this.confirm.bind(this));this._list.setHandler('cancel',this.popScene.bind(this));this._confirm.setHandler('fit',this.fit.bind(this));this._confirm.setHandler('cancel',this.cancel.bind(this));this._list.select(0);this._list.activate();};
 Scene.prototype.hint=function(t){this._footer.contents.clear();this._footer.contents.fontSize=19;this._footer.drawText(t,0,0,this._footer.contentsWidth());this._footer.drawText('Credits: '+$gameParty.gold()+'   Original appearance: always free',0,32,this._footer.contentsWidth());};
 Scene.prototype.confirm=function(){this._list.deactivate();this._confirm._styleIndex=this._list.index();this._confirm.refresh();this._confirm.select(1);this._confirm.show();this._confirm.activate();};
 Scene.prototype.cancel=function(){this._confirm.hide();this._confirm.deactivate();this._list.activate();};
 Scene.prototype.fit=function(){var result=Skin.fit(styles[this._list.index()].id);this.cancel();if(result.ok){SoundManager.playEquip();this._list.refresh();this._preview.refresh();this.hint(result.charged?'Finish unlocked and fitted: '+result.charged+' Credits.':'Appearance fitted. No charge.');}else{SoundManager.playBuzzer();this.hint(result.reason);}};
 Skin.Scene=Scene;Skin.open=function(){if(!Skin.ready()||!canonical(rex()))return false;if(!(SceneManager._scene instanceof Scene)&&!(SceneManager._nextScene instanceof Scene))SceneManager.push(Scene);return true;};
})();
