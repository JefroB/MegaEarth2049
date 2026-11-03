# Root cleanup record

The November2,2026 cleanup moves127 root files into story/reference/archive/tool folders, removes the root Rex.json only after verifying equality with characters/Rex.json, and keeps five root files: README.md, .gitignore, index.html, package.json and Game.rpgproject.

- [inventory.md](inventory.md) and [manifest.json](manifest.json): every old path, new location and classification.
- root-before.zip (local snapshot: `root-before.zip`): all133 original root files, including the removed exact duplicate.
- external-before.zip (local snapshot: `external-before.zip`): original text sources changed outside the root to migrate references.
- [runtime-before.json](runtime-before.json): pre-cleanup hashes for the entire data/ and js/ trees and the three runtime/editor entry files.
- [references.json](references.json): rewritten text sources and individual rebased links.
- `organize.py`: already-applied relocation, guarded against a changed original inventory. All file targets are checked inside the workspace; no runtime directory is moved.
- `validate.py` and [validation.json](validation.json): root layout, move coverage, original-script integrity, runtime/database hashes, current links, story references, duplicate preservation and inspector smoke evidence.

Older scripts are archived as non-executable text. The read-only tools/project-inspect command replaces basic counting/listing, while existing feature-specific tools remain in place. Historical database/plugin references carry a snapshot notice; old quest guides are not promoted to current walkthroughs.

Recovery is manual and selective: inspect the ZIP and manifest before restoring a file, and do not extract an old snapshot over subsequent gameplay work. This cleanup changes organization and documentation references, not story outcomes, gameplay databases, runtime plugins, production images or saves.
