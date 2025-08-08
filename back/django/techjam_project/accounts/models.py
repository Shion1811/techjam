from django.db import models

# Create your models here.
# accounts/models.py (例)
from django.contrib.auth.models import AbstractUser
from django.db import models

class Position(models.Model):
    name = models.CharField(max_length=20, unique=True, verbose_name="立場名")

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    # ユーザー名とメールはAbstractUserに含まれている
    
    # 電話番号フィールド
    # unique=True: 同じ電話番号を登録できないようにする
    tell = models.CharField(max_length=15, default='000-0000-0000',unique=True,verbose_name="電話番号")
    birth_data = models.DateField(verbose_name="生年月日", default="1990-01-01",blank=False)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, blank=False, null=True ,verbose_name="立場")

    # is_owner=Trueなら経営者、Falseなら一般ユーザーと判断
    is_owner = models.BooleanField(default=False)

    # ユーザー名としてemailを使用する場合の設定
    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username