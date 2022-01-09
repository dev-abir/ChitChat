from django.urls.conf import path

from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<user_name>/<room_name>', consumers.ChatConsumer.as_asgi()),
]
