# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser, Position

# 一般ユーザー
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2')

# 経営者
class OwnerCreationForm(UserCreationForm):
    tell = forms.CharField(label='電話番号', max_length=15, required=False)
    birth_data = forms.DateField(label='生年月日', widget=forms.SelectDateWidget(years=range(1900, 2025)))
    position = forms.ModelChoiceField(queryset=Position.objects.all(), label='立場')
    is_owner = forms.BooleanField(initial=True, widget=forms.HiddenInput()) # フォーム上では常にTrueにする

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'tell') # tell を追加

    def save(self, commit=True):
        user = super().save(commit=False)
        user.tell = self.cleaned_data['tell']
        user.is_owner = True # 常にTrueとして保存
        if commit:
            user.save()
        return user