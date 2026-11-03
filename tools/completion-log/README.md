# Completion Log verification

Plugin: `js/plugins/ME_CompletionLog.js`; enabled after `ME_FieldGuide` in `js/plugins.js`. The previous plugin configuration is preserved in `before.zip`. No database records, assets, switches, variables or save properties were added.

```
node --check js/plugins/ME_CompletionLog.js
node tools/completion-log/test.js
node tools/field-guide/test.js
```

The test reads the actual maze manifest for independent quest-ID expectations. It exercises native game objects and actual menu windows through headless Chrome/Playwright. It checks both pending and paid states, current-item versus durable completion semantics, legacy researcher self-switches, category/list/detail keyboard navigation, text bounds and an exact serialized-save comparison before/after UI browsing. Fixture flags are injected only into in-memory test saves. Screenshots show fixture progress, not a claimed player completion.

No source progress fields are normalized or repaired by the plugin. Old completed flags are honored even if old intermediate records are absent. The scope is30 recorded optional activities, not every game action. The API `ME.CompletionLog.entries(category)` and `.summary()` are pure reads; `.open()` changes the UI scene only and rejects battle use.
