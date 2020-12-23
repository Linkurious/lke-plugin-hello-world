import {PluginConfig, PluginRouteOptions} from '../@types/plugin';
import bodyParser from 'body-parser';

export = function configureRoutes(options: PluginRouteOptions<PluginConfig>): void {

  options.router.use(bodyParser.json());

};
