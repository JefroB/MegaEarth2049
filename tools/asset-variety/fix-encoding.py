from pathlib import Path
for n in ['add-ninja-preview.py','write-report.py']:
 p=Path('tools/asset-variety')/n;s=p.read_text(encoding='utf-8');s=s.replace('p.read_text()',"p.read_text(encoding='utf-8')");p.write_text(s,encoding='utf-8')
