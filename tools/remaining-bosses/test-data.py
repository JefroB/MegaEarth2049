import json,zipfile,hashlib
from pathlib import Path
root=Path.cwd();backup=zipfile.ZipFile('tools/remaining-bosses/before-remaining-v2.zip');checks=[]
for filename in ['Enemies','Troops','Skills','Items']:
 old=json.loads(backup.read('data/'+filename+'.json'));new=json.loads(Path('data/'+filename+'.json').read_text())
 for i,value in enumerate(old):
  actual=new[i]
  if filename=='Items' and i==137:
   assert value is None and actual['id']==137 and actual['itypeId']==2
   continue
  if filename=='Enemies' and i in [78,79,80,81,82]:actual=dict(actual);actual['note']=value['note']
  assert actual==value,(filename,i)
 checks.append(filename+': existing records preserved; only spider note tags and restored item137 differ')
for filename,slots in [('Map002',[23,26]),('Map030',[1,2])]:
 old=json.loads(backup.read('data/'+filename+'.json'));new=json.loads(Path('data/'+filename+'.json').read_text())
 for slot in slots:
  new['events'][slot]['pages'][0]['list']=old['events'][slot]['pages'][0]['list']
 assert new==old,filename
 checks.append(filename+': only selected encounter command lists changed')
for p,h in json.loads(Path('tools/remaining-bosses/protected-hashes.json').read_text()).items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==h,p
checks.append('PunkBoss, Repossessor and poop source artwork/plugins unchanged')
Path('tools/remaining-bosses/data-validation.json').write_text(json.dumps({'passed':True,'checks':checks},indent=2));print('\n'.join(checks))
