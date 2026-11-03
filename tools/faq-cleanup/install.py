"""Install the reviewed staged FAQ consolidation and migrate active references."""
from pathlib import Path
import json,zipfile,re
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent;F=ROOT/'GameFAQs';m=json.loads((OUT/'consolidation.json').read_text())
with zipfile.ZipFile(OUT/'before.zip')as z:
 assert {p.name for p in F.iterdir()}=={Path(n).name for n in z.namelist()},'Folder differs from reviewed snapshot'
 for name in z.namelist():assert (ROOT/name).read_bytes()==z.read(name),'Document edited since snapshot: '+name
names={**m['renames'],**{k:v for k,v in m['absorbed'].items()if k!='README.md'}}
def migrate(s):
 # Single-pass substitution prevents FAQ11 disease ->09 from affecting the new
 # body-modification11 target introduced by another mapping.
 pat=re.compile('|'.join(re.escape(n)for n in sorted(names,key=len,reverse=True)))
 return pat.sub(lambda x:names[x.group()],s).replace('GameFAQs/README.md','GameFAQs/FAQ_01_Getting_Started.md')
def read(p):
 try:return p.read_text(encoding='utf-8-sig')
 except UnicodeDecodeError:return p.read_text(encoding='cp1252')
changes={};guarded=['tools/faq-audit/rewrite.py','tools/backlog-repairs/docs.py']
for base in ['art','tools','.agent','.kiro']:
 for p in (ROOT/base).rglob('*'):
  rel=p.relative_to(ROOT).as_posix()
  if not p.is_file()or p.suffix not in ['.md','.html','.py','.js','.json']:continue
  if rel.startswith(('tools/faq-cleanup/','tools/faq-audit/'))or rel in guarded:continue
  # JSON outside the active source manifest is historical test/audit evidence.
  if p.suffix=='.json'and rel!='tools/state-expansion-2/manifest.json':continue
  old=read(p);new=migrate(old)
  if new!=old:changes[rel]=(p.read_bytes(),new)
for p in ROOT.glob('*.md'):
 old=read(p);new=migrate(old)
 if new!=old:changes[p.name]=(p.read_bytes(),new)
for rel in guarded:
 p=ROOT/rel;old=read(p);assert 'from __future__'not in old
 changes[rel]=(p.read_bytes(),'# Historical document writer; consolidated FAQs supersede this output layout.\nraise SystemExit("Retired FAQ writer: edit the consolidated FAQ_01–11 files and GameFAQs/ROADMAP.md. See tools/faq-cleanup/README.md.")\n'+old)
with zipfile.ZipFile(OUT/'external-before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for rel,(old,new)in changes.items():z.writestr(rel,old)
for rel,(_,new)in changes.items():(ROOT/rel).write_text(new,encoding='utf8')
final=set(m['stagedNames'])
for name in final:(F/name).write_bytes((OUT/'staged'/name).read_bytes())
for name in set(m['absorbed'])|set(m['renames']):
 p=F/name;assert p.resolve().parent==F.resolve()
 if name not in final:p.unlink()
(OUT/'external-references.json').write_text(json.dumps(dict(changed=sorted(changes),retiredWriters=guarded),indent=2),encoding='utf8')
print('Installed',len(final),'documents; updated',len(changes),'referencing files')
