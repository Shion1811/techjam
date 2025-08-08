import os
from pathlib import Path

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from stamps.models import Stamp 


from accounts.models import CustomUser

class Genre(models.Model):
    # ジャンル名を保存するフィールド。重複しないようにunique=Trueを設定
    name = models.CharField(max_length=50, unique=True, verbose_name="ジャンル名")

    def __str__(self):
        return self.name


class Store(models.Model):

    # Stampモデルを文字列で参照して循環インポートを防ぐ
    stamp = models.OneToOneField(
        'stamps.Stamp',  # アプリ名.モデル名 を文字列で指定
        on_delete=models.CASCADE,
        verbose_name="スタンプ情報",
        blank=True,
        null=True
    )

    owner = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='store', 
        null=True,
        verbose_name="店舗オーナー",

    )
    store_name = models.CharField(max_length=50, verbose_name="店舗名")
    address = models.CharField(max_length=200, verbose_name="店舗住所")
    tell = models.CharField(max_length=15, default='000-0000-0000',verbose_name="電話番号")
    genres = models.ManyToManyField(Genre, verbose_name="ジャンル")
    open_time = models.TimeField(verbose_name="開店時間")
    close_time = models.TimeField(verbose_name="閉店時間")
    holiday = models.CharField(max_length=100, verbose_name="定休日", blank=True, null=True)
    payment = models.CharField(max_length=100, verbose_name="支払い方法")

    def __str__(self):
        return self.store_name



class StoreImage(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='stores/images/', verbose_name="店舗写真")

    def delete(self, *args, **kwargs):
        # 画像ファイルのパスを保持
        if self.image:
            image_path = self.image.path
            # データベースから削除
            super().delete(*args, **kwargs)
            # ファイルが存在する場合のみ削除
            if os.path.exists(image_path):
                os.remove(image_path)

@receiver(post_save, sender=Store)
def create_stamp_for_store(sender, instance, created, **kwargs):
    if created and not instance.stamp:
        new_stamp = Stamp.objects.create(description=f"{instance.store_name} 用スタンプ")
        instance.stamp = new_stamp
        instance.save()


# ----------APIのモデル----------------
class Shop(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    business_hours = models.CharField(max_length=100, blank=True, verbose_name="営業時間")
    phone = models.CharField(max_length=20, blank=True, verbose_name="電話番号")
