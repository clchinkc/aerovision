import sqlite3
from datetime import datetime
from contextlib import contextmanager
import json

@contextmanager
def get_db():
    conn = sqlite3.connect('aerovision.db')
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    """Initialize the database tables"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Create waste analysis table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS waste_analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            flight_id TEXT,
            visible_weight REAL,
            hidden_weight REAL,
            items_json TEXT
        )
        ''')
        
        # Create chart analysis table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS chart_analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            chart_id TEXT,
            chart_type TEXT,
            time_period TEXT,
            key_metrics_json TEXT,
            insights_json TEXT,
            recommendations_json TEXT
        )
        ''')
        
        # Create draft entries table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS draft_entries (
            session_id TEXT NOT NULL,
            items_json TEXT,
            PRIMARY KEY (session_id)
        )
        ''')
        
        conn.commit()

# Initialize database tables
init_db() 