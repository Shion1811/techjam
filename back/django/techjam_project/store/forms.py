from django.forms import inlineformset_factory
from django import forms
from .models import Store, StoreImage

class StoreForm(forms.ModelForm):
    class Meta:
        model = Store
        fields = '__all__'

class StoreImageForm(forms.ModelForm): # 画像形式の1対多のため作成
    class Meta:
        model = StoreImage
        fields = ['image']

StoreImageFormSet = inlineformset_factory(
    Store, StoreImage, form=StoreImageForm,
    fields=['image']
)