# Custodian dungeon placement

Installed from live room templates; do not rerun install.py over this installation. Backup: before-placement.zip.

| Custodian | Recovery room | Arena | Annex | Defeat switch |
|---|---:|---:|---:|---:|
| Chief Compliance Orifice | 127 | 224 | 225 | 168 |
| The Deductible Duke | 145 | 226 | 227 | 169 |
| Postmaster Septic | 163 | 228 | 229 | 170 |
| Admiral Clap | 181 | 230 | 231 | 171 |
| The REMployee of the Month | 199 | 232 | 233 | 172 |
| The Ticket Widow | 217 | 234 | 235 | 173 |

Each hatch requires local evidence or completed quest status. Existing public/private disclosure decisions both qualify. Challenge is optional. Escape and defeat give no mandate or credits; defeat restores the party. Victory opens the annex and pays once. Duke, Clap and Widow sing their victory couplets in these map branches.

Repair annex requires Identity + Repair for its junction route. Wake annex requires Routing + Flow. Junction Map236 requires all six mandates for Map237, the Core service vestibule. Other planetary dungeons remain local. The Necklace and final main-story confrontation are not bypassed.

The rooms reuse intact dungeon tiles. ME_CustodianMapSprites displays the accepted complete master at 72px high until victory, then restores a normal terminal graphic. Battle art remains animated by ME_Custodians.

Validation: node tools/custodian-placement/test-placement.js runs native map events, actual battle outcome callbacks, repeat-reward checks, map portraits, collision reachability and the all-six gate. See validation.json. Original parent tile arrays and event prefixes were compared with before-placement.zip.
