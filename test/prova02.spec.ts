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
  
  describe('Recipes', () => {
    it('Get Recipes', async () => {
      await p
        .spec()
        .get(`${baseUrl}/recipes`)
        .expectStatus(StatusCodes.OK);
    });

    it('Get Specific Recipe', async () => {
      await p
        .spec()
        .get(`${baseUrl}/recipes/search?q=Margherita`)
        .expectStatus(StatusCodes.OK);
    });
  });
  
  describe('Posts', () => {
    it('Get Posts', async () => {
      await p
        .spec()
        .get(`${baseUrl}/posts`)
        .expectStatus(StatusCodes.OK);
    });
    it('Get Specific Post', async () => {
      await p
        .spec()
        .get(`${baseUrl}/posts/250`)
        .expectStatus(StatusCodes.OK);
    });
    it('Add a new post created', async () => {
      await p
        .spec()
        .post(`${baseUrl}/posts/add`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
          title: 'I am in love with someone.',
          userId: 5
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'I am in love with someone.',
          userId: 5
        });
    });

    it('Update post success', async () => {
      await p
        .spec()
        .put(`${baseUrl}/posts/250`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
          title: 'The peaceful village.'
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 250,
          title: 'The peaceful village.'
        });
    });
    it('Update post failed', async () => {
      await p
        .spec()
        .put(`${baseUrl}/posts/252`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
          title: 'The peaceful village.'
        })
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });
  describe('Products', () => {
    it('Search Product succes', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/search?q=phone`)
        .expectStatus(StatusCodes.OK);
    });
    it('Search Product not found', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/search?q=phhone`)
        .expectJsonLike({
          "products": []
        });
    });
    it('should create a new product', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
          title: 'BMW Pencil',
          price: 3.99,
          brand: 'BMW',
          category: 'stationery'
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'BMW Pencil',
          brand: 'BMW'
        });
    });
    it('Update an existing product', async () => {
      await p
        .spec()
        .put('https://dummyjson.com/products/1')
        .withJson({
          title: 'Updated BMW Pencil',
          price: 4.99
        })
        .expectStatus(200)
        .expectJsonLike({
          id: 1,
          title: 'Updated BMW Pencil',
          price: 4.99
        });
    });
    it('Delete an existing product', async () => {
      await p
        .spec()
        .delete('https://dummyjson.com/products/1')
        .expectStatus(200)
        .expectJsonLike({
          id: 1
        });
    });    
  });

afterAll(() => p.reporter.end());
});