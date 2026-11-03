# A04 execution

- [x] Preserve package/researcher/SEAM story and existing fight.
- [x] Add three actual clothing records with matching generated icons.
- [x] One-time choice reward and clear return directions.
- [x] Reopen safe clothing counters after hand-in.
- [x] Accept prior wins and owned module without replay.
- [x] Test decline, defeat/retry, victory, capacity, save/load and exact equipment effects.
- [x] Inspect native shop UI and update FAQs/backlog.

`node tools/burlap-quest/test.js`:39 checks, including live SEAM event callbacks and hand-in. Construction script is snapshot-guarded; do not rerun against already modified data. No plugins or SEAM animation assets were changed. See GameFAQs/FAQ_06_Quests_and_Storylines.md#burlap-pants-conspiracy.
