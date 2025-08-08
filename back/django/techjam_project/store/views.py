from django.shortcuts import render, redirect ,get_object_or_404

# Create your views here.

from .models import Store, StoreImage
from .forms import StoreForm, StoreImageForm, StoreImageFormSet
from datetime import datetime, time
# Google Maps API用のビュー
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# API用のViewSet
from rest_framework import viewsets
from .models import Shop
from .serializers import ShopSerializer

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

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

@api_view(['GET'])
def search_nearby_shops(request):
    """
    大須商店街の飲食店を検索（検索クエリ対応 + ジャンル検索対応）
    """
    # 検索クエリを取得
    search_query = request.GET.get('q', '').strip()
    
    # 大須商店街の座標（固定）
    OSU_SHOPPING_DISTRICT_LAT = 35.1595  # 大須商店街の緯度
    OSU_SHOPPING_DISTRICT_LNG = 136.9066  # 大須商店街の経度
    SEARCH_RADIUS = 800  # 検索半径（メートル）- 徒歩10分圏内
    
    # ジャンルマッピング（検索クエリ → Google Maps APIのtype/keyword）
    GENRE_MAPPING = {
        # 中華料理
        '中華': 'chinese_restaurant',
        '中国料理': 'chinese_restaurant',
        '餃子': 'chinese_restaurant',
        'ラーメン': 'restaurant',
        '担々麺': 'restaurant',
        '麻婆豆腐': 'chinese_restaurant',
        
        # 和食
        '和食': 'restaurant',
        '寿司': 'restaurant',
        '刺身': 'restaurant',
        '天ぷら': 'restaurant',
        'うなぎ': 'restaurant',
        'そば': 'restaurant',
        'うどん': 'restaurant',
        '丼': 'restaurant',
        '定食': 'restaurant',
        
        # 洋食・イタリアン
        'パスタ': 'restaurant',
        'ピザ': 'restaurant',
        'イタリアン': 'restaurant',
        '洋食': 'restaurant',
        'ハンバーガー': 'restaurant',
        'ステーキ': 'restaurant',
        
        # アジア料理
        '韓国料理': 'restaurant',
        '韓国': 'restaurant',
        'キムチ': 'restaurant',
        'タイ料理': 'restaurant',
        'タイ': 'restaurant',
        'ベトナム': 'restaurant',
        'ベトナム料理': 'restaurant',
        'カレー': 'restaurant',
        
        # カフェ・スイーツ
        'カフェ': 'cafe',
        'コーヒー': 'cafe',
        'ケーキ': 'restaurant',
        'スイーツ': 'restaurant',
        'パン': 'bakery',
        'ベーカリー': 'bakery',
        
        # その他
        '居酒屋': 'restaurant',
        'バー': 'bar',
        '焼肉': 'restaurant',
        '焼き鳥': 'restaurant',
        '串揚げ': 'restaurant',
        'たこ焼き': 'restaurant',
        'お好み焼き': 'restaurant',
    }
    
    # Google Maps APIキーをsettingsから取得
    api_key = settings.GOOGLE_MAPS_API_KEY
    
    if not api_key:
        return Response({'error': 'Google Maps APIキーが設定されていません'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        print(f"検索クエリ: '{search_query}' で大須商店街の飲食店を検索中...")  # デバッグ用
        
        # 検索パラメータを構築
        places_params = {
            'location': f"{OSU_SHOPPING_DISTRICT_LAT},{OSU_SHOPPING_DISTRICT_LNG}",
            'radius': SEARCH_RADIUS,
            'language': 'ja',  # 日本語で結果を取得
            'key': api_key
        }
        
        # 検索クエリがある場合の処理
        if search_query:
            # ジャンル検索の判定
            search_query_lower = search_query.lower()
            matched_genre = None
            
            # ジャンルマッピングから検索クエリにマッチするものを探す
            for genre_keyword, genre_type in GENRE_MAPPING.items():
                if genre_keyword.lower() in search_query_lower:
                    matched_genre = genre_type
                    break
            
            if matched_genre:
                # ジャンル検索の場合 - より柔軟な検索
                places_params['keyword'] = search_query
                print(f"ジャンル検索: '{search_query}' を検索")
            else:
                # 通常のキーワード検索
                places_params['keyword'] = search_query
                print(f"通常検索: '{search_query}' を検索")
        else:
            # 検索クエリがない場合は大須商店街の基本キーワード
            places_params['keyword'] = '大須'
        
        # 大須商店街周辺の飲食店を検索（Places API）
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        
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
        max_results = 20  # 最大20件まで表示
        
        for place in places_data['results']:
            if len(shops) >= max_results:
                break
                
            # 大須商店街に関連する店舗のみをフィルタリング
            place_name = place.get('name', '').lower()
            place_address = place.get('vicinity', '').lower()
            
            # 検索クエリがある場合は、そのクエリにマッチする店舗のみをフィルタリング
            if search_query:
                search_terms = search_query.lower().split()
                # より柔軟なマッチング（部分一致でもOK）
                matches_search = any(term in place_name or term in place_address for term in search_terms)
                if not matches_search:
                    continue
            
            # 大須商店街に関連するキーワードでフィルタリング（より緩やかに）
            osu_keywords = ['大須', 'おおす', 'osu', '商店街', '商店', '名古屋', '中区']
            is_osu_shop = any(keyword in place_name or keyword in place_address for keyword in osu_keywords)
            
            # 大須商店街の範囲内であれば、キーワードがなくても含める
            if is_osu_shop or True:  # 一時的にフィルタリングを無効化
                # 店舗の詳細情報を取得（画像を含む）
                place_id = place.get('place_id', '')
                shop_images = []
                
                # 初期データを作成
                shop_data = {
                    'name': place.get('name', ''),
                    'address': place.get('vicinity', ''),
                    'business_hours': '営業時間情報なし',  # 後で詳細情報から更新
                    'phone': place.get('formatted_phone_number', '電話番号なし'),
                    'rating': place.get('rating', 0),
                    'place_id': place.get('place_id', ''),
                    'location': {
                        'lat': place['geometry']['location']['lat'],
                        'lng': place['geometry']['location']['lng']
                    },
                    'images': shop_images  # 画像情報を追加
                }
                
                # Place Details APIで詳細情報を取得して営業時間と電話番号を更新
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
                            
                            # 電話番号を更新
                            if 'formatted_phone_number' in place_details:
                                shop_data['phone'] = place_details['formatted_phone_number']
                            
                            # 営業時間を更新
                            if 'opening_hours' in place_details and 'weekday_text' in place_details['opening_hours']:
                                # 営業時間を整形
                                weekday_text = place_details['opening_hours']['weekday_text']
                                business_hours = ' | '.join(weekday_text[:3])  # 最初の3日分を表示
                                if len(weekday_text) > 3:
                                    business_hours += f" | ... (他{len(weekday_text)-3}日)"
                                shop_data['business_hours'] = business_hours
                            
                            # 画像情報を取得
                            if 'photos' in place_details:
                                for photo in place_details['photos'][:5]:  # 最大5枚まで
                                    photo_reference = photo.get('photo_reference', '')
                                    if photo_reference:
                                        # サムネイル画像URL
                                        thumbnail_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference={photo_reference}&language=ja&key={api_key}"
                                        # 高解像度画像URL
                                        full_image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo_reference}&language=ja&key={api_key}"
                                        
                                        shop_data['images'].append({
                                            'thumbnail': thumbnail_url,
                                            'full_image': full_image_url,
                                            'width': photo.get('width', 0),
                                            'height': photo.get('height', 0)
                                        })
                    except Exception as e:
                        print(f"店舗詳細取得エラー: {str(e)}")
                
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