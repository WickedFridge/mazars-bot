# Mazars-Bot
This is the mono repo for my bbl bot demo.
It contains 4 parts:
   - Botcore -- *mainly does the routing for the bot. Usually handles the user & conversation database*
   - NLU -- *converts text to a mix of intents & entities. Here it's a basic model (mock)*
   - LMS -- *dictionary of the bot. Makes a correspondance from intent & entities to output text*
   - DATABASE -- *stocks conversations*

## Setting up the Server
* Connect to the server
```
ssh voicebot@10.240.6.73
password : 9a7s%x4FS<
```
* now you're connected, install sudo via superuser using the same password
```
$ cd ~/
$ su
# apt install sudo
# usermod -aG sudo voicebot
# su - voicebot
```
* install git
```
sudo apt install git
git clone <repo-url>
cd mazars-bot/
```
* install nodejs
```
sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_13.x | sudo bash -
sudo apt-get install nodejs
sudo chown -R $USER /usr/lib/node_modules
```
## Setting up Local Environment

#### First things first

* download ngrok then start it
    * `./ngrok http 80`
    * You should have the following :
        * `Forwarding https://<NGROK-ENDPOINT>.ngrok.io -> http://localhost:80`
* https://portal.azure.com/#create/hub
* Web App bot
* create
* change the webhook in "Settings"
    * `https://<NGROK-ENDPOINT>.ngrok.io/microsoft-bot-platform`
* Go to Configuration and hit "show values"
    * your Microsoft App ID & Password are here
* Go to Teams and use the App Studio (Apps => App Studio)
    * manifest editor
    * create a new app
    * fill the form
    * endpoint address is either ngrok (local) or `chatbot-normes-mazars.fr` (prod)
    * in the "finish" tab, click "install"

You just type the following command in the active directory.
```
bash start.sh
```
#### Check the logs
*   ```
    pm2 log
    ```
    ```
    pm2 log <component_name>
    ```
#### Stop the bot
*   ```
    pm2 delete all
    ```


## Usage
### Talking to the bot
You have to use HTTP request to do so. Postman will do, but you can also use curl.

#### *[POST]* localhost:8082/botcore
```
{
	"messageId": "test",
	"conversation": {
		"locale": "fr-FR"
	},
	"inputText": "hello"
}
```
```
curl -X POST \
  http://localhost:8082/botcore \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 90' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:8082' \
  -H 'Postman-Token: 687ac413-d999-4c6f-9aa8-f5c73310cab8,dd13c890-4091-4429-8ba6-71bbcf20f38b' \
  -H 'User-Agent: PostmanRuntime/7.20.1' \
  -H 'cache-control: no-cache' \
  -d '{
	"messageId": "test",
	"conversation": {
		"locale": "fr-FR"
	},
	"inputText": "hello"
}'
```
