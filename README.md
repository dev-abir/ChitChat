# ChitChat
A simple chat application, with chat rooms.

Mainly used [react](https://reactjs.org/) for the frontend and [django](https://www.djangoproject.com/), and django channels for the backend.

Thanks to the open source libraries and websites like: [framer-motion](https://www.framer.com/motion/), [tailwindcss](https://tailwindcss.com/),
[animista](https://animista.net/),
[djangochannelsrestframework](https://github.com/hishnash/djangochannelsrestframework) (although I haven't used this in the final app) etc...

> To install dependencies, use: `pip install -r requirements.txt` or just: `pip install Django channels daphne python-decouple`

> Create a .env file and put a SECRET_KEY there, or decleare a SECRET_KEY environment variable.

> use command `daphne chitchat_server_project.asgi:application` to start the server in production mode. Also make debug=False in production (use `daphne -p $PORT ...` if you are using a custom port environment variable).