/*:
 * @plugindesc Body & Firmware Field Guide: live effects, duration, cures and calibrated mods.
 * @author MegaEarth2049
 * @help Main menu: Field Guide. Clinics: Read field guide. Reusable Key Item178.
 * Categories -> OK to browse -> OK for scrolling details. Cancel goes back.
 * Reads database traits/effects at display time; no state/discovery save fields.
 * ME.FieldGuide.open() is safe outside battle and grants one free guide if absent.
 */
(function(){
 'use strict';
 window.ME=window.ME||{};
 var Guide=ME.FieldGuide={};
 var groups={
  diseases:[4,11,13,26,27,28,29,30,31,32,47,50,52,53,54,55,64,65,66,67,76],
  buffs:[15,19,20,23,56,57,58,59,68,69,70,71,79],
  debuffs:[1,5,6,7,8,9,10,16,21,22,24,25,33,34,35,36,39,40,41,42,48,49,51,60,61,62,63,72,73,74,75,77,78],
  implants:[62,63,64]
 };
 var paramNames=['Max HP','Max MP','ATK','DEF','MAT','MDF','AGI','LUK'];
 var xparamNames=['Hit rate','Evasion','Critical chance','Critical evasion','Magic evasion','Magic reflection','Counterattack','HP per turn','MP per turn','TP per turn'];
 var sparamNames=['Target rate','Guard effectiveness','Healing received','Item healing power','MP costs','TP gain','Physical damage received','Magic damage received','Floor damage received','EXP earned'];
 function num(n){return String(Math.round(n*100)/100);}
 function pct(n){return num(n*100)+'%';}
 function name(list,id,fallback){return list[id]&&list[id].name||fallback||String(id);}
 function traitLines(t){
  var v=t.value,id=t.dataId;
  switch(t.code){
   case 11:return [(($dataSystem.elements[id]||'Element')+' damage received x'+num(v))];
   case 12:return [(paramNames[id]||'Stat')+' debuff application rate x'+num(v)];
   case 13:return [name($dataStates,id)+' application rate x'+num(v)];
   case 14:return ['Immune to '+name($dataStates,id)];
   case 21:return [(paramNames[id]||'Stat')+' x'+num(v)+' ('+(v>=1?'+':'')+pct(v-1)+')'];
   case 22:
    if(id>=7)return [xparamNames[id]+': '+(v>=0?'+':'')+pct(v)+' of maximum'];
    return [(xparamNames[id]||'Rate')+': '+(v>=0?'+':'')+num(v*100)+' percentage points'];
   case 23:return [(sparamNames[id]||'Multiplier')+' x'+num(v)];
   case 41:return ['Adds '+($dataSystem.skillTypes[id]||'skill')+' commands'];
   case 42:return ['Seals '+($dataSystem.skillTypes[id]||'skill')+' commands'];
   case 43:return ['Grants '+name($dataSkills,id)];
   case 44:return ['Seals '+name($dataSkills,id)];
   case 62:return [['Auto battle','Guard','Cover','Preserve TP'][id]||'Special flag'];
   default:return ['Other passive modifier (type '+t.code+')'];
  }
 }
 function traits(o){var a=[];(o.traits||[]).forEach(function(t){a=a.concat(traitLines(t));});return a;}
 function duration(s){
  var a=[];
  if(s.autoRemovalTiming){a.push((s.minTurns===s.maxTurns?String(s.minTurns):s.minTurns+'-'+s.maxTurns)+' turns; '+(s.autoRemovalTiming===2?'turn-end removal.':'action-end removal checks.'));}
  else a.push('No automatic turn expiry.');
  a.push(s.removeAtBattleEnd?'Cleared when battle ends.':'Persists after battle unless removed.');
  if(s.removeByDamage)a.push(pct(s.chanceByDamage/100)+' removal chance when damaged.');
  if(s.removeByWalking)a.push('Walking removal after '+s.stepsToRemove+' steps.');
  return a;
 }
 function effects(list,code,id){return list.filter(function(o){return o&&o.name&&o.effects&&o.effects.some(function(e){return e.code===code&&e.dataId===id&&e.value1>0;});});}
 function targetLabel(o){return o.scope===11?'self':o.scope===7||o.scope===8?'ally':o.scope===9||o.scope===10?'fallen ally':'foe';}
 function namedRows(rows){return rows.map(function(o){return o.name+' ('+targetLabel(o)+')';});}
 function partyStatus(id){return $gameParty.allMembers().filter(function(a){return a.isStateAffected(id);}).map(function(a){var n=a._stateTurns[id];return a.name()+(n!==undefined&&$dataStates[id].autoRemovalTiming?' - '+n+' turn counters left':'');});}
 Guide.entries=function(group){return (groups[group]||[]).map(function(id){var implant=group==='implants',o=(implant?$dataArmors:$dataStates)[id];return {id:id,kind:implant?'implant':'state',name:o.name,icon:o.iconIndex};}).sort(function(a,b){return a.name.localeCompare(b.name);});};
 Guide.model=function(entry){
  var rows=[],o=entry.kind==='implant'?$dataArmors[entry.id]:$dataStates[entry.id];
  function heading(s){rows.push({text:s,heading:true});}
  function add(s){rows.push({text:s});}
  function lines(a){a.forEach(add);}
  heading(o.name);heading('Effects');lines(traits(o));
  if(entry.kind==='state'){
   var restriction=['','Attacks random foes.','Attacks random battlers, including allies.','Attacks allies.','Cannot act.'][o.restriction];
   if(restriction)add(restriction);
   heading('Duration');lines(duration(o));
   var active=partyStatus(entry.id);heading('Current party');lines(active.length?active:['Nobody currently affected.']);
   heading('Removal items');var items=effects($dataItems,22,entry.id).filter(function(i){return i.itypeId===1&&i.occasion!==3;});lines(items.length?namedRows(items):['No matching consumable listed.']);
   heading('Removal skills');var skills=effects($dataSkills,22,entry.id).filter(function(s){return s.occasion!==3;});lines(skills.length?namedRows(skills):['No matching skill listed.']);
   add('Clinic Recovery services clear states and restore HP/MP, including Knockout. Reading this guide does not treat the party.');
   if(entry.id===65)add('Removing Beneficial Parasites also removes its ATK/AGI bonuses.');
   if(entry.id===24)add('This condition restricts actions; ordinary cures may not cover it. Check the exact remover lists above.');
   heading('Known application sources');
   var sources=effects($dataItems,21,entry.id).filter(function(i){return i.itypeId===1&&i.occasion!==3;}).concat(effects($dataSkills,21,entry.id).filter(function(s){return s.occasion!==3;}));
   lines(sources.length?sources.map(function(s){var e=s.effects.filter(function(e){return e.code===21&&e.dataId===entry.id;})[0];return s.name+' - '+pct(e.value1)+' base chance ('+targetLabel(s)+')';}):['No direct item/skill source listed. Encounter scripts can also apply conditions.']);
   add('Base application chances may be reduced by hit checks and resistance. A listed skill may belong to an enemy or require a different character.');
  }else{
   var ids={62:[133,100],63:[134,150],64:[153,180]},r=ids[entry.id];
   heading('Fit and remove');add('Accessory slot; Clothing permission. One calibrated copy of each type per party.');add('Standard calibration: '+$dataItems[r[0]].name+' + '+r[1]+' Credits.');add('Prototype purchase: 500 Credits. B.M.N.E.C. reception, Dorlund triage, D Town technician, or Mod Center counter.');add('Equip in Equipment. Unequipping removes all listed effects. Return the unequipped module to a clinic to recover its prototype; the calibration fee is not refunded.');
   if($gameSwitches.value(221))add($gameSwitches.value(222)?'Your earned Zed calibration-fee waiver has been used. Standard fees apply.':'One earned Zed fee waiver is available: the next valid calibration costs 0 Credits. You must still supply its prototype; prototype purchases remain 500 Credits.');
   if(entry.id===63)add('The original or calibrated Third Eye reveals the Underworks maintenance bypass while carried or equipped.');
   heading('Current party / inventory');var equipped=$gameParty.allMembers().filter(function(a){return a.equips().indexOf(o)>=0;}).map(function(a){return a.name();});add('Carried modules: '+$gameParty.numItems(o)+'. Equipped by: '+(equipped.join(', ')||'nobody')+'.');add('Prototype owned: '+$gameParty.numItems($dataItems[r[0]])+'.');
  }
  return {name:o.name,icon:o.iconIndex,rows:rows};
 };
 Guide.open=function(){
  if(!$gameParty||$gameParty.inBattle()||!$dataItems[178])return false;
  if(!$gameParty.hasItem($dataItems[178]))$gameParty.gainItem($dataItems[178],1);
  SceneManager.push(Scene_MEFieldGuide);return true;
 };
 function Window_GuideTabs(){this.initialize.apply(this,arguments);}
 Window_GuideTabs.prototype=Object.create(Window_HorzCommand.prototype);Window_GuideTabs.prototype.constructor=Window_GuideTabs;
 Window_GuideTabs.prototype.windowWidth=function(){return Graphics.boxWidth;};
 Window_GuideTabs.prototype.maxCols=function(){return 4;};
 Window_GuideTabs.prototype.makeCommandList=function(){this.addCommand('Diseases','diseases');this.addCommand('Buffs','buffs');this.addCommand('Debuffs','debuffs');this.addCommand('Implants','implants');};
 Window_GuideTabs.prototype.select=function(index){var previous=this.currentSymbol();Window_HorzCommand.prototype.select.call(this,index);if(this.onChange&&previous!==this.currentSymbol())this.onChange(this.currentSymbol());};
 function Window_GuideList(){this.initialize.apply(this,arguments);}
 Window_GuideList.prototype=Object.create(Window_Selectable.prototype);Window_GuideList.prototype.constructor=Window_GuideList;
 Window_GuideList.prototype.initialize=function(x,y,w,h){this._data=[];Window_Selectable.prototype.initialize.call(this,x,y,w,h);};
 Window_GuideList.prototype.standardFontSize=function(){return 22;};
 Window_GuideList.prototype.lineHeight=function(){return 34;};
 Window_GuideList.prototype.maxItems=function(){return this._data.length;};
 Window_GuideList.prototype.item=function(){return this._data[this.index()];};
 Window_GuideList.prototype.setCategory=function(group){this._data=Guide.entries(group);this.refresh();this.select(0);this.setTopRow(0);};
 Window_GuideList.prototype.select=function(index){Window_Selectable.prototype.select.call(this,index);if(this.onChange)this.onChange(this.item());};
 Window_GuideList.prototype.drawItem=function(index){var e=this._data[index],r=this.itemRectForText(index);if(!e)return;this.drawIcon(e.icon,r.x,r.y+1);this.drawText(e.name,r.x+36,r.y,r.width-36);};
 function Window_GuideDetail(){this.initialize.apply(this,arguments);}
 Window_GuideDetail.prototype=Object.create(Window_Selectable.prototype);Window_GuideDetail.prototype.constructor=Window_GuideDetail;
 Window_GuideDetail.prototype.initialize=function(x,y,w,h){this._data=[];Window_Selectable.prototype.initialize.call(this,x,y,w,h);};
 Window_GuideDetail.prototype.standardFontSize=function(){return 22;};
 Window_GuideDetail.prototype.lineHeight=function(){return 32;};
 Window_GuideDetail.prototype.maxItems=function(){return this._data.length;};
 Window_GuideDetail.prototype.updateCursor=function(){this.setCursorRect(0,0,0,0);};
 Window_GuideDetail.prototype.setEntry=function(entry){this._entry=entry;this._data=[];this.resetFontSettings();var self=this,width=this.contentsWidth()-8;this._model=entry?Guide.model(entry):null;if(this._model)this._model.rows.forEach(function(row){var words=row.text.split(/\s+/),line='';words.forEach(function(word){var next=line?line+' '+word:word;if(line&&self.textWidth(next)>width){self._data.push({text:line,heading:row.heading});line=word;}else line=next;});if(line)self._data.push({text:line,heading:row.heading});});this.refresh();this.select(0);this.setTopRow(0);};
 Window_GuideDetail.prototype.drawItem=function(index){var row=this._data[index],r=this.itemRectForText(index);if(!row)return;this.changeTextColor(row.heading?'#ffe0a1':this.normalColor());this.drawText(row.text,r.x,r.y,r.width);this.resetTextColor();};
 function Scene_MEFieldGuide(){this.initialize.apply(this,arguments);}
 Scene_MEFieldGuide.prototype=Object.create(Scene_MenuBase.prototype);Scene_MEFieldGuide.prototype.constructor=Scene_MEFieldGuide;
 Scene_MEFieldGuide.prototype.create=function(){
  Scene_MenuBase.prototype.create.call(this);var w=Graphics.boxWidth,h=Graphics.boxHeight,head=72,tabs=72,foot=72,listWidth=Math.floor(w*.34),body=h-head-tabs-foot;
  this._titleWindow=new Window_Base(0,0,w,head);this._titleWindow.contents.fontSize=26;this._titleWindow.drawText('Body & Firmware Field Guide',0,0,w-36);this.addWindow(this._titleWindow);
  this._tabs=new Window_GuideTabs(0,head);this.addWindow(this._tabs);
  this._list=new Window_GuideList(0,head+tabs,listWidth,body);this.addWindow(this._list);
  this._detail=new Window_GuideDetail(listWidth,head+tabs,w-listWidth,body);this.addWindow(this._detail);
  this._footer=new Window_Base(0,h-foot,w,foot);this.addWindow(this._footer);
  this._list.onChange=function(entry){this._detail.setEntry(entry);}.bind(this);
  this._tabs.onChange=function(group){this._list.setCategory(group);}.bind(this);
  this._tabs.setHandler('ok',this.browse.bind(this));this._tabs.setHandler('cancel',this.popScene.bind(this));
  this._list.setHandler('ok',this.read.bind(this));this._list.setHandler('cancel',this.categories.bind(this));
  this._detail.setHandler('cancel',this.browse.bind(this));
  this._list.setCategory('diseases');this.categories();
 };
 Scene_MEFieldGuide.prototype.hint=function(text){this._footer.contents.clear();this._footer.contents.fontSize=19;this._footer.drawText(text,0,0,this._footer.contentsWidth());};
 Scene_MEFieldGuide.prototype.categories=function(){this._list.deactivate();this._detail.deactivate();this._tabs.activate();this.hint('Left/Right: category   OK: browse   Cancel: close');};
 Scene_MEFieldGuide.prototype.browse=function(){this._tabs.deactivate();this._detail.deactivate();this._list.activate();this.hint('Up/Down: entries   OK: scroll details   Cancel: categories');};
 Scene_MEFieldGuide.prototype.read=function(){this._tabs.deactivate();this._list.deactivate();this._detail.activate();this.hint('Up/Down or Page keys: details   Cancel: entries');};
 Guide.Scene=Scene_MEFieldGuide;
 var addCommands=Window_MenuCommand.prototype.addOriginalCommands;
 Window_MenuCommand.prototype.addOriginalCommands=function(){addCommands.call(this);this.addCommand('Field Guide','meFieldGuide',true);};
 var menuCreate=Scene_Menu.prototype.createCommandWindow;
 Scene_Menu.prototype.createCommandWindow=function(){menuCreate.call(this);this._commandWindow.setHandler('meFieldGuide',Guide.open);};
})();
