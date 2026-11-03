# GitHub workflow

The full working-project overhaul is published on `overhaul/megaearth-2026-11-02`, based on the existing `master` history. Current game data, production assets, generated source masters, plugins, local skills, tools, previews and documentation belong in version control. Read the [roadmap](../../GameFAQs/ROADMAP.md) for unfinished work; a published branch is not a claim that the whole campaign is finished.

Player saves/configuration (`save/`, `*.rpgsave`), dependency/cache folders and generated recovery ZIPs under `tools/` remain local. The reports and source manifests are tracked. Any reference to a local recovery snapshot means an optional local artifact, not a file available from a fresh GitHub clone. Native feature tests and historical preservation/snapshot checks are different evidence layers: the latter need their corresponding local snapshot.

Many build/install scripts are already-applied construction records with exclusive snapshot/ID guards. Do not rerun them over current data just because a snapshot is absent after cloning. Use the maintained [tool index](../../tools/README.md) and inspect a tool’s README. Some test harnesses currently refer to the local bundled Playwright runtime; a new development machine must provide that dependency/path before running those harnesses.

The branch represents the current organized project layout, including removal of old repository-only placeholder/backups/AI-tool directories that are absent from this working copy. The parent history preserves the previous version for review and recovery. Future gameplay work should branch from the chosen reviewed integration point; avoid forcing old snapshots over newer changes.
