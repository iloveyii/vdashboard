#!/usr/bin/env bash
# vlc ../node/public/videos/1b784db0-03e3-11ea-a9a6-0df05e29912b_songs11.mp4 --sout '#standard{access=http,mux=mp4,dst=127.0.0.1:5050}'
vlc ../node/public/videos/1b784db0-03e3-11ea-a9a6-0df05e29912b_songs11.mp4 --sout --sout '#standard{access=http,mux=mp4,dst=localhost:5050}'

 sed  -En '/(`http:\/\/\w+)/p' http.log
 sed  -En '/(http:\/\/.*\s+)/p' http.log
