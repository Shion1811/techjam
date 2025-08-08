from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import InterviewTopic, InterviewReply, InterviewReplyImage
from .serializers import InterviewTopicSerializer, InterviewReplySerializer, InterviewReplyImageSerializer
from store.models import Store

class InterviewTopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    インタビューのお題を扱うAPI
    一覧表示と詳細表示のみを許可
    """
    queryset = InterviewTopic.objects.all().order_by('-created_at')
    serializer_class = InterviewTopicSerializer

class InterviewReplyViewSet(viewsets.ModelViewSet):
    """
    インタビューの回答を扱うAPI
    """
    queryset = InterviewReply.objects.all().order_by('-created_at')
    serializer_class = InterviewReplySerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        store_id = request.data.get('store_reply')
        topic_id = request.data.get('topic')
        reply_images_data = request.FILES.getlist('images')

        store = get_object_or_404(Store, id=store_id)
        topic = get_object_or_404(InterviewTopic, id=topic_id)
        
        # 回答インスタンスを保存
        reply_instance = InterviewReply.objects.create(
            store_reply=store,
            topic=topic,
            reply=request.data.get('reply')
        )
        
        # 画像を保存
        for image_data in reply_images_data:
            InterviewReplyImage.objects.create(reply=reply_instance, image=image_data)
        
        # 保存したインスタンスをシリアライズして返す
        return Response(InterviewReplySerializer(reply_instance).data, status=status.HTTP_201_CREATED)

class InterviewReplyImageViewSet(viewsets.ModelViewSet):
    """
    インタビュー回答に画像をアップロード・削除するAPI
    """
    queryset = InterviewReplyImage.objects.all()
    serializer_class = InterviewReplyImageSerializer