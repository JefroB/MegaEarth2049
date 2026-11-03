#!/usr/bin/env python3
"""Read-only checks for explicit atlas crop/placement manifests (requires Pillow)."""
import argparse
import json
from pathlib import Path

from PIL import Image


def validate(manifest_path):
    path = Path(manifest_path).resolve()
    data = json.loads(path.read_text(encoding="utf-8"))
    errors, checked, images, destinations, groups = [], [], {}, {}, {}

    def fail(name, message):
        errors.append({"cell": name, "error": message})

    def inspect(name, kind, filename, rect, margin, threshold):
        if not filename:
            fail(name, f"{kind}: missing image path")
            return None
        filename = (path.parent / filename).resolve()
        try:
            if filename not in images:
                with Image.open(filename) as image:
                    images[filename] = image.convert("RGBA")
            image = images[filename]
        except (OSError, ValueError) as exc:
            fail(name, f"{kind}: cannot read {filename}: {exc}")
            return None
        if not isinstance(rect, list) or len(rect) != 4 or any(type(v) is not int for v in rect):
            fail(name, f"{kind}: rectangle must contain four integers")
            return None
        x, y, w, h = rect
        if min(x, y) < 0 or min(w, h) <= 0 or x + w > image.width or y + h > image.height:
            fail(name, f"{kind}: rectangle outside image bounds")
            return None
        if type(margin) is not int or margin < 0 or margin * 2 >= min(w, h):
            fail(name, f"{kind}: invalid transparent margin")
            return None
        alpha = image.crop((x, y, x + w, y + h)).getchannel("A")
        bbox = alpha.point(lambda a: 255 if a > threshold else 0).getbbox()
        if bbox is None:
            fail(name, f"{kind}: empty content")
        elif bbox[0] < margin or bbox[1] < margin or bbox[2] > w - margin or bbox[3] > h - margin:
            fail(name, f"{kind}: content touches declared {margin}px transparent margin")
        return str(filename), rect

    cells = data.get("cells", [])
    if not cells:
        fail("manifest", "no cells supplied")
    names = set()
    for index, cell in enumerate(cells):
        name = cell.get("name", f"cell-{index}")
        if name in names:
            fail(name, "duplicate cell name")
        names.add(name)
        threshold = cell.get("alpha_threshold", data.get("alpha_threshold", 0))
        if type(threshold) is not int or not 0 <= threshold <= 254:
            fail(name, "alpha_threshold must be an integer from 0 to 254")
            continue
        for kind in ("source", "target"):
            result = inspect(name, kind, cell.get(kind, data.get(kind)), cell.get(kind + "_rect"),
                             cell.get(kind + "_margin", data.get(kind + "_margin", 2)), threshold)
            if kind == "target" and result:
                filename, rect = result
                x, y, w, h = rect
                for other_name, (ox, oy, ow, oh) in destinations.get(filename, []):
                    if x < ox + ow and ox < x + w and y < oy + oh and oy < y + h:
                        fail(name, f"target overlaps {other_name}")
                destinations.setdefault(filename, []).append((name, rect))
        if cell.get("group"):
            groups.setdefault(cell["group"], []).append(cell)
        checked.append(name)
    contracts = data.get("animation_groups", {})
    for group, frames in groups.items():
        contract = contracts.get(group)
        if not contract:
            fail(group, "animation group lacks frame_size, scale and pivot contract")
            continue
        for frame in frames:
            name = frame.get("name", group)
            for key in ("scale", "pivot"):
                if key not in contract or frame.get(key) != contract[key]:
                    fail(name, f"animation {key} differs from group contract")
            rect = frame.get("target_rect", [])
            if len(rect) != 4 or rect[2:] != contract.get("frame_size"):
                fail(name, "animation frame size differs from group contract")
    return {"manifest": str(path), "passed": not errors, "checked_cells": checked, "errors": errors,
            "limitation": "Does not verify subject ownership, complete anatomy or intended motion; inspect exact packed cells visually."}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    report = validate(args.manifest)
    output = json.dumps(report, indent=2)
    if args.report:
        args.report.write_text(output + "\n", encoding="utf-8")
    print(output)
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
