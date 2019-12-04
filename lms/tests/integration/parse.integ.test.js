const { getOutputText } = require('../../service/parseEndPoint');

describe('testing lms output', () => {
    it('basic flavour test', () => {
        const input = {
            intent: 'iceCream',
            entities: {
                iceCream: [
                    'chocolate',
                ],
                hello: [],
                goodBye: [],
            },
        };
        const output = getOutputText(input);
        expect(output).toEqual('chocolate ice cream');
    });
});
