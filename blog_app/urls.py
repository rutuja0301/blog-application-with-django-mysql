# blog_app/urls.py
from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, register_user, login_check_user_exists, \
                create_blog_view,blog_detail_view, CommentsByPostAPIView, CommentCreateView
from . import views

urlpatterns = [
    path('blogposts/', BlogPostListView.as_view(), name='blogpost_list'),
    path('blogposts/<int:pk>/', BlogPostDetailView.as_view(), name='blogpost_detail'),
    path('register/', register_user, name='register_user'),
    path('login-check/', login_check_user_exists, name='login_check_user_exists'),
    path('create-blog/', create_blog_view, name='create_blog'),
    path('blog-detail/', blog_detail_view, name='blog_detail'),
    path('comments/', CommentCreateView.as_view(), name='comment-create'),  # for POST
    path('comments/<int:post_id>/', CommentsByPostAPIView.as_view(), name='comments-by-post'),
    path('blogposts/<int:post_id>/like/', views.toggle_like, name='toggle-like'),
]

