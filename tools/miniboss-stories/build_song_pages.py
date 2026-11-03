import json,textwrap
from pathlib import Path
P=Path(__file__).resolve().parent
songs=json.loads((P/'songs.json').read_text())
names={'Duke':'The Deductible Duke','Clap':'Admiral Clap','Widow':'The Ticket Widow'}
def cmd(n,p): return dict(code=n,indent=0,parameters=p)
def dialogue(name,lines):
 out=[cmd(101,['',0,0,2]),cmd(401,[name+' sings:'])]
 for line in lines:
  out += [cmd(101,['',0,0,2])]+[cmd(401,[s]) for s in textwrap.wrap(line,43,break_on_hyphens=False)]
 return out+[cmd(0,[])]
result={}
for k,s in songs.items():
 pages=[]
 for a,b,verse in [(0,0,s['intro']),(2,4,s['verses'][0]),(4,4,s['verses'][1])]:
  conditions=dict(actorHp=50,actorId=1,actorValid=False,enemyHp=50,enemyIndex=0,enemyValid=False,switchId=1,switchValid=False,turnA=a,turnB=b,turnEnding=False,turnValid=True)
  pages.append(dict(conditions=conditions,span=0 if b==0 else 1,list=dialogue(names[k],verse)))
 result[k]=dict(boss=names[k],status='Authored; awaiting real combat troop',pages=pages,victoryBranchCommands=dialogue(names[k],s['defeat'])[:-1])
(P/'troop-song-pages.json').write_text(json.dumps(result,indent=2))
doc=['# Native battle songs\n','Three singers: Deductible Duke (insurance jingle), Admiral Clap (sea shanty), Ticket Widow (hold music). Text dialogue, not recorded vocals. No custom plugin or rhythm input.\n','Existing precedent: Troop 36, Poopoo Caca, uses native Show Text commands. The story bible describes singing enemies and a rhyming dictionary; no working dictionary integration or completed singing encounter was found in live events.\n','Rhyme references: [condition/commission](https://www.rhymeplug.com/rhymes/commission), [clap family](https://www.rhymezone.com/r/rhyme.cgi?Word=clap&typeofrhyme=perfect), [hold/cold/gold/sold](https://www.rhymezone.com/r/rhyme.cgi?Word=hold&typeofrhyme=perfect). Lyrics are original.\n','Merge pages from troop-song-pages.json into the corresponding real troops when built; preserve existing combat pages. Turn 0 introduction uses Battle span. Turns 2 + 4X and 4 + 4X alternate verses using Turn span, preventing repeats from multiple actions. Messages advance through native player input. Put victoryBranchCommands inside the map victory branch before rewards, never the loss branch: death of the final enemy may end battle before an HP-zero troop page runs.\n','The three singing troops are now installed by tools/custodians/install.py (Duke 55, Clap 57, Widow 59). Opening and recurring verses run in battle. Victory couplets still await map encounter victory branches. No songs were added to dossiers or unrelated existing troops.\n']
for k,s in songs.items():
 doc+=['## '+names[k]+'\n',s['style']+'\n']
 for title,verse in [('Opening',s['intro']),('Turn 2 + 4X',s['verses'][0]),('Turn 4 + 4X',s['verses'][1]),('Victory branch',s['defeat'])]:
  doc+=['**'+title+'**\n','\n'.join('> '+line+'  ' for line in verse)+'\n']
(P/'BATTLE-SONGS.md').write_text('\n'.join(doc))
