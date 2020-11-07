'use strict';

const {test, trait} = use('Test/Suite')('Sandbox');
trait('Test/ApiClient');

test('Create a sandbox without user', async ({client}) => {
  const response = await client.post('/api/v1/sandbox/create').end();
  response.assertStatus(201);
  response.assertJSONSubset({
    message: 'created',
  });
});
