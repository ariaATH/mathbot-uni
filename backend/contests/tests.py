from django.test import TestCase
from .models import Contest
from datetime import date, time

class ContestModelTest(TestCase):

    def setUp(self):
        self.contest = Contest.objects.create(
            title="Test Contest",
            description="This is a test contest.",
            location="Tehran",
            date=date(2025, 1, 1),
            time=time(12, 30),
            prize="Gold Medal"
        )

    def test_contest_creation(self):
        self.assertEqual(self.contest.title, "Test Contest")
        self.assertEqual(self.contest.location, "Tehran")
        self.assertEqual(self.contest.prize, "Gold Medal")

    def test_str_method(self):
        self.assertEqual(str(self.contest), "Test Contest")
