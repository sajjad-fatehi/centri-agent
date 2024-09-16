# CentriAgent

## Install

```sh
npm install centri-agent
```

## How To use

Simple, Just import and create Agent then call what method you want:

```js
import { CentriAgent } from 'centri-agent';

const CentrifugoConfig = {
  url: process.env.CENTRI_HOST || '',
  key: process.env.CENTRI_KEY || '',
};

const client = new CentriAgent(CentrifugoConfig.url, CentrifugoConfig.key);

// call method
const { channels } = await client.channels({ pattern: "*" });

console.log(channels);
//=> [{"channelA", "channelB"}]
```

**Hint** : methods args without any request parameters need to pass `{}`

### all types are sync with latests Centrifugo api docs (currently v5) you can find in

<https://centrifugal.dev/docs/server/server_api#http-api>
