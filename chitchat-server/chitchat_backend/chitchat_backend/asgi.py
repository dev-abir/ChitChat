"""
ASGI config for chitchat_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chitchat_backend_app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitchat_backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chitchat_backend_app.routing.websocket_urlpatterns
        )
    ),
})