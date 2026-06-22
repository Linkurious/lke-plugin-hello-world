import * as express from 'express';
import type {PluginConfig, PluginRouteOptions} from '@linkurious/rest-client';

export = function configureRoutes(options: PluginRouteOptions<PluginConfig>): void {
  options.router.use(express.json());
  options.router.get('/hello', async (req, res) => {
    try {
      const lkeStatus = await options.getRestClient(req).linkurious.getStatus();
      res.contentType('application/json');
      if (lkeStatus.isSuccess()) {
        res.status(200);
        res.send(JSON.stringify(lkeStatus.body));
      } else {
        res.status(400);
        res.send(JSON.stringify({error: lkeStatus.body}));
      }
    } catch (e) {
      res.status(400);
      res.send(JSON.stringify({error: e}));
    }
  });

  options.parentProcess.postMetadata({
    actions: [
      {
        name: 'Hello world',
        urlTemplate: '/',
        access: '*'
      }
    ]
  });
};
