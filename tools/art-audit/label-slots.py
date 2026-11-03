from pathlib import Path
p=Path('tools/art-audit/audit-icons.py');s=p.read_text().replace("for o in read(kind):","for slot,o in enumerate(read(kind)):").replace("dict(kind=kind,id=", "dict(slot=slot,kind=kind,id=").replace("{r[\"id\"]}: {html.escape(r[\"name\"])}", "Slot {r[\"slot\"]}: {html.escape(r[\"name\"])}");p.write_text(s)
