# viseo-bbl-nlu
NLU Repo for the Viseo BBL Demo

## Usage

### Setup

#### Dialogflow
* You need a Google Account
* go to https://dialogflow.com/
* log in to your account then click "Go to Console"
* Create a new Agent
* Click on Settings
* In "Google Project", click on the service account
* Click on the Dialogflow Integrations
* Click Edit, and add a key
* Download it as JSON and put it in as `nlu/service/dialogflow-key-XXX.json` then save
* set its name in your configuration

### *[POST]* /nlu
```
{
	"intent": "ice cream",
	"entities": {
		"flavour": "strawberry"
	}
}
```

### Loading your NLU Credentials

* Google Cloud Platform
* "Comptes et Service"
* Dialogflow Integrations
* create a key
* put the key into the conf file
