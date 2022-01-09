import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user_name = self.scope['url_route']['kwargs']['user_name']

        # accept before disconnet, or else close error will not be sent (TODO: not sure ?)
        self.accept()

        if not self.room_name.isalnum():
            self.send_json({"error": "room name must be alphanumeric"})
            self.close()

        if not self.user_name.isalnum():
            self.send_json({"error": "username must be alphanumeric"})
            self.close()

        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'info',
                'message': f"{self.user_name} left"
            }
        )

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive_json(self, content):
        message = content['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'from': self.user_name,
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        # Send message to WebSocket
        self.send_json(event)

    def info(self, event):
        # Send message to WebSocket
        self.send_json(event)
