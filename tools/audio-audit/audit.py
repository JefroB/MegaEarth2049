"""Inventory sound files and exact event/animation/active-plugin audio references."""
from pathlib import Path
import json,re,hashlib,collections
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
refs=[];transfers=[];interactions=[]
def add(cat,obj,source,**more):
 if not isinstance(obj,dict)or not obj.get('name'):return
 refs.append(dict(category=cat,name=obj['name'],volume=obj.get('volume',90),pitch=obj.get('pitch',100),pan=obj.get('pan',0),source=source,**more))
def commands(L,source):
 for i,c in enumerate(L):
  code=c['code'];p=c['parameters'];s=source+'/command'+str(i)
  if code in [241,245,249,250]:add({241:'bgm',245:'bgs',249:'me',250:'se'}[code],p[0],s,command=code)
  if code==205:
   for k,r in enumerate(p[1]['list']):
    if r['code']==44:add('se',r['parameters'][0],s+'/route'+str(k),command=44)
  if code==201:transfers.append(dict(source=s,parameters=p,explicitSoundNearby=any(t['code']in [249,250]for t in L[max(0,i-4):i+2])))
  if code in [355,655]:
   for m in re.finditer(r'AudioManager\.play(Se|StaticSe|Me|Bgm|Bgs)\(\s*\{[^}]*?name\s*:\s*[\"\']([^\"\']+)',p[0]):add({'Se':'se','StaticSe':'se','Me':'me','Bgm':'bgm','Bgs':'bgs'}[m[1]],dict(name=m[2]),s,scriptLiteral=True)
S=json.loads((ROOT/'data/System.json').read_text());
for i,se in enumerate(S['sounds']):add('se',se,'System/sounds/'+str(i))
for key,cat in [('battleBgm','bgm'),('titleBgm','bgm'),('defeatMe','me'),('gameoverMe','me'),('victoryMe','me')]:add(cat,S[key],'System/'+key)
A=json.loads((ROOT/'data/Animations.json').read_text());animations=[]
for a in A:
 if not a:continue
 for i,t in enumerate(a['timings']):add('se',t['se'],'Animation/'+str(a['id'])+'/timing'+str(i),animation=a['id'],frame=t['frame'])
 animations.append(dict(id=a['id'],name=a['name'],frames=len(a['frames']),sounds=[t['se']['name']for t in a['timings']if t.get('se')and t['se'].get('name')]))
for file in sorted((ROOT/'data').glob('Map[0-9][0-9][0-9].json')):
 m=json.loads(file.read_text());mid=int(file.stem[3:])
 if m['autoplayBgm']:add('bgm',m['bgm'],file.stem+'/autoplay')
 if m['autoplayBgs']:add('bgs',m['bgs'],file.stem+'/autoplay')
 for e in m['events']:
  if not e:continue
  for pi,pg in enumerate(e['pages']):
   key=file.stem+'/event'+str(e['id'])+'/page'+str(pi);commands(pg['list'],key)
   for i,r in enumerate(pg['moveRoute']['list']):
    if r['code']==44:add('se',r['parameters'][0],key+'/defaultRoute'+str(i),command=44)
   if pg['trigger']==0:interactions.append(dict(map=mid,event=e['id'],page=pi,name=e['name'],sounds=[c['parameters'][0]['name']for c in pg['list']if c['code']==250],commands=[c['code']for c in pg['list']]))
for file in ['CommonEvents','Troops']:
 for e in json.loads((ROOT/'data'/(file+'.json')).read_text()):
  if not e:continue
  for pi,pg in enumerate(e.get('pages',[e])):commands(pg['list'],file+'/'+str(e['id'])+'/page'+str(pi))
P=json.loads(re.search(r'var\s+\$plugins\s*=\s*(\[.*\]);',(ROOT/'js/plugins.js').read_text(),re.S)[1]);pluginReview=[]
for p in P:
 if not p['status']:continue
 file=ROOT/'js/plugins'/(p['name']+'.js');text=file.read_text(encoding='utf-8-sig',errors='replace');rows=[]
 for i,line in enumerate(text.splitlines(),1):
  if re.search(r'AudioManager|SoundManager|\bSE:|\bPLAY SE|sound',line,re.I):rows.append(dict(line=i,text=line[:240]))
 for m in re.finditer(r'AudioManager\.play(Se|StaticSe|Me|Bgm|Bgs)\(\s*\{[^}]*?name\s*:\s*[\"\']([^\"\']+)',text):add({'Se':'se','StaticSe':'se','Me':'me','Bgm':'bgm','Bgs':'bgs'}[m[1]],dict(name=m[2]),'plugin/'+p['name'],scriptLiteral=True)
 pluginReview.append(dict(name=p['name'],audioLines=rows))
files=[]
for cat in ['se','me','bgm','bgs']:
 grouped=collections.defaultdict(list)
 for p in(ROOT/'audio'/cat).iterdir():
  if p.is_file():grouped[p.stem].append(p)
 for name,paths in sorted(grouped.items()):files.append(dict(category=cat,name=name,formats=[p.suffix[1:]for p in paths],bytes=sum(p.stat().st_size for p in paths),referenced=sum(r['category']==cat and r['name']==name for r in refs)))
missing=[r for r in refs if not any(f['category']==r['category']and f['name']==r['name']for f in files)]
(OUT/'audit.json').write_text(json.dumps(dict(files=files,references=refs,missing=missing,animations=animations,interactions=interactions,transfers=transfers,plugins=pluginReview,limits=['Plugin literal calls and SoundManager usage reviewed; arbitrary dynamic JS filenames are not statically exhaustive.','An unreferenced asset is not proof it is useless; runtime defaults/dynamic calls can select it.','Silence alone is not an error; transfers and dialogue are not all physical doors or rewards.']),indent=2),encoding='utf8')
print('Audio names',dict(collections.Counter(f['category']for f in files)),'references',len(refs),'missing',len(missing));print('Missing',missing[:12]);print('SE-only-format',[(f['name'],f['formats'])for f in files if f['category']=='se'and len(f['formats'])<2]);print('Silent animations',[(a['id'],a['name'])for a in animations if not a['sounds']])
