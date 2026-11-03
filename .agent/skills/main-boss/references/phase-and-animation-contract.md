# Phase and animation contract

This is a design contract, not an API already implemented by RPG Maker MV or the existing boss plugins. Adapt fields to the real implementation and keep the runtime manifest authoritative.

## Record before implementation

For each phase, record its entry condition, allowed attack IDs, selection priorities/weights, cooldowns, and whether it retains earlier moves. For each attack, record:

| Field | Purpose |
|---|---|
| Stable ID and native skill ID | Associate the mechanic with the database action |
| Allowed phases | Explicit eligibility, including phase-two-only moves |
| Warning and response opportunity | What players perceive and can do before impact |
| Target policy | When targets lock and what happens if they become invalid |
| Animation sequences | Named anticipation, execution and recovery, with source frames, common scale, anchors and timing |
| Impact cues | Which queued engine steps apply damage/effects; how multi-hit actions synchronize |
| Interrupt/cancel policy | Which conditions cancel, delay or change the action and its visuals |
| Cooldown/recovery | Prevent unreadable burst chains and create response opportunities |

Keep animation events separate from gameplay effects: drawing another frame must never apply damage again. Frame playback must not choose skills or modify phase state.

## Transition policy

Prefer a latched phase state on the battler for the current encounter. Once phase two starts, healing above the threshold does not restore phase one. Reset state on a new encounter/retry; do not store temporary phase state in a global quest switch.

Default timing: mark a transition pending when HP crosses the threshold, finish the current resolving action, then process the transition at a safe action boundary before selecting subsequent boss actions. Document what happens to queued multi-action turns. Retain a valid already-announced attack or cancel it visibly; never silently substitute a newly unlocked attack for an old warning. Revalidate phase eligibility at selection and execution, including forced actions, against the phase allowed by this policy.

Announce the transition once, finish its animation/dialogue, and grant a normal warning/response opportunity before a newly unlocked dangerous move. A transition is not automatically a free damaging turn, full heal, invulnerability window or extra action. Add those only if deliberately designed, communicated and balanced.

Death takes precedence over a pending transition. Lethal damage that crosses the threshold should win normally unless an explicit multi-life encounter is requested. Do not secretly clamp HP to force phase two. Resolve simultaneous death, damage-over-time and multi-hit threshold crossings without duplicate transitions, duplicate effects or a stuck log queue.

Specify target invalidation and interrupt behavior for every charged attack. Losing a marked target should cancel or visibly retarget with the promised warning, not hit another actor without notice. Stun, silence, death, missed warning turns and charge expiry must not leave a stale effect or later surprise attack.

## Useful verification scenarios

| Scenario | Evidence to collect |
|---|---|
| Several phase-one turns | Only permitted attack IDs and their matching animations execute |
| Just above, exactly at, and below threshold | Defined boundary works; transition queues once |
| Cross threshold mid-action or multi-hit | Current action completes coherently; transition does not duplicate |
| Phase-one warning already queued | Documented continuation/cancellation preserves the response window |
| Phase-two attack forced during phase one | Controller rejects or safely replaces it without showing the locked motion |
| Heal above threshold afterward | Phase stays latched; no repeated intro or unlock reset |
| Kill while transition is pending | Native victory resolves without an unintended resurrection |
| Interrupt or invalidate target | Charge, animation and gameplay resolve under the same cancellation policy |
| Exercise each phase-two move | New motion plays; effects occur once at the intended cue; counterplay works |
| Escape/defeat and retry | Intended outcome; clean phase, charge, cooldown and animation state |

Use deterministic selection or a test-only seed to cover moves reliably, then also play through the ordinary selection loop. Do not ship testing overrides in the production fight. Assess difficulty with the intended party and equipment; fast synthetic kills validate callbacks, not balance.
