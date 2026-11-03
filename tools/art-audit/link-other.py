from pathlib import Path
import html
P=Path('tools/art-audit');p=P/'index.html';s=p.read_text();s+='<h2>Expanded audit: items and other assets</h2><p>Includes unfinished assets for future integration.</p><ul>'+''.join('<li><a href="'+f.name+'">'+html.escape(f.stem)+'</a></li>' for f in sorted(P.glob('*.html')) if f.name.startswith(('icons-','other-')))+'</ul>';p.write_text(s,encoding='utf-8')
