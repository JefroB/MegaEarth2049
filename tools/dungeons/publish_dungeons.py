"""Publish validated dungeon data without overwriting intervening edits."""
import json, shutil, zipfile
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
for name in ('validation.json','browser-validation.json'):
    assert json.loads((HERE/name).read_text())['passed'], f'{name} must pass'
files=sorted(p.name for p in (HERE/'staged').glob('*.json'))
with zipfile.ZipFile(HERE/'before-dungeons.zip') as backup:
    for name in files:
        live=ROOT/'data'/name
        if live.exists():
            original=backup.read(name) if name in backup.namelist() else None
            assert live.read_bytes() in (original,(HERE/'staged'/name).read_bytes()), f'Intervening edit: {name}'
    for name in files: shutil.copy2(HERE/'staged'/name,ROOT/'data'/name)
print(f'Published {len(files)} validated dungeon database files.')
