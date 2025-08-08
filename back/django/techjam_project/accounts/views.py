from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm, OwnerCreationForm
from .models import CustomUser

def signup_customer(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # ユーザー登録後の処理
            return redirect('login') # ログインページにリダイレクト
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup_customer.html', {'form': form})

def signup_owner(request):
    if request.method == 'POST':
        form = OwnerCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # 経営者フラグを立ててユーザーを保存
            user.is_owner = True
            user.save()
            # 店舗情報登録ページにリダイレクトなど
            return redirect('store_register')
    else:
        form = OwnerCreationForm()
    return render(request, 'signup_owner.html', {'form': form})