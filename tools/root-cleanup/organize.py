"""Apply the reviewed root inventory; preserve original root and external sources."""
from pathlib import Path
from urllib.parse import urlsplit,unquote,quote
import os,re,json,zipfile
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent;M=json.loads((OUT/'manifest.json').read_text());moves=M['moves']
with zipfile.ZipFile(OUT/'root-before.zip')as z:
 assert set(z.namelist())=={p.name for p in ROOT.iterdir()if p.is_file()},'Root inventory changed'
 for name in z.namelist():assert z.read(name)==(ROOT/name).read_bytes(),'Root file changed: '+name
mapping={(ROOT/k).as_posix().lower():ROOT/v for k,v in moves.items()}
# Runtime code/assets are not rewritten by a document migration.
paths=[p for p in ROOT.iterdir()if p.is_file()and p.suffix=='.md']
for base in ['docs','GameFAQs','.agent','.kiro','art','tools']:
 if not(ROOT/base).exists():continue
 for p in(ROOT/base).rglob('*'):
  rel=p.relative_to(ROOT).as_posix()
  if not p.is_file()or p.suffix not in ['.md','.html','.py','.json']:continue
  if rel.startswith(('tools/root-cleanup/','tools/faq-audit/')):continue
  if p.suffix=='.json'and rel not in ['tools/state-expansion-2/manifest.json','tools/clown-court/manifest.json','tools/faq-cleanup/external-references.json']:continue
  paths.append(p)
def read(p):
 try:return p.read_text(encoding='utf-8-sig')
 except UnicodeDecodeError:return p.read_text(encoding='cp1252')
# Match standalone project filenames; qualified relative links are handled below.
bare={k:v for k,v in moves.items()if k!='README.md'}
pattern=re.compile(r'(?<![\w/\\.\-])('+'|'.join(re.escape(n)for n in sorted(bare,key=len,reverse=True))+r')(?![\w.\-])',re.I)
case={k.lower():v for k,v in bare.items()}
linkpat=re.compile(r'(!?\[[^\]\n]*\]\()([^\)\n]+)(\))|((?:href|src)=[\"\'])([^\"\']+)([\"\'])')
changes={};linkchanges=[]
for old in paths:
 rel=old.relative_to(ROOT).as_posix();dest=ROOT/moves[old.name]if old.parent==ROOT and old.name in moves else old
 if rel=='README.md':continue
 text=read(old);original=text;protected=[]
 # Staged FAQs have the logical base of the final FAQ documents.
 logical=ROOT/'GameFAQs'/old.name if rel.startswith('tools/faq-cleanup/staged/')else old
 def link(match):
  target=(match[2]or match[5]);u=urlsplit(target.strip('<>'))
  if not u.scheme and not u.netloc and u.path:
   resolved=(logical.parent/unquote(u.path)).resolve();new=mapping.get(resolved.as_posix().lower(),resolved)
   if new!=resolved or dest!=old:
    # Rebase only actual local targets or known relocation targets.
    if resolved.exists()or resolved.as_posix().lower()in mapping:
     base=(ROOT/'GameFAQs')if rel.startswith('tools/faq-cleanup/staged/')else dest.parent
     path=os.path.relpath(new,base).replace('\\','/');value=quote(path,safe='/._-')+('?' +u.query if u.query else '')+('#'+u.fragment if u.fragment else '')
     if value!=target:linkchanges.append(dict(source=rel,old=target,new=value))
     target=value
  value=(match[1]+target+match[3])if match[1]else(match[4]+target+match[6]);protected.append(value);return '__ROOT_RELOCATION_LINK_'+str(len(protected)-1)+'__'
 if old.suffix in ['.md','.html']:text=linkpat.sub(link,text)
 # Template-generated FAQs use one-parent-up links from their logical output.
 if old.suffix=='.py':
  for name in ['STORY_PROGRESSION.md','MegaEarth2049_Story.md','MegaEarth2049_GameStory.md']:text=text.replace('../'+name,'../'+moves[name])
 lines=[]
 for line in text.splitlines(keepends=True):
  if old.suffix=='.md'and re.match(r'^#{1,6} ',line):lines.append(line)
  else:lines.append(pattern.sub(lambda m:case[m[1].lower()],line))
 text=''.join(lines).replace('repository-root `docs/story/','`docs/story/')
 for i,value in enumerate(protected):text=text.replace('__ROOT_RELOCATION_LINK_'+str(i)+'__',value)
 if old.parent==ROOT and dest.parts:
  target=dest.relative_to(ROOT).as_posix()
  if target.startswith('docs/reference/'):
   note='Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.'
  elif target.startswith(('docs/archive/','tools/legacy-root/docs/')):note='Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.'
  else:note=None
  if note:text='> '+note+'\n\n'+text
 if text!=original:changes[rel]=(old.read_bytes(),dest,text)
with zipfile.ZipFile(OUT/'external-before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for rel,(raw,dest,text)in changes.items():
  if (ROOT/rel).parent!=ROOT:z.writestr(rel,raw)
# All file targets are checked before moving; no recursive directory operation.
for source,target in moves.items():
 src=(ROOT/source).resolve();dst=(ROOT/target).resolve();assert src.parent==ROOT and dst.is_relative_to(ROOT)
 if source==M['duplicate']:
  assert src.read_bytes()==dst.read_bytes();src.unlink();continue
 assert not dst.exists(),target;dst.parent.mkdir(parents=True,exist_ok=True);src.rename(dst)
for rel,(raw,dest,text)in changes.items():dest.write_text(text,encoding='utf8')
(OUT/'references.json').write_text(json.dumps(dict(changedFiles=[str(v[1].relative_to(ROOT)).replace('\\','/')for v in changes.values()],links=linkchanges),indent=2),encoding='utf8')
print('Moved',len(moves)-1,'files; removed one verified duplicate; migrated',len(changes),'text sources')
