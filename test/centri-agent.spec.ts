import { CentriAgent } from '../src';

const CentrifugoConfig = {
  url: process.env.CENTRI_HOST || '',
  key: process.env.CENTRI_KEY || '',
};

describe('API Agent', () => {
  const client = new CentriAgent(CentrifugoConfig.url, CentrifugoConfig.key);

  it('should return info', async () => {
    const { nodes } = await client.info({});
    expect(Array.isArray(nodes)).toBeTruthy();
  });

  it('should return channels', async () => {
    const { channels } = await client.channels({});
    expect(Array.isArray(channels)).toBeTruthy();
  });
});
