# viseo-bbl-nlu
NLU Repo for the Viseo BBL Demo

## Usage

### Setup
```
bash start.sh
```

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
