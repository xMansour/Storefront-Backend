import supertest from 'supertest';
import app from '../../app';

const req = supertest(app);

describe('Order Handler Spec', () => {
  it('[GET] /orders Should require a JWT', (done) => {
    req.get('/orders').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  it('[GET] /orders/1 Should require a JWT', (done) => {
    req.get('/orders/1').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  it('[POST] /orders/1 Should require a JWT', (done) => {
    req.get('/orders/1').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });
});
