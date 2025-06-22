from apscheduler.schedulers.background import BackgroundScheduler
from backend.twitter_api import fetch_recent_tweets
from backend.sentiment import analyze_sentiment
from database import save_result

def job():
    tweets = fetch_recent_tweets("AI")
    for tweet in tweets:
        sentiment, score = analyze_sentiment(tweet)
        save_result(tweet, sentiment, score)

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(job, 'interval', minutes=5)
    scheduler.start()
