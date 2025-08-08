from rest_framework import viewsets
from .models import Store, Stamp, StampHistory, Coupon
from .serializers import StoreSerializer, StampSerializer, StampHistorySerializer, CouponSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class StampViewSet(viewsets.ModelViewSet):
    queryset = Stamp.objects.all()
    serializer_class = StampSerializer

class StampHistoryViewSet(viewsets.ModelViewSet):
    queryset = StampHistory.objects.all()
    serializer_class = StampHistorySerializer

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

@api_view(['GET'])
def hello_api(request):
    return Response({"message": "Hello, world!"})
