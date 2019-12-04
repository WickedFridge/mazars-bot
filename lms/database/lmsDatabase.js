const database = {
    lms: [
        {
            intent: 'hello',
            entities: '*',
            output: 'Hi ! I\'m IceCreamator! Can I serve you some ice cream ?',
        },
        {
            intent: 'goodBye',
            entities: '*',
            output: 'See you in hell!',
        },
        {
            intent: 'iceCream',
            entities: {
                iceCream: ['ice cream', 'sorbet'],
            },
            output: 'Which ice cream would you like ?',
        },
        {
            intent: 'iceCream',
            entities: {
                iceCream: ['ice cream'],
                flavour: ['chocolate'],
            },
            output: 'Here is a chocolate Ice cream !',
        },
        {
            intent: 'iceCream',
            entities: {
                iceCream: ['ice cream'],
                flavour: ['chocolate'],
            },
            output: 'Here is a vanilla Ice cream !',
        },
        {
            intent: 'iceCream',
            entities: {
                iceCream: ['ice cream', 'sorbet'],
                flavour: '*',
            },
            output: 'We don\'t have this flavour, I can give you either Vanilla or Chocolate.',
        },
    ],
    fallback: [
        'I don\'t understand humans quite well',
        'Your english seems pretty bad... Try rephrasing maybe ?',
        'Let\'s be honest, nobody understands what you are saying',
    ],
};

module.exports = database;
