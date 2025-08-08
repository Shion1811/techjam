from django.forms import inlineformset_factory
from django import forms
from .models import InterviewTopic, InterviewReply, InterviewReplyImage


class InterviewTopicForm(forms.ModelForm):
    class Meta:
        model = InterviewTopic
        fields = ['title', 'description']

class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result

class InterviewReplyForm(forms.ModelForm):
    # imageフィールドのwidgetをMultipleFileInputに変更します。
    image = MultipleFileField()

    class Meta:
        model = InterviewReply
        fields = ['reply', 'image']
    
# class InterviewReplyForm(forms.ModelForm):
#     class Meta:
#         model = InterviewReply
#         fields = ['topic', 'store_reply', 'reply', 'image']
#         widgets = {
#             'image': forms.ClearableFileInput(attrs={'multiple': True}),
#         }