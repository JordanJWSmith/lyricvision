![lyric vision](songart-app/assets/lyricvision_coral.png)

# LyricVision

This mobile app serves as a frontend for [song-to-image](https://github.com/JordanJWSmith/song-to-image), a python app to generate lyric-inspired artwork inspired from any given song. 

<!-- ![Sky Full of Stars - Coldplay](songart-app/assets/sky_full_of_stars.gif) -->
<img src="songart-app/assets/sky_full_of_stars.gif" alt="Sky Full of Stars - Coldplay" width="500"/>

## Installation

Clone the repo and install the necessary dependencies. 

Create an `.env` file within the `songart_project/songart_project` directory. Include your IP address(es), Genius token and Hugging Face token:

```
IP_ADDRESS_1="XXX.XXX.X.XX"
IP_ADDRESS_2="XXX.XXX.X.XX"
GENIUS_TOKEN="<geniustoken>"
HF_TOKEN="<huggingfacetoken>"
```

 For more information on creating these tokens, see [song-to-image](https://github.com/JordanJWSmith/song-to-image). 

 Run the frontend with `expo start --port 8000`. 

 Run the backend with `python manage.py runserver XXX.XXX.X.XX:8000`, where the IP address is that of your frontend. 


## Use

Just input a song title and artist to generate the artwork. Outputs may be different for the same song. 

|                          |                          |
:-------------------------:|:-------------------------:
|<img src="songart-app/assets/moonlight_1.gif" alt="Dancing in the Moonlight - Toploader (1)" width="300"/> |  <img src="songart-app/assets/moonlight_2.gif" alt="Dancing in the Moonlight - Toploader (2)" width="300"/> |



This is a React/Django app for Android, developed using Expo Go and tested on Google Pixel 6. 

<img src="songart-app/assets/get_lucky.gif" alt="Get Lucky - Daft Punk" width="500"/>


## To do
- A 'Settings' option to allow users to choose between text summarizer models, enable `magicprompt`, etc. 
- Song validation
- Spotify login 
- Generate an image scrapbook from a given playlist
