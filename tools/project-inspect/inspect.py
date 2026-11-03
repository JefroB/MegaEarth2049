"""Read-only inspections of the live MV database; works from any working directory."""
from pathlib import Path
import argparse,json
ROOT=Path(__file__).resolve().parents[2]
def load(name):return json.loads((ROOT/'data'/(name+'.json')).read_text(encoding='utf-8-sig'))
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('topic',choices=['summary','maps','animations','tilesets']);p.add_argument('--id',type=int);a=p.parse_args()
 if a.topic=='summary':
  if a.id is not None:p.error('--id applies to maps, animations or tilesets')
  s=load('System');result=dict(maps=len(list((ROOT/'data').glob('Map[0-9][0-9][0-9].json'))),actorRecords=sum(bool(v)for v in load('Actors')),classes=sum(bool(v)for v in load('Classes')),skills=sum(bool(v and v['name'])for v in load('Skills')),animations=sum(bool(v)for v in load('Animations')),tilesets=sum(bool(v)for v in load('Tilesets')),startingParty=s['partyMembers'])
 else:
  table=load({'maps':'MapInfos','animations':'Animations','tilesets':'Tilesets'}[a.topic]);rows=[v for v in table if v]
  if a.id is not None:
   rows=[v for v in rows if v['id']==a.id]
   if not rows:p.error('No '+a.topic+' record with ID '+str(a.id))
  result=[]
  for row in rows:
   q=dict(id=row['id'],name=row['name'])
   if a.topic=='maps':
    file=ROOT/'data'/('Map'+str(row['id']).zfill(3)+'.json')
    if file.exists():
     m=json.loads(file.read_text(encoding='utf-8-sig'));q.update(width=m['width'],height=m['height'],tileset=m['tilesetId'],activeEvents=sum(bool(e and e['pages'])for e in m['events']))
     if a.id is not None:q['events']=[dict(id=e['id'],name=e['name'],x=e['x'],y=e['y'],pages=len(e['pages']))for e in m['events']if e and e['pages']]
    else:q['missingFile']=True
   elif a.topic=='animations':q.update(frames=len(row['frames']),position=row['position'],sheets=[row['animation1Name'],row['animation2Name']])
   else:q.update(mode=row['mode'],sheets=row['tilesetNames'],flagCount=len(row['flags']))
   result.append(q)
 print(json.dumps(result,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
