from flask import Flask
import sqlite3
import click
from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

app = Flask(__name__)

@app.route("/ip/<string:ip>")
def ip_to_userid(ip):
    query = "SELECT * FROM ip_to_userid WHERE ip = ?"
    a = g.db.execute(query, (ip,))
    if a is None:
        return "Not found"
    else:
        return a.fetchone()[1]
