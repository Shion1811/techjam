from django.db import models
from store.models import Store
import os
# Create your models here.
class InterviewReplyImage(models.Model):
    image = models.ImageField(upload_to='interview/reply_images/', verbose_name="回答画像")

    def delete(self, *args, **kwargs):
        # データベースのレコードを削除する前に、画像ファイルのパスを保持
        if self.image:
            image_path = self.image.path
            # 親クラスのdeleteメソッドを呼び出してデータベースのレコードを削除
            super().delete(*args, **kwargs)
            # ファイルパスが存在し、かつファイルが実際に存在する場合にのみ削除
            if os.path.exists(image_path):
                os.remove(image_path)

class InterviewTopic(models.Model):
    title = models.CharField(max_length=100, verbose_name="インタビューのお題")
    description = models.TextField(verbose_name="インタビューの詳細")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")

    def __str__(self):
        return self.title

class InterviewReply(models.Model):
    topic = models.ForeignKey(InterviewTopic, on_delete=models.CASCADE, related_name="reply", verbose_name="お題")
    store_reply = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="store_reply", verbose_name="店舗情報")
    reply = models.TextField(verbose_name="お題への回答")
    image = models.ManyToManyField(InterviewReplyImage, blank=True, verbose_name="回答画像")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="回答時間")