# Mazars-Bot
This is the mono repo for my bbl bot demo.
It contains 4 parts:
   - Botcore -- *mainly does the routing for the bot. Usually handles the user & conversation database*
   - NLU -- *converts text to a mix of intents & entities. Here it's a basic model (mock)*
   - LMS -- *dictionary of the bot. Makes a correspondance from intent & entities to output text*

## Setup

#### First things first

* https://portal.azure.com/#create/hub
* Web App bot
* create
* change the webhook

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
	"text": "I would like a vanilla Ice Cream"
}
```
```
curl -X POST \
  http://localhost:8082/botcore \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 3d16b316-5fe3-4e7c-9d61-c7a0cb40d845' \
  -H 'cache-control: no-cache'
```
