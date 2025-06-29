🔧 Features
User Registration & Login using JWT
Create, edit, delete blog posts
View individual post details
Like & share posts (AJAX powered)
Comment system with live updates
Search functionality for blog posts
Mobile-responsive design with Bootstrap
Admin panel to manage posts and users

🛠️ Tech Stack
Backend: Django REST Framework, MySQL
Frontend: Django Templates, Bootstrap 5, JavaScript (AJAX)
Authentication: JWT (SimpleJWT)
Deployment Ready: Environment variable support via .env

# Clone the repo
git clone https://github.com/your-username/blog-application-with-django-mysql.git
cd blog-application-with-django-mysql

# Create virtual environment & activate
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Configure your .env and database

# Run migrations and start server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
