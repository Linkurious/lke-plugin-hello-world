import * as express from 'express';
import type {PluginConfig, PluginRouteOptions} from '@linkurious/rest-client';

/**
 * Configure the routes and metadata of the plugin.
 *
 * This function is the backend entry point declared in the `backendFiles` field
 * of the plugin manifest. It is invoked by Linkurious Enterprise when the plugin
 * starts, and is responsible for:
 * - registering the plugin's HTTP API routes on the provided router;
 * - declaring the plugin's custom actions through the parent process metadata.
 *
 * @param options - The plugin context injected by Linkurious Enterprise, providing
 * the Express router, the plugin configuration, a REST client factory and a handle
 * to the parent process.
 */
export = function configureRoutes(options: PluginRouteOptions<PluginConfig>): void {
  // Parse incoming request bodies as JSON, exposing the result on `req.body`.
  // This is not actually needed by the `/hello` route below, which takes no body;
  // it is only here to demonstrate how to configure Express middleware.
  options.router.use(express.json());

  /**
   * GET /hello
   *
   * Queries the status of the Linkurious Enterprise server using the REST client
   * scoped to the current request, and returns it as JSON.
   *
   * @returns 200 with the server status on success, 400 with an `error` field
   * otherwise.
   */
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

  // Register the plugin actions with the host process. Each action is
  // surfaced in the Linkurious Enterprise UI and opens the given URL template,
  // relative to the plugin's base path, when triggered.
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
