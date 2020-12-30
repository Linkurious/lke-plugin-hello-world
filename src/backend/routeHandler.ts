import bodyParser from 'body-parser';

import {PluginConfig, PluginRouteOptions} from '../@types/plugin';

export = function configureRoutes(options: PluginRouteOptions<PluginConfig>): void {
  options.router.use(bodyParser.json());
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
};
