/* eslint-disable global-require */

const request = require('supertest');

describe('Lms endpoints', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Schema validation test', () => {
        it('should reply 200 with original message, because message doesn\'t contain a conversation property',
            async () => {
                const server = require('../../index');
                const response = await request(server)
                    .post('/lms')
                    .send({
                        intent: 'ICE_CREAM',
                        entities: { flavour: 'vanilla' },
                        response: null,
                    })
                    .expect(200);
                const body = {
                    output: 'here is a vanilla Ice Cream',
                };

                expect(response.body).toEqual(body);
            });
    });
});
