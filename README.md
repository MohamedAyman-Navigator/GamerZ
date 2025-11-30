# GamerZ Gaming Store

A simple full‑stack web application for a gaming store — built with Python (Flask), HTML/CSS/JS — to manage products, orders and simulate a small e‑commerce store for games and gaming accessories.

## 🔎 What is this project

GamerZ Gaming Store is a lightweight store management web application that lets users browse products, and (depending on role) manage inventory/orders.  
It includes a backend (Python) and frontend templates, and demonstrates a basic store system.

This repo can serve as a learning project or a starting skeleton for a more complex ecommerce / shop management system.

## 📁 Project Structure

```
.
├── app.py            # Main application entry (Flask app)
├── schema.sql        # Database schema
├── init_db.py        # Script to initialize the database
├── database.db       # SQLite database (sample / default)
├── static/           # Static assets (CSS, JS, images...)
├── templates/        # HTML templates for UI
├── test_models.py    # (Optional) tests / example usage
└── README.md         # ← you are here
```

## 🚀 How to Install and Run Locally

1. Clone the repo  
   ```bash
   git clone https://github.com/MohamedAyman-Navigator/GamerZ-Gaming-Store.git
   cd GamerZ-Gaming-Store
   ```

2. (Optional) Create a virtual environment  
   ```bash
   python3 -m venv venv
   source venv/bin/activate     # On Windows: venv\Scriptsctivate
   ```

3. Install dependencies (if any — e.g. Flask). If you don’t have a `requirements.txt`, just ensure Flask is installed:  
   ```bash
   pip install Flask
   ```

4. Initialize the database (run once):  
   ```bash
   python init_db.py
   ```

5. Run the application:  
   ```bash
   python app.py
   ```

6. Open your web browser and go to `http://localhost:5000` (or the port shown in console) to use the store.

## 🛠️ How to Use / Features

- Browse available products (games / items).  
- As a store administrator (or cashier role), add / remove / update products and manage orders.  
- Database-backed storage (SQLite) — data persists between runs.  
- Simple templated frontend (HTML + CSS + JS) for easy customization.  

## 🎯 Who is this for / Why it matters

- Great as a learning exercise for Python + web development beginners.  
- Useful as a minimal base for a more advanced e‑commerce/store management system.  
- Offers flexibility — you could replace the database, add authentication, or add more features (inventory levels, user roles, payment integration, etc.).

## 🧑‍💻 How to Contribute

Feel free to clone / fork the repo if you want to:  
- Add new features (e.g. user authentication, shopping cart, admin panel)  
- Improve UI / template styling  
- Switch to a more robust database (PostgreSQL, MySQL, etc.)  
- Add tests, linting, CI/CD, documentation  

If you add something useful — please create a pull request or issue so others can benefit.

## 📝 License & Credits

Feel free to use, modify, and distribute this project.  
If you build on top of it, a star ⭐ or credit in your project would be appreciated 🙏
