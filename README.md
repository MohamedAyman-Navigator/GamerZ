# GamerZ – AI-Powered Gaming Store Platform

GamerZ is a modern, production-grade web application designed to deliver a high-performance gaming e-commerce experience.
It combines a clean UI, scalable backend architecture, and an AI-assisted user workflow powered by Google Gemini models.
This project was developed end-to-end by a single developer, covering frontend, backend, database, and AI integration.

---

## Overview

GamerZ demonstrates how an intelligent digital storefront can enhance user experience through real-time recommendations, hardware compatibility analysis, secure transactions, and cinematic product presentation.
The platform is built with a product-focused mindset — emphasizing reliability, usability, and modern software engineering practices.

---

## Core Features

### Storefront Experience
- Structured catalog with dynamic product rendering
- High-fidelity product detail pages
- Responsive layout with modern CSS architecture
- Search-optimized game listings and metadata

### AI-Assisted User Interaction
- Integration with Google Gemini 2.0
- Game recommendations based on user preferences
- Hardware compatibility analysis using user-provided specs
- Context-aware conversation with session retention

### Authentication & User Accounts
- Secure registration and login system
- Encrypted password storage (Werkzeug)
- Persistent library of purchased games
- Real-time session-based user experience

### Shopping & Transactions
- Dynamic add-to-cart functionality with AJAX updates
- Order processing pipeline
- Automated digital key generation for purchased titles
- Database-backed purchase history and user inventory

### Administration Panel
- Game inventory management (Add / Edit / Delete)
- Validation and controlled CRUD operations
- Secure admin authentication layer

---

## Tech Stack

**Backend:** Python (Flask)  
**Database:** SQLite  
**AI Integration:** Google Gemini 2.0 (via `google-generativeai`)  
**Frontend:** HTML5, CSS3, JavaScript  
**Security:** Werkzeug hashing + session control  

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/MohamedAyman-Navigator/GamerZ-Gaming-Store.git
cd GamerZ-Gaming-Store
```
### 2. Install Dependencies
```bash
pip install flask google-generativeai werkzeug
```
### 3. Configure API Key
 Open app.py and replace:
  ```
  GEMINI_API_KEY = "YOUR-API-KEY"
```
### 4. Initialize the Database
```bash
python3 init_db.py
```
### 5. Run the Application
```bash
python3 app.py
```
Then open:
```
http://127.0.0.1:5000
```
---
## Project Structure
```
GamerZ/
├── app.py
├── init_db.py
├── schema.sql
├── database.db
├── static/
│   ├── style.css
│   ├── script.js
│   └── assets/
└── templates/
    ├── index.html
    ├── game_details.html
    ├── cart.html
    ├── login.html
    ├── signup.html
    ├── profile.html
    ├── order_success.html
    ├── admin_index.html
    └── admin_form.html
```
---
## Default Admin Access
Access the panel via /admin after login.
```
Username: admin
Password: 123
```
---
## License
This project is open-source and available under the MIT License.
