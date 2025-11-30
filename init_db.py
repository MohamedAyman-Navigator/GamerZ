import sqlite3
from werkzeug.security import generate_password_hash

connection = sqlite3.connect('database.db')

with open('schema.sql', 'w') as f:
    f.write('''
        DROP TABLE IF EXISTS games;
        CREATE TABLE games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL,
            trailer TEXT NOT NULL,
            description TEXT,
            genre TEXT,
            rating TEXT
        );

        DROP TABLE IF EXISTS users;
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            profile_photo TEXT
        );

        DROP TABLE IF EXISTS orders;
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            game_id INTEGER NOT NULL,
            key TEXT NOT NULL,
            purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (game_id) REFERENCES games (id)
        );
    ''')

# Execute Schema
with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

print("Rebuilding Database with Orders Table...")

# --- RESTORE GAMES ---
cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Cyberpunk 2077', 59.99, '/static/assets/cyberpunk/cyberpunk.jpg', '/static/assets/cyberpunk/cyberpunk_trailer.mp4',
             'An open-world, action-adventure RPG set in the megalopolis of Night City.', 'Action RPG', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Red Dead Redemption 2', 59.99, '/static/assets/rdr2/rdr2.jpg', '/static/assets/rdr2/rdr2_trailer.mp4',
             'The epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang.', 'Open World', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Resident Evil 4', 49.99, '/static/assets/re4/re4.png', '/static/assets/re4/re4_trailer.mp4',
             'Leon S. Kennedy tracks the presidents missing daughter to a secluded European village.', 'Survival Horror', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Dispatch', 29.99, '/static/assets/dispatch/dispatch.jpg', '/static/assets/dispatch/dispatch_trailer.mp4',
             'A narrative-driven thriller from AdHoc Studio following a 911 operator.', 'Narrative', 'T'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('God of War Ragnarok', 69.99, '/static/assets/gow/gow_ragnarok.png', '/static/assets/gow/gow_ragnarok_trailer.mp4',
             'Kratos and Atreus must journey to each of the Nine Realms in search of answers.', 'Action Adventure', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Elden Ring', 59.99, '/static/assets/eldenring/elden_ring.png', '/static/assets/eldenring/elden_ring_trailer.mp4',
             'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.', 'Action RPG', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Grand Theft Auto V', 29.99, '/static/assets/gta5/gta_v.png', '/static/assets/gta5/gtav_trailer.mp4',
             'Experience the interwoven lives of three very different criminals in Los Santos.', 'Open World', 'M'))

cur.execute("INSERT INTO games (title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('EA Sports FC 25', 69.99, '/static/assets/fc25/fc_25.png', '/static/assets/fc25/fc_25_trailer.mp4',
             'The next chapter in the Worlds Game with the most authentic football experience.', 'Sports', 'E'))

# --- INSERT EXTRAS (DLCs & EDITIONS) ---
# Cyberpunk 2077 (ID 1) -> Extras 11, 12
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (11, 'Phantom Liberty', 29.99, '/static/assets/cyberpunk/phantom_liberty.png', '', 'Spy-thriller expansion for Cyberpunk 2077.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (12, 'Cyberpunk 2077: Ultimate Edition', 89.99, '/static/assets/cyberpunk/ultimate_edition.png', '', 'Includes Base Game + Phantom Liberty Expansion.', 'Edition', 'M'))

# RDR2 (ID 2) -> Extras 21, 22
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (21, 'RDR2: Story Mode Content', 9.99, '/static/assets/rdr2/rdr2.jpg', '', 'Bank Robbery Mission & Gang Hideout.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (22, 'RDR2: Ultimate Edition', 99.99, '/static/assets/rdr2/rdr2.jpg', '', 'Exclusive Story & Online content.', 'Edition', 'M'))

# RE4 (ID 3) -> Extras 31, 32
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (31, 'RE4: Separate Ways', 9.99, '/static/assets/re4/re4.png', '', 'Play as Ada Wong in this story expansion.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (32, 'RE4: Deluxe Edition', 59.99, '/static/assets/re4/re4.png', '', 'Includes Extra DLC Pack.', 'Edition', 'M'))

# God of War (ID 5) -> Extras 51, 52
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (51, 'GoW: Valhalla', 0.00, '/static/assets/gow/gow_ragnarok.png', '', 'Roguelite mode epilogue.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (52, 'GoW: Digital Deluxe', 79.99, '/static/assets/gow/gow_ragnarok.png', '', 'Darkdale Armor & Digital Artbook.', 'Edition', 'M'))

# Elden Ring (ID 6) -> Extras 61, 62
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (61, 'Shadow of the Erdtree', 39.99, '/static/assets/eldenring/elden_ring.png', '', 'Massive expansion set in the Land of Shadow.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (62, 'Elden Ring: Shadow of the Erdtree Edition', 79.99, '/static/assets/eldenring/elden_ring.png', '', 'Base Game + Expansion.', 'Edition', 'M'))

# GTA V (ID 7) -> Extras 71, 72
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (71, 'GTA Online: Criminal Enterprise', 9.99, '/static/assets/gta5/gta_v.png', '', 'Starter pack for GTA Online.', 'DLC', 'M'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (72, 'GTA V: Premium Edition', 29.99, '/static/assets/gta5/gta_v.png', '', 'Includes GTA V & Criminal Enterprise Pack.', 'Edition', 'M'))

# FC 25 (ID 8) -> Extras 81, 82
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (81, 'FC Points (2800)', 19.99, '/static/assets/fc25/fc_25.png', '', 'In-game currency for Ultimate Team.', 'DLC', 'E'))
cur.execute("INSERT INTO games (id, title, price, image, trailer, description, genre, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (82, 'FC 25: Ultimate Edition', 99.99, '/static/assets/fc25/fc_25.png', '', '4600 FC Points & Early Access.', 'Edition', 'E'))

# --- RESTORE TEST USER ---
# Create 'admin' user with password '123'
hashed_pw = generate_password_hash('123', method='pbkdf2:sha256')
cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            ('admin', 'admin@gamerz.com', hashed_pw))

connection.commit()
connection.close()
print("Database Updated Successfully!")