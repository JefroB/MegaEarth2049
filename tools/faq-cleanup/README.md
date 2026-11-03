# FAQ consolidation evidence

GameFAQs now contains eleven consecutively numbered topical FAQs and ROADMAP.md. Walkthroughs, service catalogs, local projects and completed-feature evidence were consolidated by subject. FAQ01 is the index; FAQ08 retains the completed A01–A26 register and repair history. ROADMAP B01–B16 contains only observed unresolved work or retained unfinished/unstarted proposals.

- `before.zip`: all34 original GameFAQs documents, before consolidation.
- `consolidate.py`: stages the consolidation from that immutable snapshot; it does not modify live files. Do not regenerate over later editorial changes without reviewing the staged diff.
- `consolidation.json`: all23 absorbed documents and three filename renames with destination anchors.
- `external-before.zip`: original referenced files changed outside GameFAQs, including historical document writers.
- `install.py`: exclusive-snapshot installer for the reviewed staged output and reference migration; already applied once. It rejects later mismatched state. The two old FAQ rewrite scripts are guarded to prevent recreating the superseded document layout; their historical bodies remain intact.
- `validate.py`: validates folder membership, contiguous numbers, source/destination coverage, completed A IDs, unfinished B IDs, retained route details and all local Markdown/HTML links and fragments in the final FAQs. It also checks migrated external links into GameFAQs.
- `validation.json`: concrete check results, changed references and any remaining failures.

Historical source indexes under tools/faq-audit retain original filenames as provenance; they are not active links or current walkthroughs. Old snapshot ZIP contents are intentionally untouched. Gameplay database, runtime plugins, save files and production art are unchanged by this cleanup.
