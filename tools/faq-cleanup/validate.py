"""Validate final FAQ layout, consolidation coverage and local links/fragments."""
from pathlib import Path
from urllib.parse import unquote,urlsplit
import json,re,sys,hashlib,zipfile
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent;F=ROOT/'GameFAQs';staged='--staged'in sys.argv;folder=OUT/'staged'if staged else F
m=json.loads((OUT/'consolidation.json').read_text());docs={p.name:p.read_text(encoding='utf-8-sig')for p in folder.glob('*.md')};checks=[];errors=[]
def ok(value,label):
 if value:checks.append(label)
 else:errors.append(label)
expected=set(m['stagedNames']);ok(set(p.name for p in folder.iterdir())==expected,'only eleven FAQs and ROADMAP remain')
ids=sorted(int(re.match(r'FAQ_(\d+)_',n)[1])for n in docs if n.startswith('FAQ_'));ok(ids==list(range(1,12)),'FAQ numbering contiguous01–11')
ok(set(m['absorbed'])==set(json.loads((OUT/'inventory.json').read_text()))-set(m['renames'])-{n for n in docs if n.startswith('FAQ_')and n not in m['renames'].values()},'every non-FAQ original has a destination')
# GFM automatic heading IDs, including repeated headings, plus explicit anchors.
def anchors(text):
 out=set(re.findall(r'<a\s+id="([^"]+)"',text));counts={}
 for line in text.splitlines():
  mat=re.match(r'^#{1,6}\s+(.+?)\s*#*$',line)
  if not mat:continue
  title=re.sub(r'\[([^]]+)\]\([^)]*\)',r'\1',mat[1]);title=re.sub(r'<[^>]+>','',title).replace('`','')
  base=re.sub(r'[^\w\- ]','',title.lower()).replace(' ','-');n=counts.get(base,0);counts[base]=n+1;out.add(base+('-'+str(n)if n else ''))
 return out
anchor_cache={n:anchors(s)for n,s in docs.items()};linkcount=0;externalcount=0
pat=re.compile(r'!?\[[^\]\n]*\]\(([^)\n]+)\)|(?:href|src)=[\"\']([^\"\']+)[\"\']')
def linkcheck(source,text,only_faq=False):
 global linkcount,externalcount
 for mat in pat.finditer(text):
  target=(mat[1]or mat[2]).strip().strip('<>');target=target.split(' "',1)[0]
  u=urlsplit(target)
  if u.scheme or u.netloc:continue
  if only_faq and 'GameFAQs/'not in unquote(u.path):continue
  path=(source.parent/unquote(u.path)).resolve()if u.path else source
  in_faq=path.parent==F;name=path.name;exists=name in docs if in_faq else path.exists()
  linkcount+=1
  if only_faq:externalcount+=1
  if not exists:errors.append(str(source.relative_to(ROOT))+': missing '+target);continue
  if u.fragment and path.suffix=='.md':
   aset=anchor_cache[name]if in_faq else anchors(path.read_text(encoding='utf-8-sig'))
   if unquote(u.fragment)not in aset:errors.append(str(source.relative_to(ROOT))+': missing fragment '+target)
for name,s in docs.items():
 ok(len(re.findall(r'^# ',s,re.M))==1,name+' has one document title')
 linkcheck(F/name,s)
for old,target in {**m['renames'],**m['absorbed']}.items():
 name,_,frag=target.partition('#');ok(name in docs and(not frag or frag in anchor_cache[name]),'consolidation destination valid: '+old)
# Preserve the usable outcomes/choices/rewards from each topical source, not just headings.
needles={
'FAQ_04_Characters_and_NPCs.md':['Physical cutoff','Clear detached module task','Return local joint control','Treatment notes only','Offline clinic chart','200','80 Credits','NeuraTech behavior controller','I can leave','Remove the dummy battery','Release bay clearance only','Verify owner access still works','Spotter Protocol','Active Recovery','Deload Slam'],
'FAQ_06_Quests_and_Storylines.md':['150 Credits','250 Credits','Juggle the invoice dates','Call the mime; mime innocence','Hot Links32','FOUR, ONE, THREE','180 Credits','80 Credits','three','38','25 projects'],
'FAQ_11_Body_Modification_System.md':['100 Credits','150 Credits','180 Credits','Mint Condition','Ultraviolet Liability','_meChromaticOwned','0 Credits'],
'FAQ_09_Disease_System.md':['67 public','4% HP','Paralysis','Temporal Stasis','Stone Skin','Beneficial Parasites'],
'FAQ_07_Secrets_and_Easter_Eggs.md':['250 Credits','100 Credits','Energy Drink','Key Item190'],
'FAQ_03_Locations_Guide.md':['one Panacea, two Green Herbs and 90 Credits','spaceship','251']}
for name,terms in needles.items():
 for term in terms:ok(term in docs[name],name+' retains '+term)
aids=re.findall(r'^\| A(\d+) \|',docs['FAQ_08_Technical_Issues.md'],re.M);ok(sorted(map(int,aids))==list(range(1,27)),'all26 completed A-identifiers retained once')
bids=re.findall(r'^\|B(\d+)\|',docs['ROADMAP.md'],re.M);ok(list(map(int,bids))==list(range(1,17)),'roadmap has16 unfinished B-items with stable IDs')
ok(not re.search(r'now(?:30|31|36|37)\b|(?:30|31|36|37) (?:tracked optional activities|optional activities|entries)', '\n'.join(docs.values())),'no stale current Completion Log totals')
if not staged:
 changed=json.loads((OUT/'external-references.json').read_text())['changed']
 for rel in changed:
  p=ROOT/rel
  if p.suffix in ['.md','.html']:linkcheck(p,p.read_text(encoding='utf8'),True)
 with zipfile.ZipFile(OUT/'external-before.zip')as z:
  ok(all(not n.startswith(('data/','js/plugins/','img/','save/'))for n in z.namelist()),'reference migration touches no gameplay databases, plugins, art or saves')
report=dict(passed=not errors,files=sorted(docs),checks=checks,localLinksChecked=linkcount,externalFaqLinksChecked=externalcount,errors=errors)
(OUT/('staged-validation.json'if staged else 'validation.json')).write_text(json.dumps(report,indent=2),encoding='utf8')
print('PASS'if not errors else 'FAIL',len(checks),'checks,',linkcount,'local links,',len(errors),'issues')
for e in errors:print(e)
sys.exit(bool(errors))
