from django.contrib import admin
from .models import Store, Stamp, StampHistory

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    list_filter = ('name',)

@admin.register(Stamp)
class StampAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'store', 'created_at', 'get_store_name')
    search_fields = ('user__username', 'store__name')
    list_filter = ('store', 'created_at')
    raw_id_fields = ('user', 'store')

    def get_store_name(self, obj):
        return obj.store.name
    get_store_name.short_description = 'Store Name'

@admin.register(StampHistory)
class StampHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'stamp', 'action', 'timestamp', 'get_user')
    search_fields = ('stamp__user__username',)
    list_filter = ('action', 'timestamp')
    raw_id_fields = ('stamp',)

    def get_user(self, obj):
        return obj.stamp.user.username if obj.stamp and obj.stamp.user else '-'