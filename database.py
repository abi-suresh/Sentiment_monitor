import sqlite3

def init_db():
    conn = sqlite3.connect("sentiment.db")
    cur = conn.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tweet TEXT, sentiment TEXT, score REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

def save_result(tweet, sentiment, score):
    conn = sqlite3.connect("sentiment.db")
    cur = conn.cursor()
    cur.execute("INSERT INTO results (tweet, sentiment, score) VALUES (?, ?, ?)", (tweet, sentiment, score))
    conn.commit()
    conn.close()

    