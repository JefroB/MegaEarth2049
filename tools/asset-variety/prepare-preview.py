from pathlib import Path
p=Path('tools/asset-refresh/write-preview.py');s=p.read_text();s=s.replace("s+='</div><h2>Screen treatment</h2>","s+='</div><h2>Screen treatment</h2>")
# Keep the base generator intact; postprocess is a separate repeatable step.
p=Path('tools/asset-variety/add-ninja-preview.py');p.write_text('''from pathlib import Path
import json
p=Path('art/ui/preview.html');s=p.read_text()
start='<!-- ninja colors -->';end='<!-- end ninja colors -->'
if start in s:s=s[:s.index(start)]+s[s.index(end)+len(end):]
rows=[('Red','ninja1',0),('Black','ninja1',1),('Pink','ninja2',0),('Green','ninja2',1),('Blue','ninja2',2),('Brown','ninja2',3),('Purple','ninja2',4)]
section=start+'<h2>Ninja portrait colors</h2><div class="portraits">'+''.join('<article><canvas class="ninjaFace" width="144" height="144" data-sheet="'+sheet+'" data-slot="'+str(slot)+'"></canvas>'+name+'</article>' for name,sheet,slot in rows)+'</div><script>document.querySelectorAll(".ninjaFace").forEach(c=>{let im=new Image();im.onload=()=>{let i=+c.dataset.slot;c.getContext("2d").drawImage(im,i%4*144,Math.floor(i/4)*144,144,144,0,0,144,144)};im.src="../../img/faces/"+c.dataset.sheet+".png?rev=diverse-v2"});</script>'+end
s=s.replace('<h2>Actor command portraits</h2>',section+'<h2>Actor command portraits</h2>')
s=s.replace('Face_6.png"','Face_6.png?rev=diverse-v2"')
p.write_text(s,encoding='utf-8')
''')
