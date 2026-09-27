# How to bully script-kiddies with nginx

If you have hosted a website on your own, you are probably aware of different 
scanners looking for popular vulnerabilities. I have noticed many suspicious requests in my logs:

```bash
- - [27/Feb/2022:01:30:54 +0100] "POST /mifs/.;/services/LogService HTTP/1.1" 404 162 "https://62.122.233.66:443" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
- - [27/Feb/2022:01:40:33 +0100] "GET /owa/auth/logon.aspx?url=https%3a%2f%2f1%2fecp%2f HTTP/1.1" 404 162 "-" "Mozilla/5.0 zgrab/0.x"
- - [27/Feb/2022:01:40:59 +0100] "GET /ecp/Current/exporttool/microsoft.exchange.ediscovery.exporttool.application HTTP/1.1" 404 162 "-" "Mozilla/5.0 zgrab/0.x"
- - [27/Feb/2022:02:35:47 +0100] "GET /xmlrpc.php HTTP/2.0" 404 162 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0"
- - [27/Feb/2022:05:15:28 +0100] "GET /.env HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"
- - [27/Feb/2022:06:25:27 +0100] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/bin/sh HTTP/1.1" 400 150 "-" "-"
- - [27/Feb/2022:07:52:18 +0100] "GET /development/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:07:52:18 +0100] "GET /localhost/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:07:52:18 +0100] "GET /core/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:07:52:18 +0100] "GET /staging/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:07:52:18 +0100] "GET /prod/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:07:52:18 +0100] "GET /api/.env HTTP/2.0" 404 146 "-" "Python/3.8 aiohttp/3.8.1"
- - [27/Feb/2022:16:44:28 +0100] "\x04\x01\x00\x19h/F!\x00" 400 150 "-" "-"
- - [27/Feb/2022:16:44:28 +0100] "\x05\x01\x00" 400 150 "-" "-"
- - [27/Feb/2022:16:44:28 +0100] "CONNECT hotmail-com.olc.protection.outlook.com:25 HTTP/1.1" 400 150 "-" "-"
- - [27/Feb/2022:21:30:54 +0100] "GET //wp-includes/wlwmanifest.xml HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:30:54 +0100] "GET //xmlrpc.php?rsd HTTP/2.0" 404 162 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:30:55 +0100] "GET //blog/wp-includes/wlwmanifest.xml HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:30:55 +0100] "GET //web/wp-includes/wlwmanifest.xml HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:30:55 +0100] "GET //wordpress/wp-includes/wlwmanifest.xml HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:30:55 +0100] "GET //website/wp-includes/wlwmanifest.xml HTTP/2.0" 404 548 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
- - [27/Feb/2022:21:58:26 +0100] "CONNECT 85.206.160.115:80 HTTP/1.1" 400 150 "-" "-"
```

<center>*IPs redacted*</center>

We can see that there are multiple different avenues of attack employed by 
scanners, however, what would happen if we were to reply to them with something
other then an error?

## PHP rickrolling

I noticed that many scanners look for WordPress and other sites written in php.
I do not use PHP on my server, so I decided to return a redirect to a
[specific YouTube video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) instead.

You can do this at home if you include following location in your *nginx config*:

```nginx
location ~* \.(php|aspx)$ {
    # add some cache headers, because why not?
	expires 10h;
	add_header Cache-Control "public, no-transform";
    # Say we had a nice night with their mother
	add_header Secret-message "Your mother is good kisser";
    # and deliver our gift 
	return 301 https://www.youtube.com/watch?v=dQw4w9WgXcQ;
}
```

This rule will match all incoming requests ending with `.php` or `.aspx`. You 
can put the snippet above in `/etc/nginx/rick.conf` and add `include rick.conf;`
in your main config.

It also allows you to generate random *rickrolling* links to annoy your friends with.

## Lazy user agents

Some 1337 h4X0Rs don't bother to change their user agents. They know that they 
will hack into your mainframe with `ping` before you notice that they use `Python 2.7.5`.
As such we can filter them with two custom rules:

```nginx
# some clients attempt to use buffer overflow exploits by sending malformed http 
# requensts, lets serve them with `101 Switching Protocols`.
error_page 400 =101 /bait.txt;
# You can use any other code you want, as =200 means it will be returned as `200 OK`
error_page 403 =200 /bait.txt;
location = /bait.txt {
    # in here we have a special message telling them to sudo rm -rf /*
    # leetspeek required! 
	root /script-kiddies/;
}
```

The snippet above should be placed in `server` block, before your `location` rules.

```nginx
# if user agent contains (case insensitive) [list] then return 403
if ($http_user_agent ~* (python|curl|zgrab|wget|perl)) {
	return 403;
}
```

This snippet should be placed in the `location` block you wish to protect.

If you do not have any ideas on how to write a `sudo rm -rf /*` message, here is 
my own (more cringe, more better):

```
Remember to change your user agent when you want to b3c0m a tru3
hax0r!

To change it use this command:

sudo rm -rf /* # user-agent set system chrome

sincerely

xxx_|-|ak13rGrz0|\|zo_xxx
```

## Other static files:

You can always put some static decoy files in your webserver root, for example,
hackers seem to like those `.env` files, they request them all the time. I can
provide them one:

```env
YOUR_FATHER=/dev/null
```
