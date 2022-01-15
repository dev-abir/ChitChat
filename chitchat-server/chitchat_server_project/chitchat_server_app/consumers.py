import datetime
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


# TODO: admin app required?
# check the settings.py once....
class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user_name = self.scope['url_route']['kwargs']['user_name']

        # accept before disconnet, or else close error will not be sent (TODO: not sure ?)
        self.accept()

        if not self.room_name.isalnum():
            self.send_json({"error": "room name must be alphanumeric"})
            self.close()

        elif not self.user_name.isalnum():
            self.send_json({"error": "username must be alphanumeric"})
            self.close()

        else:
            self.room_group_name = 'chat_%s' % self.room_name

            # join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            # send this news to the room

            content = {
                'type': 'info',
                'message': f"{self.user_name} entered"
            }

            self.add_extra_info(content)

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                content
            )

    def disconnect(self, close_code):
        content = {
            'type': 'info',
            'message': f"{self.user_name} left"
        }

        self.add_extra_info(content)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            content
        )

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # TODO: auto add this to every message from client
    def add_extra_info(self, content):
        # add extra info for the client
        content["from"] = self.user_name
        content["time"] = datetime.datetime.now().strftime(
            '%d/%m/%Y %I:%M:%S %p')

    # Receive message from WebSocket
    # TODO: validation
    def receive_json(self, content):
        self.add_extra_info(content)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            content
        )

    # Receive message from room group
    def chat_message(self, event):
        # Send message to WebSocket
        self.send_json(event)

    def info(self, event):
        # Send message to WebSocket
        self.send_json(event)

    def typing_status(self, event):
        # Send message to WebSocket
        self.send_json(event)
