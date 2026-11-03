from pathlib import Path
p=Path('tools/asset-refresh/fix-ninja-faces.js');s=p.read_text().replace('source,left,0,right-left,source.height,','source,left,Math.round((source.height-(right-left))*.2),right-left,right-left,');p.write_text(s)
