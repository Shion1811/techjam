from django.contrib import admin

# Register your models here.
from .models import InterviewTopic, InterviewReply, InterviewReplyImage

admin.site.register(InterviewTopic)
admin.site.register(InterviewReply)
admin.site.register(InterviewReplyImage)