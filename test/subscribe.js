process.env.NODE_ENV = 'test';

const User = require('../api/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Subscribe', () => {

    /*
     * Test the /POST subscribe/route
     */
    describe('Subscribe the user', () => {
        it('it should not save a user without userId', (done) => {
            let user = {
                token: "4555",
                phoneNumber: "+201111111111",
                email: "mohamed1refaie@hotmail.com"
            };
            chai.request(app)
                .post('/subscribe')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('userId');
                    res.body.errors.userId.should.have.property('message');
                    res.body.errors.userId.should.have.property('message').eql('Path `userId` is required.');
                    done();
                });
        });

    });

    /*
     * Test the /POST subscribe/:topic route
     */
    describe('Subscribe the user or users to a topic', () => {
        it('it should not make a subscription to a topic without an ids field', (done) => {
            let object = {};
            chai.request(app)
                .post('/subscribe/sports')
                .send(object)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ids field is required');
                    done()
                });
        });
    });


});

