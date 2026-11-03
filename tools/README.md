# Project tools

Run maintained commands from the project root unless their README says otherwise. Many `build.py`/`install.py` scripts are already-applied one-time construction records: read their guards and manifests; do not rerun them to inspect the game.

| Need | Entry point |
|---|---|
|Current counts and map/animation/tileset records|[Read-only project inspector](project-inspect/README.md)|
|NPC floor, transfer and collision audit|[Map placement audit](map-placement-audit/README.md)|
|Map rendering and world checks|[World tools](world/README.md)|
|Asset-reference and unfinished-art audits|`art-audit/`, `asset-refresh/`, `asset-variety/` reports/manifests|
|Companion chapter checks|`zack-story/`, `jen-story/`, `zed-story/`, `pink-story/`, [other five chapters](companions-final/README.md)|
|MAX-E-MUM art and integration|[MAX tools](max-e-mum/README.md)|
|Boss implementation and action checks|`bosses/`, `main-boss/`, `custodians/`, `legacy-bosses/`, `remaining-bosses/`|
|Weapon and state effects|`weapon-variety/`, `state-expansion/`, `state-expansion-2/`, [bounded additions](bounded-additions/README.md)|
|Quest/service checks|The corresponding feature folder; see [FAQ evidence index](../GameFAQs/FAQ_08_Technical_Issues.md#feature-verification-and-art-evidence)|
|Sound audit, playback and missing effects|[Audio audit tools](audio-audit/README.md)|
|Root cleanup/recovery|[Cleanup record](root-cleanup/README.md)|
|Old root script sources and reports|[Legacy root archive](legacy-root/README.md)|

The inspector reads only; redirect its printed JSON explicitly if you want a report. Feature tests can refresh their own evidence/screenshots. User saves and game databases must not be used as disposable test fixtures.
