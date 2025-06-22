import tweepy
import os
from dotenv import load_dotenv

load_dotenv()
BEARER_TOKEN = os.getenv("BEARER_TOKEN")
from tweepy.errors import TooManyRequests, TweepyException

client = tweepy.Client(bearer_token=BEARER_TOKEN)

def fetch_recent_tweets(query, count=10, lang='en'):
    try:
        print(f"Fetching tweets for query: {query}, count: {count}, lang: {lang}")

        response = client.search_recent_tweets(
            query=query,
            max_results=min(count, 100),  # Twitter allows max 100
            tweet_fields=["lang"]
        )

        if response.data:
            tweets = [tweet.text for tweet in response.data if tweet.lang == lang]
            print(f"✅ Fetched {len(tweets)} tweets.")
            return tweets
        else:
            print("⚠️ No tweets found.")
            return []

    except TooManyRequests as e:
        print("⛔ Rate limit hit. Try again in 15–30 minutes.")
        raise e

    except TweepyException as e:
        print("❌ Tweepy error:", str(e))
        raise e

    except Exception as e:
        print("❗ Unknown error:", str(e))
        raise e
