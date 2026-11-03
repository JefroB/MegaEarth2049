"""Synthetic fixtures only; never modifies production artwork."""
import copy
import json
import tempfile
import unittest
from pathlib import Path

from PIL import Image
from validate_atlas import validate


class AtlasChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent)
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        image = Image.new("RGBA", (64, 32))
        image.paste((255, 100, 10, 255), (8, 8, 24, 24))
        image.paste((255, 100, 10, 255), (40, 8, 56, 24))
        image.save(self.root / "fixture.png")
        self.data = {"source": "fixture.png", "source_margin": 2, "target_margin": 2,
                     "cells": [{"name": "a", "source_rect": [0, 0, 32, 32],
                                "target": "fixture.png", "target_rect": [0, 0, 32, 32]}]}

    def check_manifest(self, expected):
        path = self.root / "manifest.json"
        path.write_text(json.dumps(self.data), encoding="utf-8")
        result = validate(path)
        self.assertEqual(result["passed"], expected, result)
        return result

    def test_valid(self):
        self.check_manifest(True)

    def test_clipped_source(self):
        self.data["cells"][0]["source_rect"] = [8, 0, 24, 32]
        self.check_manifest(False)

    def test_neighbor_fragment_at_edge(self):
        with Image.open(self.root / "fixture.png") as image:
            image.putpixel((31, 4), (1, 1, 1, 255))
            image.save(self.root / "fixture.png")
        self.check_manifest(False)

    def test_out_of_bounds(self):
        self.data["cells"][0]["target_rect"] = [50, 0, 32, 32]
        self.check_manifest(False)

    def test_overlapping_targets(self):
        other = copy.deepcopy(self.data["cells"][0])
        other["name"] = "b"
        self.data["cells"].append(other)
        self.check_manifest(False)

    def test_empty(self):
        self.data["cells"][0]["source_rect"] = [0, 0, 4, 4]
        self.data["source_margin"] = 1
        self.check_manifest(False)

    def test_animation_contract(self):
        frame = self.data["cells"][0]
        frame.update(group="idle", scale=1, pivot=[16, 30])
        self.data["animation_groups"] = {"idle": {"frame_size": [32, 32], "scale": 1, "pivot": [16, 30]}}
        self.check_manifest(True)
        frame["scale"] = 1.2
        self.check_manifest(False)
        frame["scale"] = 1
        frame["pivot"] = [16, 29]
        self.check_manifest(False)


if __name__ == "__main__":
    unittest.main()
