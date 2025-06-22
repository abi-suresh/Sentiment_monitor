from textblob import TextBlob
import re
import emoji


def clean_tweet(tweet):
    tweet = re.sub(r"http\S+", "", tweet)  # Remove URLs
    tweet = re.sub(r"@[A-Za-z0-9_]+", "", tweet)  # Remove mentions
    tweet = re.sub(r"#[A-Za-z0-9_]+", "", tweet)  # Remove hashtags
    return tweet.strip()


def analyze_sentiment(tweet):
    cleaned = clean_tweet(tweet)
    blob = TextBlob(cleaned)
    polarity = blob.sentiment.polarity

    if polarity > 0.1:
        sentiment = "Positive"
    elif polarity < -0.1:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return sentiment, round(polarity, 2)


def extract_emojis(tweet):
    return [char for char in tweet if char in emoji.EMOJI_DATA]


def extract_hashtags(tweet):
    return re.findall(r"#(\w+)", tweet)
