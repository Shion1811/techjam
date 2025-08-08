from django.contrib import admin

# Register your models here.

from .models import CustomUser, Position

admin.site.register(CustomUser)
admin.site.register(Position)