from backend.sentiment import analyze_sentiment

def test_positive():
    text = "I love this amazing product!"
    sentiment, score = analyze_sentiment(text)
    assert sentiment == "Positive"

def test_negative():
    text = "This is the worst thing ever."
    sentiment, score = analyze_sentiment(text)
    assert sentiment == "Negative"
