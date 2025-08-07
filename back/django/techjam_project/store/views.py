from django.shortcuts import render, redirect ,get_object_or_404

# Create your views here.

from .models import Store, StoreImage
from .forms import StoreForm, StoreImageForm, StoreImageFormSet
# 店舗一覧
def stores(request):
    stores = Store.objects.all()
    images = StoreImage.objects.all()
    return render(request, 'stores.html', {'stores': stores})

# 店舗登録
def store_create(request):
    if request.method == 'POST':
        form = StoreForm(request.POST, request.FILES)
        image_formset = StoreImageFormSet(request.POST, request.FILES, instance=form.instance)
        if form.is_valid() and image_formset.is_valid():
            store = form.save()
            images = image_formset.save(commit=False)
            for image in images:
                image.store = store
                image.save()
            return redirect('stores')
    else:
        form = StoreForm()
        image_formset = StoreImageFormSet()
    
    return render(request, 'store_register.html', {'form': form, 'image_formset': image_formset})

# 店舗詳細
def store_detail(request, store_id):
    store = get_object_or_404(Store, id=store_id)
    images = store.images.all()
    return render(request, 'store_detail.html', {'store': store, 'images': images})

# 店舗情報の編集
def store_edit(request, store_id):
    store = get_object_or_404(Store, id=store_id)
    if request.method == 'POST':
        form = StoreForm(request.POST, request.FILES, instance=store)
        image_formset = StoreImageFormSet(request.POST, request.FILES, instance=store)
        if form.is_valid() and image_formset.is_valid():
            store = form.save()
            images = image_formset.save(commit=False)
            for image in images:
                image.store = store
                image.save()
            return redirect('store_detail', store_id=store.id)
    else:
        form = StoreForm(instance=store)
        image_formset = StoreImageFormSet(instance=store)

    return render(request, 'store_edit.html', {'form': form, 'image_formset': image_formset, 'store': store})

# 店舗情報の削除
def store_delete(request, store_id):
    store = get_object_or_404(Store, id=store_id)
    if request.method == 'POST':
        store.delete()
        return redirect('stores')
    
    return render(request, 'store_delete.html', {'store': store})