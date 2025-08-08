from django.shortcuts import render, redirect ,get_object_or_404

# Create your views here.
from django.views.generic import ListView
from .models import InterviewTopic
from store.models import Store
from .forms import InterviewReplyForm

class InterviewTopicListView(ListView):
    # このビューが使用するモデル
    model = InterviewTopic
    # 表示するテンプレートの名前
    template_name = 'topic_list.html'
    # テンプレート内で使用するオブジェクトのリストの名前
    context_object_name = 'topics'

def topic_reply(request, topic_id):
    topic = get_object_or_404(InterviewTopic, id=topic_id)
    
    if request.method == 'POST':
        store_reply_form = InterviewReplyForm(request.POST, request.FILES)
        if store_reply_form.is_valid():
            reply_instance = store_reply_form.save(commit=False)
            reply_instance.topic = topic
            reply_instance.store_reply = request.store_name # Storeモデルのインスタンスを代入
            reply_instance.save()
            return redirect('topic_detail.html', topic_id=topic.id)
    
    # GETリクエストの場合、またはフォームが無効な場合
    return redirect('topic_detail.html', topic_id=topic.id) # 常にトピック詳細ページにリダイレクト

def topic_detail(request, topic_id):
    topic = get_object_or_404(InterviewTopic, id=topic_id)
    reply = topic.reply.all().order_by('-created_at') # 関連する回答を全て取得

    # フォームのインスタンスを作成
    form = InterviewReplyForm()

    context = {
        'topic': topic,
        'reply': reply,
        'form': form,
    }
    return render(request, 'topic_detail.html', context)
    
