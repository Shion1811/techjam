from django.contrib import admin

# Register your models here.

from .models import Store, StoreImage, Genre, Shop

admin.site.register(Genre)
admin.site.register(Store)
admin.site.register(StoreImage)
admin.site.register(Shop)