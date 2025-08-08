from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InterviewTopicViewSet, InterviewReplyViewSet, InterviewReplyImageViewSet

router = DefaultRouter()
router.register(r'topics', InterviewTopicViewSet)
router.register(r'replies', InterviewReplyViewSet)
router.register(r'reply-images', InterviewReplyImageViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]