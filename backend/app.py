from flask import Flask, request, jsonify
from flask_cors import CORS
from twitter_api import fetch_recent_tweets
from sentiment import analyze_sentiment, extract_emojis, extract_hashtags
from summarize import get_summary_from_tweets

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    query = data.get('query', '')
    count = data.get('count', 10)
    lang = data.get('lang', 'en')

    try:
        tweets = fetch_recent_tweets(query, count, lang)
        results = []

        for tweet in tweets:
            sentiment, score = analyze_sentiment(tweet)
            emojis = extract_emojis(tweet)
            hashtags = extract_hashtags(tweet)
            results.append({
                "text": tweet,           # renamed to 'text' for React compatibility
                "sentiment": sentiment,
                "score": score,
                "emojis": emojis,
                "hashtags": hashtags
            })

        summary = get_summary_from_tweets(tweets)

        return jsonify({
            "results": results,
            "summary": summary
        })

    except Exception as e:
        print("⛔ Error fetching data:", e)
        return jsonify({"error": "Error fetching data."}), 500


if __name__ == "__main__":
    app.run(debug=True)
