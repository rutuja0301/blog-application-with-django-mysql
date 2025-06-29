🔧 Features

- User Registration & Login using JWT
- Create, Edit, and Delete Blog Posts
- View Individual Post Details
- Like & Share Posts (AJAX powered)
- Comment System with Live Updates
- Search Functionality for Blog Posts
- Mobile-Responsive Design with Bootstrap 5
- Admin Panel to Manage Posts and Users

🛠️ Tech Stack

- Backend: Django REST Framework, MySQL
- Frontend: Django Templates, Bootstrap 5, JavaScript (AJAX)
- Authentication: JWT (SimpleJWT)
- Deployment Ready: Environment variable support via .env

# Clone the repo
- git clone [https://github.com/your-username/blog-application-with-django-mysql.git](https://github.com/rutuja0301/blog-application-with-django-mysql.git)
- cd blog-application-with-django-mysql

# Create virtual environment & activate
- python -m venv env
- source env/bin/activate  # or .\env\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Configure your .env and database

# Run migrations and start server
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver
