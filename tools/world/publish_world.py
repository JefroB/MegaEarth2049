"""Publish validated staged maps, refusing to overwrite intervening edits."""
import json, shutil, zipfile
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
report=json.loads((HERE/'validation.json').read_text())
assert not report['errors'], 'Map validation must pass before publishing.'
manifest=json.loads((HERE/'manifest.json').read_text())
files=['MapInfos.json']+[f'Map{i:03}.json' for i in manifest['changed']]
with zipfile.ZipFile(HERE/'before-world-expansion.zip') as backup:
    for name in files:
        live=ROOT/'data'/name; staged=HERE/'staged'/name
        assert staged.exists(), f'Missing staged file: {name}'
        if live.exists():
            content=live.read_bytes()
            original=backup.read(name) if name in backup.namelist() else None
            assert content==original or content==staged.read_bytes(), f'{name} changed since the snapshot; reconcile before publishing.'
    for name in files:shutil.copy2(HERE/'staged'/name,ROOT/'data'/name)
print(f'Published {len(files)-1} maps and MapInfos.json. Original files remain in before-world-expansion.zip.')
