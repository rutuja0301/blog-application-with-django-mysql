from django.contrib import admin
from .models import BlogPost, Comment

# Register your models here.
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'timestamp')
    search_fields = ('title', 'content')
    list_filter = ('status', 'timestamp')
    ordering = ('-timestamp',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')
    search_fields = ('author__username', 'content')
    list_filter = ('created_at',)