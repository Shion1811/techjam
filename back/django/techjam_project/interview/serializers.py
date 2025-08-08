from rest_framework import serializers
from .models import InterviewTopic, InterviewReply, InterviewReplyImage
from store.serializers import StoreSerializer

class InterviewReplyImageSerializer(serializers.ModelSerializer):
    """
    インタビュー回答に紐づく画像をシリアライズ
    """
    class Meta:
        model = InterviewReplyImage
        fields = ['id', 'image']

class InterviewReplySerializer(serializers.ModelSerializer):
    """
    インタビュー回答をシリアライズ
    """
    # 関連するStore情報をネストして表示
    store_reply = StoreSerializer(read_only=True)
    # 関連する回答画像をネストして表示
    image = InterviewReplyImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = InterviewReply
        fields = ['id', 'topic', 'store_reply', 'reply', 'image', 'created_at']

class InterviewTopicSerializer(serializers.ModelSerializer):
    """
    インタビューのお題をシリアライズ
    """
    # お題に紐づく回答をネストして表示
    reply = InterviewReplySerializer(many=True, read_only=True)
    
    class Meta:
        model = InterviewTopic
        fields = ['id', 'title', 'description', 'created_at', 'reply']