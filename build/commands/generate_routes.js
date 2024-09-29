import { BaseCommand } from '@adonisjs/core/ace';
import router from '@adonisjs/core/services/router';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { BriskRoute, Route, RouteGroup, RouteResource } from '@adonisjs/core/http';
export default class GenerateRoutes extends BaseCommand {
    static commandName = 'generate:routes';
    static description = 'Generate a JSON file with all the application routes';
    static options = {
        startApp: true,
    };
    async run() {
        this.logger.info('Generating routes...');
        const routes = this.getRoutes();
        this.generateRouteFile(routes);
        this.logger.info('Routes generated and saved to inertia/utils/routes.json');
    }
    generateRouteFile(routes) {
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const directory = path.join(dirname, '..', 'inertia', 'lib');
        const filePath = path.join(directory, 'routes.json');
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        const jsonContent = JSON.stringify(routes, null, 2);
        fs.writeFileSync(filePath, jsonContent, 'utf-8');
    }
    getRoutes() {
        const routeRecords = [];
        router.routes.forEach((route) => {
            if (route instanceof Route) {
                const routeRecord = this.processSingleRoute(route);
                if (routeRecord) {
                    routeRecords.push(routeRecord);
                }
            }
            else if (route instanceof BriskRoute) {
                const routeRecord = this.processBriskRoute(route);
                if (routeRecord) {
                    routeRecords.push(routeRecord);
                }
            }
            else if (route instanceof RouteResource) {
                routeRecords.push(...this.processrouteResource(route));
            }
            else if (route instanceof RouteGroup) {
                routeRecords.push(...this.processRouteGroup(route));
            }
        });
        return routeRecords;
    }
    processSingleRoute(route) {
        const routeJSON = route.toJSON();
        if (routeJSON && routeJSON.name) {
            const record = {
                name: routeJSON.name,
                pattern: routeJSON.pattern,
                methods: routeJSON.methods,
                params: routeJSON.meta.params,
            };
            return record;
        }
        return null;
    }
    processBriskRoute(route) {
        const routeJSON = route.route?.toJSON();
        if (routeJSON && routeJSON.name) {
            const record = {
                name: routeJSON.name,
                pattern: routeJSON.pattern,
                methods: routeJSON.methods,
                params: routeJSON.meta.params,
            };
            return record;
        }
        return null;
    }
    processrouteResource(route) {
        const routeRecords = [];
        route.routes.forEach((iroute) => {
            const routeJSON = iroute.toJSON();
            if (routeJSON && routeJSON.name) {
                const record = {
                    name: routeJSON.name,
                    pattern: routeJSON.pattern,
                    methods: routeJSON.methods,
                    params: routeJSON.meta.params,
                };
                routeRecords.push(record);
            }
        });
        return routeRecords;
    }
    processRouteGroup(route) {
        const routeRecords = [];
        route.routes.forEach((iroute) => {
            if (iroute instanceof Route) {
                const routeRecord = this.processSingleRoute(iroute);
                if (routeRecord) {
                    routeRecords.push(routeRecord);
                }
            }
            else if (iroute instanceof BriskRoute) {
                const routeRecord = this.processBriskRoute(iroute);
                if (routeRecord) {
                    routeRecords.push(routeRecord);
                }
            }
            else if (iroute instanceof RouteResource) {
                routeRecords.push(...this.processrouteResource(iroute));
            }
            else if (iroute instanceof RouteGroup) {
                routeRecords.push(...this.processRouteGroup(iroute));
            }
        });
        return routeRecords;
    }
}
//# sourceMappingURL=generate_routes.js.map