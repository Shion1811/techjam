from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.renderers import JSONRenderer
from django.shortcuts import get_object_or_404, render
from .models import Stamp, StampHistory, Coupon
from store.models import Store
from .serializers import StampHistorySerializer, CouponSerializer
from django.contrib.auth.models import User
from django.utils import timezone
import datetime

# 仮のユーザーID（デモ用）
DEMO_USER_ID = 1


class AddStampView(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, store_id):
        # 店舗とユーザーを取得
        store = get_object_or_404(Store, id=store_id)
        user = get_object_or_404(User, id=DEMO_USER_ID)

        # 店舗に紐づくスタンプを取得
        stamp = store.stamp
        if not stamp:
            return Response(
                {"error": "指定された店舗に紐づくスタンプが存在しません。"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # スタンプ履歴を新しく作成
        stamp_history = StampHistory.objects.create(user=user, stamp=stamp)

        # 現在のスタンプ総数をカウント
        total_stamps = StampHistory.objects.filter(user=user).count()

        coupon = None

        # スタンプが6個に達したらクーポンを発行して履歴をリセット
        if total_stamps % 6 == 0:
            expiration_date = timezone.now() + datetime.timedelta(days=30)
            coupon = Coupon.objects.create(
                user=user,
                store=store,
                description="6個で発行される共通クーポン",
                expires_at=expiration_date
            )

            # スタンプ履歴を削除してリセット
            StampHistory.objects.filter(user=user).delete()
            total_stamps = 0

        response_data = {
            "stamp": StampHistorySerializer(stamp_history).data,
            "total_stamps": total_stamps,
        }

        if coupon:
            response_data["coupon"] = CouponSerializer(coupon).data

        return Response(response_data, status=status.HTTP_201_CREATED)


class UseCouponView(APIView):
    """
    クーポンを使用済みにするAPI
    """
    def post(self, request, coupon_id):
        coupon = get_object_or_404(Coupon, id=coupon_id)

        if coupon.is_used:
            return Response({"error": "このクーポンは既に使用済みです。"}, status=status.HTTP_400_BAD_REQUEST)

        if coupon.expires_at and coupon.expires_at < timezone.now():
            return Response({"error": "このクーポンは有効期限が切れています。"}, status=status.HTTP_400_BAD_REQUEST)

        coupon.is_used = True
        coupon.save()
        return Response({"message": "クーポンが使用されました。", "coupon_id": coupon.id}, status=status.HTTP_200_OK)


class StampBookView(generics.ListAPIView):
    serializer_class = StampHistorySerializer

    def get_queryset(self):
        user = get_object_or_404(User, id=DEMO_USER_ID)
        return StampHistory.objects.filter(user=user).order_by('-created_at')


class CouponListView(generics.ListAPIView):
    serializer_class = CouponSerializer

    def get_queryset(self):
        user = get_object_or_404(User, id=DEMO_USER_ID)
        return Coupon.objects.filter(
            user=user,
            is_used=False,
            expires_at__gte=timezone.now()
        ).order_by('-issued_at')


def stamp_test_page(request, store_id):
    store = get_object_or_404(Store, id=store_id)
    stamp = get_object_or_404(Stamp, store=store)

    context = {
        "store": store,
        "stamp": stamp,
    }

    return render(request, "stamps/test_page.html", context)

