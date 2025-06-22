from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def get_summary_from_tweets(tweets):
    if not tweets:
        return "No tweets to summarize."

    combined_text = " ".join(tweets)

    # Limit to 1000 characters for model compatibility
    if len(combined_text) > 1000:
        combined_text = combined_text[:1000]

    try:
        summary = summarizer(combined_text, max_length=130, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Summarization error: {e}")
        return "Summary generation failed."
