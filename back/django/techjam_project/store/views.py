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

# API用のViewSet
from rest_framework import viewsets
from .models import Shop
from .serializers import ShopSerializer

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

# Google Maps API用のビュー
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def search_nearby_shops(request):
    """
    大須商店街の飲食店のみを検索
    """
    # 大須商店街の座標（固定）
    OSU_SHOPPING_DISTRICT_LAT = 35.1595  # 大須商店街の緯度
    OSU_SHOPPING_DISTRICT_LNG = 136.9066  # 大須商店街の経度
    SEARCH_RADIUS = 500  # 検索半径（メートル）- 大須商店街の範囲内
    
    # Google Maps APIキーをsettingsから取得
    api_key = settings.GOOGLE_MAPS_API_KEY
    
    if not api_key:
        return Response({'error': 'Google Maps APIキーが設定されていません'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        print(f"大須商店街の飲食店を検索中...")  # デバッグ用
        
        # 大須商店街周辺の飲食店を検索（Places API）
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        places_params = {
            'location': f"{OSU_SHOPPING_DISTRICT_LAT},{OSU_SHOPPING_DISTRICT_LNG}",
            'radius': SEARCH_RADIUS,
            'type': 'restaurant',  # レストランを検索
            'keyword': '大須',  # 大須商店街に関連するキーワード
            'language': 'ja',  # 日本語で結果を取得
            'key': api_key
        }
        
        print(f"Places API呼び出し: {places_params}")  # デバッグ用
        places_response = requests.get(places_url, params=places_params)
        places_data = places_response.json()
        
        print(f"Places API レスポンス: {places_data['status']}")  # デバッグ用
        
        if places_data['status'] != 'OK':
            error_message = f"Places API エラー: {places_data.get('status', 'Unknown')} - {places_data.get('error_message', 'No error message')}"
            print(error_message)  # デバッグ用
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        # 結果を整形
        shops = []
        for place in places_data['results']:
            # 大須商店街に関連する店舗のみをフィルタリング
            place_name = place.get('name', '').lower()
            place_address = place.get('vicinity', '').lower()
            
            # 大須商店街に関連するキーワードでフィルタリング
            osu_keywords = ['大須', 'おおす', 'osu', '商店街', '商店']
            is_osu_shop = any(keyword in place_name or keyword in place_address for keyword in osu_keywords)
            
            if is_osu_shop:
                # 店舗の詳細情報を取得（画像を含む）
                place_id = place.get('place_id', '')
                shop_images = []
                
                if place_id:
                    try:
                        # Place Details APIで詳細情報を取得
                        details_url = f"https://maps.googleapis.com/maps/api/place/details/json"
                        details_params = {
                            'place_id': place_id,
                            'fields': 'name,formatted_address,formatted_phone_number,opening_hours,rating,website,photos',
                            'language': 'ja',  # 日本語で結果を取得
                            'key': api_key
                        }
                        
                        details_response = requests.get(details_url, params=details_params)
                        details_data = details_response.json()
                        
                        if details_data['status'] == 'OK' and 'result' in details_data:
                            place_details = details_data['result']
                            
                            # 画像情報を取得
                            if 'photos' in place_details:
                                for photo in place_details['photos'][:5]:  # 最大5枚まで
                                    photo_reference = photo.get('photo_reference', '')
                                    if photo_reference:
                                        # サムネイル画像URL
                                        thumbnail_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference={photo_reference}&language=ja&key={api_key}"
                                        # 高解像度画像URL
                                        full_image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo_reference}&language=ja&key={api_key}"
                                        
                                        shop_images.append({
                                            'thumbnail': thumbnail_url,
                                            'full_image': full_image_url,
                                            'width': photo.get('width', 0),
                                            'height': photo.get('height', 0)
                                        })
                    except Exception as e:
                        print(f"店舗詳細取得エラー: {str(e)}")
                
                shop_data = {
                    'name': place.get('name', ''),
                    'address': place.get('vicinity', ''),
                    'business_hours': '営業時間情報なし',  # Places APIでは営業時間は別途取得が必要
                    'phone': place.get('formatted_phone_number', '電話番号なし'),
                    'rating': place.get('rating', 0),
                    'place_id': place.get('place_id', ''),
                    'location': {
                        'lat': place['geometry']['location']['lat'],
                        'lng': place['geometry']['location']['lng']
                    },
                    'images': shop_images  # 画像情報を追加
                }
                shops.append(shop_data)
        
        print(f"大須商店街の飲食店: {len(shops)}件を取得")  # デバッグ用
        
        return Response({
            'shops': shops,
            'search_location': '大須商店街',
            'total_results': len(shops),
            'search_area': {
                'center': {'lat': OSU_SHOPPING_DISTRICT_LAT, 'lng': OSU_SHOPPING_DISTRICT_LNG},
                'radius': SEARCH_RADIUS
            }
        })
        
    except Exception as e:
        print(f"例外発生: {str(e)}")  # デバッグ用
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_shop_details(request, place_id):
    """
    特定の店舗の詳細情報を取得
    """
    api_key = settings.GOOGLE_MAPS_API_KEY
    
    if not api_key:
        return Response({'error': 'Google Maps APIキーが設定されていません'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        # Place Details APIで詳細情報を取得
        details_url = f"https://maps.googleapis.com/maps/api/place/details/json"
        details_params = {
            'place_id': place_id,
            'fields': 'name,formatted_address,formatted_phone_number,opening_hours,rating,website',
            'key': api_key
        }
        
        details_response = requests.get(details_url, params=details_params)
        details_data = details_response.json()
        
        if details_data['status'] != 'OK':
            return Response({'error': '店舗詳細が見つかりません'}, status=status.HTTP_400_BAD_REQUEST)
        
        place = details_data['result']
        
        # 営業時間を整形
        business_hours = '営業時間情報なし'
        if 'opening_hours' in place:
            hours = place['opening_hours']
            if hours.get('open_now', False):
                business_hours = '営業中'
            else:
                business_hours = '営業時間外'
        
        shop_details = {
            'name': place.get('name', ''),
            'address': place.get('formatted_address', ''),
            'phone': place.get('formatted_phone_number', '電話番号なし'),
            'business_hours': business_hours,
            'rating': place.get('rating', 0),
            'website': place.get('website', ''),
            'opening_hours': place.get('opening_hours', {})
        }
        
        return Response(shop_details)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def save_google_shop(request):
    """
    Google Mapsから取得した店舗情報をDjangoのデータベースに保存
    """
    try:
        # リクエストから店舗データを取得
        shop_data = request.data
        
        # 必須フィールドの確認
        required_fields = ['name', 'address']
        for field in required_fields:
            if field not in shop_data or not shop_data[field]:
                return Response(
                    {'error': f'{field}は必須です'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # 既存の店舗かチェック（名前と住所で重複チェック）
        existing_shop = Shop.objects.filter(
            name=shop_data['name'],
            address=shop_data['address']
        ).first()
        
        if existing_shop:
            return Response(
                {'error': 'この店舗は既に登録されています', 'shop_id': existing_shop.id}, 
                status=status.HTTP_409_CONFLICT
            )
        
        # 新しい店舗を作成
        new_shop = Shop.objects.create(
            name=shop_data['name'],
            address=shop_data['address'],
            business_hours=shop_data.get('business_hours', '営業時間情報なし'),
            phone=shop_data.get('phone', '電話番号なし')
        )
        
        # 画像情報があれば保存（将来的にShopImageモデルを使用）
        images_data = shop_data.get('images', [])
        if images_data:
            print(f"店舗 '{new_shop.name}' に {len(images_data)} 枚の画像があります")
            # ここでShopImageモデルに画像URLを保存する処理を追加できます
        
        # 作成された店舗の情報を返す
        serializer = ShopSerializer(new_shop)
        return Response({
            'message': '店舗が正常に保存されました',
            'shop': serializer.data,
            'images_count': len(images_data)
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"店舗保存エラー: {str(e)}")  # デバッグ用
        return Response(
            {'error': f'店舗の保存に失敗しました: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )