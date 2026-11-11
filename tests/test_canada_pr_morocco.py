"""Regression contract for Canada's residence-permit route to Morocco.

Run: python -m unittest discover -s tests -p 'test_canada_pr_morocco.py' -v
This validates recorded data, not an immigration application or admission.
"""
import json
from datetime import date
from pathlib import Path
import unittest
from urllib.parse import urlparse


class CanadaPrMoroccoTests(unittest.TestCase):
    def test_canadian_residents_have_conditional_morocco_evisa_access(self):
        path = Path(__file__).resolve().parents[1] / "data/document-privileges/CANADA-pr.json"
        document = json.loads(path.read_text(encoding="utf-8"))
        matches = [entry for entry in document["unlocks"] if entry["country"] == "MA"]
        self.assertEqual(len(matches), 1, "Missing unique Canadian-residence Morocco eVisa entry")
        entry = matches[0]
        self.assertTrue(entry["evisaRequired"])
        self.assertFalse(entry["visaOnArrival"])
        self.assertEqual(entry["maxStayDays"], 30)
        self.assertEqual(entry["region"], "africa")
        conditions = entry["conditions"].lower()
        for qualification in ("living in canada", "otherwise visa-required", "ordinary passport", "application"):
            with self.subTest(qualification=qualification):
                self.assertIn(qualification, conditions)
        self.assertIn("ordinary passport valid for at least 90 days", conditions)
        self.assertIn("residence card or permit valid for at least 180 days", conditions)
        self.assertIn("single entry", entry["notes"].lower())
        self.assertIn("not visa-free", entry["notes"].lower())
        self.assertIn("parent or legal representative", entry["additionalRequirements"])
        source = entry["source"]
        self.assertEqual(urlparse(source["url"]).hostname, "www.acces-maroc.ma")
        self.assertTrue(source["governmentDomain"])
        self.assertIn("Category B", source["pageSection"])
        self.assertIn("Canada", source["countryQuote"])
        self.assertIn("180 days", source["exactQuote"])
        self.assertIsInstance(date.fromisoformat(source["accessedDate"]), date)
        self.assertIsInstance(date.fromisoformat(entry["lastUpdated"]), date)
        self.assertEqual(document["totalUnlocked"], len(document["unlocks"]))
        destinations = [item["country"] for item in document["unlocks"]]
        self.assertEqual(len(destinations), len(set(destinations)))


if __name__ == "__main__":
    unittest.main()
