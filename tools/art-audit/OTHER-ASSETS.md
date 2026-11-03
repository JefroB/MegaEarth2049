# Status: implemented

The findings below are the original audit. Repairs, validation, save compatibility notes and generated source locations are documented in [the asset-refresh report](../asset-refresh/README.md). Review [the finished artwork](../../art/ui/preview.html).

# Items and other assets: expanded audit

Scope: current assets AND unfinished assets intended for future integration. Lack of current usage is not grounds for dropping an asset from this backlog. No artwork or gameplay records were changed in this pass.

## Recommended art work

| Priority | Asset group | Finding and proposed treatment |
|---|---|---|
| High | Quest items | 12 records use medicine bottle icon176, including burlap, fabric, a control module, court summons, pie evidence, manifesto and photographs. Keep the bottle for medicine where appropriate; draw distinct objects for the others. Slots22â€“29 have direct event references. |
| High | Story artifacts | Necklace fragments use a generic gold equipment icon144; complete necklaces use ring145. Create matching fragments and assembled pendant based on the existing storyline, including Jen's blue pendant. |
| High | Machinery items | Engine and components use hammer223; one blueprint uses shield222; Completed Engine132 uses book121; Golden Gear145 uses chest210. Draw readable machinery, schematic, components and gear icons. |
| High | Disease states | States27â€“32 use plain red H/A/G/S/C/Hep B lettering (icons1605â€“1610). Replace with a consistent, readable illustrated status family. Preserve disease names and mechanics. |
| High | Equipment polish | Hat, running shoes, colored gloves/pants/jackets and helmets include flat silhouettes and inconsistent detail. Black equipment has poor contrast. Polish within a consistent 32px palette and outline style. Hat2 is initially equipped; red gloves8/pants9 are sold in shops including Map105. |
| Medium | Missing skill icons | 14 actual skill records use blank icon0: 70,87,90,91,92,103,107,108,109,111,114,115,120,121. Keep blank separator rows100/125 out of the artwork count. Include unfinished skills for later gameplay integration. |
| Medium | Weapons | Yo-Yo15 is blank; Slingshot19 is a sword; 22 weapon records share rifle116 across pistols, rifles, shotguns, cannons and lasers. Give each weapon family an appropriate silhouette, then variants where useful. No direct use found for Yo-Yo/Slingshot, but retain both in the future-content backlog. |
| Medium | HUD sample portraits | battlecommands/Face_1â€“5 show unrelated sample characters and names (Homura, Sayaka, Mami, Kyoko, Madoka). actorhud/Face_5 and battlehud/Face_5 also retain a sample portrait. Replace these before enabling the associated MOG HUDs; these HUD plugins are not currently enabled. Missing actor-number coverage must be checked when configuring them. |
| Medium | Rough status/UI samples | system/Untitled.png is a blurry sad-face image with a white square background; battlehud/Turn.png is a plain colored blob. Treat as unfinished source assets; intended use needs confirmation when integrating. States11â€“13 and37â€“39 have rough poop/toilet/emoji-style icons worth harmonizing. |
| Low | Boss skill icons | Skills151â€“184 use the same generic attack icon77 for warnings, attacks, repairs and interruptions. Distinct warning/attack/recovery symbols would improve future menus or HUDs, though many are enemy-only today. |
| Optional | Screen identity | GameOver and Loading are generic text treatments; current window skin has strong stripes. A cohesive corporate UI treatment could improve presentation. This is polish, not missing artwork. |

## Retain unless a particular use reveals a problem

Tileset, door, furniture, chest, machinery and environmental prop sheets look largely finished in the overview review. Transparent gaps and sparse sheets are not automatically missing content. Parallaxes and weather textures look usable; small particles are intentionally simple. Existing weapon animation sheets and the sampled effect sheets look finished. The older portrait/map-sprite review still applies; do not recreate approved boss art.

## Separate integration issue

Items slots2â€“29 have stored `id` fields that differ from their array positions: 28 mismatches, with additional duplicate conceptual items later in the database. RPG Maker commands address array positions, while inventory logic also uses item.id. This can affect which item is stored/retrieved and must be reconciled with quest/event references before changing IDs. Do not automatically renumber these records during an art pass. The icon gallery labels database slots; JSON preserves both slot and stored ID.

## Evidence and limits

Reviewed all named icon assignments: 41 item, 52 weapon, 60 armor, 149 skill and44 state records. IconSet is517Ã—3360; MV uses16 columns of32px icons, leaving5 extra unused columns of pixels at the right edge. No referenced icon index is outside the sheet. Blank icon0 is deliberate for Guard, Immortal and some internal states; don't blanket-fill all blanks.

Reviewed four UI sheet pages, four tileset/parallax/weather overview pages, and all three skill-icon pages. Generated nine effect contact pages and inspected the first as a sample; this is not frame-by-frame effect QA. Earlier actor/face/character contact reviews were samples, not every animation/frame/portrait cell. In-map tile placement, collision, and all menu layouts are separate from source-art quality.

Checked every Animations.json sheet filename: none missing. Previous map/actor/tileset reference scans found no missing files. Enabled custom plugin bitmap calls are dynamic boss/map renderers already exercised by the runtime checks; dormant MOG HUD resources are included in the backlog, not asserted to be visible today. Arbitrary scripted/dynamic paths are not exhaustively proven. Direct-use evidence covers event grants/shops, common events, enemy drops and initial actor equipment, not full reachable progression.

See other-assets.json and nonbattle-references.json for exact records. Open index.html for icon galleries and other-asset contact sheets. Prioritize quest item silhouettes, disease icons and clothing polish, then complete the unused weapon/skill/HUD assets before their gameplay integration.
