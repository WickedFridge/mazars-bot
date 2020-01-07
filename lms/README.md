# viseo-bbl-lms
LMS Repo for the Viseo BBL Demo

## Usage

### Setup
* You need a Google Account
* Go to https://firebase.google.com/
* log in to your account then click "Go to Console"
* go to Database - realtime database
* commencer en mode test, puis changer les règles :
    ```
    {
      "rules": {
        ".read": true,
        ".write": false
      }
    }
    ```
* Remplir avec un JSON au format suivant :
    ```json
    {
      "INTENT": [
        {
          <optional> "entities": { "<entityName>" :  "Value" },
          "value": {
            "type": "<text/quickReply/image>",
            <optional> "text": "<text>",
            <optional> "value": "<imageUrl/quickReply Intent>",
          }
        }
      ]
    }
    ```
* Go to settings of the project
* Create a web app
* copy the firebase config and put it in your conf

### *[POST]* /lms
```
{
	"intent": "ice cream",
	"entities": {
		"flavour": "strawberry"
	}
}
```
