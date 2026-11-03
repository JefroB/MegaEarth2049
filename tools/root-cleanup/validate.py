"""Verify root relocation, source integrity, runtime hashes and maintained entry points."""
from pathlib import Path
from urllib.parse import unquote,urlsplit
import json,hashlib,re,subprocess,sys,zipfile,os
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent;M=json.loads((OUT/'manifest.json').read_text());checks=[];errors=[]
def ok(v,s):
 if v:checks.append(s)
 else:errors.append(s)
ok({p.name for p in ROOT.iterdir()if p.is_file()}==set(M['rootKeep']),'root contains exactly five intended files')
with zipfile.ZipFile(OUT/'root-before.zip')as z:
 for old,new in M['moves'].items():
  target=ROOT/new;ok(target.exists(),'relocated target exists: '+old)
  if old.endswith(('.ps1','.bat')):ok(target.read_bytes()==z.read(old),'legacy script source byte-identical: '+old)
 ok(not(ROOT/'Rex.json').exists()and(ROOT/'characters/Rex.json').read_bytes()==z.read('Rex.json'),'only byte-identical Rex duplicate removed; canonical generator source preserved')
hashes=json.loads((OUT/'runtime-before.json').read_text());bad=[n for n,h in hashes.items()if not(ROOT/n).exists()or hashlib.sha256((ROOT/n).read_bytes()).hexdigest()!=h];ok(not bad,'all '+str(len(hashes))+' runtime/database/entry files byte-identical');errors+=bad
refs=json.loads((OUT/'references.json').read_text());links=0
for r in refs['links']:
 source=ROOT/M['moves'].get(r['source'],r['source']);u=urlsplit(r['new']);base=ROOT/'GameFAQs'if r['source'].startswith('tools/faq-cleanup/staged/')else source.parent
 target=(base/unquote(u.path)).resolve();ok(target.exists(),'migrated link exists: '+r['source']+' -> '+r['new']);links+=1
# Check newly authored navigation documents, not every already-broken historical link.
nav=['README.md','docs/README.md','docs/story/README.md','docs/reference/README.md','docs/archive/README.md','tools/README.md','tools/legacy-root/README.md','tools/project-inspect/README.md','tools/root-cleanup/inventory.md','tools/root-cleanup/README.md']
for name in nav:
 for t in re.findall(r'\[[^\]\n]+\]\(([^)\n]+)\)',(ROOT/name).read_text(encoding='utf-8-sig')):
  u=urlsplit(t)
  if not u.scheme:ok(((ROOT/name).parent/unquote(u.path)).resolve().exists(),'navigation link exists: '+name+' -> '+t)
# Relative-folder independence and invalid-ID rejection; inspector must write nothing.
inspector=str(ROOT/'tools/project-inspect/inspect.py');env=dict(os.environ,PYTHONIOENCODING='utf-8');runs=[]
for topic,id in [('summary',None),('maps',251),('animations',193),('tilesets',6)]:
 cmd=[sys.executable,'-X','utf8',inspector,topic]+(['--id',str(id)]if id else []);r=subprocess.run(cmd,cwd=ROOT.parent,env=env,capture_output=True,text=True,encoding='utf8');ok(r.returncode==0,'inspector works outside project cwd: '+topic);data=json.loads(r.stdout)
 if topic=='summary':ok(data['maps']==251 and data['actorRecords']==13 and data['startingParty']==[1,3,4],'inspector reports actual current map/actor/party data')
 else:ok(data[0]['id']==id,'inspector selects requested '+topic+' ID')
 runs.append(dict(topic=topic,returncode=r.returncode))
r=subprocess.run([sys.executable,inspector,'maps','--id','99999'],cwd=ROOT.parent,env=env,capture_output=True);ok(r.returncode!=0,'invalid inspector ID fails without mutation')
# All instructions referring to the moved continuity file must use its new root-relative path.
for name in ['theme-and-story','quests','mini-boss','main-boss']:
 p=ROOT/'.agent/skills'/name/'SKILL.md'
 if p.exists():
  s=p.read_text(encoding="utf-8-sig");ok(not re.search(r'(?<![/\w])STORY_PROGRESSION\.md',s),'skill story location updated: '+name)
report=dict(passed=not errors,checks=checks,runtimeFilesUnchanged=len(hashes),migratedLinksChecked=links,inspector=runs,errors=errors)
(OUT/'validation.json').write_text(json.dumps(report,indent=2),encoding='utf8');print('PASS'if not errors else 'FAIL',len(checks),'checks;',len(hashes),'runtime files;',links,'rebased links;',len(errors),'issues')
for e in errors:print(e)
sys.exit(bool(errors))
