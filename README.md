I've forked [https://github.com/yyx990803/HTML5-Clear] who recreated an HTML5/CSS3/JS version of [http://www.realmacsoftware.com/clear/].
This code runs on node 0.6, mongodb, mongoskin, jquery. Adding, updating, and removing items are the only actions connected to the database, except the employee data list call at app run.
There are minor framework fixes, some of which are directly tied to my particular implementation of Evan You's code too though. I ran this project on Cloud9, it was a fun developerment environment for this project.



-- Here's what the creator wrote in his read.md --

The awesome Clear app UI (almost) replicated in HTML5.

The original iphone app by Realmac: [http://www.realmacsoftware.com/clear/](http://www.realmacsoftware.com/clear/)


What's the point?
===

Mainly because I wanted to experiment with touch events and CSS3 transitions.

I love the design of the original app, so I decided to redo it in HTML5. It's not 100% copied, some of the features are kinda hard to be perfectly ported, but it's pretty close.

It's more about showing that you can achieve certain interactions with HTML5 than making an actual app. There's no backend data binding.


Why didn't you use frameworks like A/B/C?
===

I just wanted to play with the look and feel, so I just did it fast and dirty.

The code is quite messy and far from robust. Refactoring in the future might be some good practice.


What's missing
===

This is tested on iOS only, and there are quite a few features missing:

- Drag all the way to go up/down a level
- Pinch apart to add new item
- Drag up to clear done items

Also there are some bugs, mostly due to my not-so-robust touch event handling. Will try to work on that later when I got time.
