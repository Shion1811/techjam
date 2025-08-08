from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signup/customer/', views.signup_customer, name='signup_customer'),
    path('signup/owner/', views.signup_owner, name='signup_owner'),
]