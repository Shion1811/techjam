from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static
from .views import InterviewTopicListView

urlpatterns = [
    path('interviews/', InterviewTopicListView.as_view(), name='interview_topic_list'),
    path('<int:topic_id>/', views.topic_detail, name='topic_detail'),
    path('<int:topic_id>/reply/', views.topic_reply, name='topic_reply'),
]