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
* setup the database
install mysql
    * install mysql
    * follow the steps at : https://tecadmin.net/install-mysql-server-on-debian9-stretch/
    * create the database
```
mysql -uroot -p
mysql > create database bot;
mysql > exit
```
```
cd /database
NODE_ENV=<local/production> npm run create-schema
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


## Adding a module

### Configuration

* create a directory at the same level as common
* you will need some files to make it work :
    - index.js
    ```javascript
    const config = require('config');
    const { createServer } = require('../common/components/serverFactory');
    const { <service> } = require('./service/<service>');
    const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');
    
    const services = {
        <service>: {
            callback: <service>,
            errorHandler: defaultErrorHandler,
        },
    };
    
    module.exports = createServer(config, services);
    ```
    Your service function will have to take `(req, res)` as input, and finish with `res.json({ ... })`
    - package.json
    - config/default.js
    ```javascript
    module.exports = {
        name: '<service>',
        endpoints: {
            lms: {
                path: '/<endpoint>',
                method: '<post/get/put>',
                validateInput: <boolean>,
                skipsOnError: <boolean>,
            },
        },
        port: 80XX,
    }
    ```
* create an api-client so that your module can be called
    - common/api-client/xxxx (you can check the other models.
    Always use the factory when building your api-client for mock/test purpose)
* don't forget to call your module in the botcore or in the router
* edit start.sh and pm2.ecosystem.config.js to include your directory
* you will most likely have to edit the message schema to make your module work


## Usage
### Talking to the bot
The entry point of the bot is made by the connectors. They create a message (following the fixed schema)
that is then passed to the botcore. To test your bot, you can either connect it
(to teams via microsoft bot platform, for example), or send an HTTP request.

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

### Database export
a simple GET on `http://localhost/api/database/messages` should do the trick.
