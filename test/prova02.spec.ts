import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Dummy Json Api', () => {
  const password = faker.string.numeric(9);
  const userName = faker.internet.username();
  const dogName = faker.animal.dog();
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dummyjson.com';

  p.request.setDefaultTimeout(90000);

  beforeAll(async () => {});

  it('Get Recipes', async () => {
    const response = await p
      .spec()
      .get(`${baseUrl}/recipes`)
      .expectStatus(StatusCodes.OK);
      //.inspect();
  });

  it('Get Specific Recipe', async () => {
    const response = await p
      .spec()
      .get(`${baseUrl}/recipes/search?q=Margherita`)
      .expectStatus(StatusCodes.OK)
      .inspect();
  });

afterAll(() => p.reporter.end());
});