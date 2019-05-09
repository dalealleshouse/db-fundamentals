import * as mocha from 'mocha';
import chaiHttp from 'chai-http'
import chai from 'chai'
import app from '../src/OkrApi';

const expect = chai.expect;

chai.use(chaiHttp);

describe('okr api should', () => {
  it('should fail', async () => {
    const response = await chai.request(app).get('/objectives/1');
    expect(response.status).to.eq(200);
  });
});
