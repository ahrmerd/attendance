import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import router from '@adonisjs/core/services/router'
import { RouteRecord } from 'route_record.js'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { BriskRoute, Route, RouteGroup, RouteResource } from '@adonisjs/core/http'
// import { url } from 'node:inspector'

export default class GenerateRoutes extends BaseCommand {
  static commandName = 'generate:routes'
  static description = 'Generate a JSON file with all the application routes'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Generating routes...')
    const routes = this.getRoutes()
    this.generateRouteFile(routes)
    this.logger.info('Routes generated and saved to inertia/utils/routes.json')
  }

  generateRouteFile(routes: RouteRecord[]) {
    // const filePath = path.resolve(
    //   path.dirname(fileURLToPath(import.meta.url)),
    //   'inertia/utils/routes.json'
    // )
    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)

    const directory = path.join(dirname, '..', 'inertia', 'lib')
    const filePath = path.join(directory, 'routes.json')

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    // const filePath = path.join(
    //   path.dirname(fileURLToPath(import.meta.url)),
    //   '..',
    //   '..',
    //   'inertia',
    //   'utils',
    //   'routes.json'
    // )

    // Convert the routes array to JSON format
    const jsonContent = JSON.stringify(routes, null, 2)

    // Write the JSON to the file
    fs.writeFileSync(filePath, jsonContent, 'utf-8')
  }
  getRoutes(): RouteRecord[] {
    const routeRecords: RouteRecord[] = []
    // const routesJSON = router.toJSON()
    // console.log(routesJSON)
    // console.log(
    router.routes.forEach((route) => {
      if (route instanceof Route) {
        const routeRecord = this.processSingleRoute(route)
        if (routeRecord) {
          routeRecords.push(routeRecord)
        }
      } else if (route instanceof BriskRoute) {
        const routeRecord = this.processBriskRoute(route)
        if (routeRecord) {
          routeRecords.push(routeRecord)
        }
      } else if (route instanceof RouteResource) {
        routeRecords.push(...this.processrouteResource(route))
      } else if (route instanceof RouteGroup) {
        routeRecords.push(...this.processRouteGroup(route))
      }
    })

    // )

    // Iterate over the keys in the routesObject
    // for (const group in routesJSON) {
    //   // Access the array of RouteJSON objects for this group
    //   const routesArray = routesJSON[group]

    //   // Map over the array to extract and process each route
    //   const routes = routesArray
    //     .filter((route) => {
    //       route.name !== undefined
    //     })
    //     .map((route) => ({
    //       name: route.name!,
    //       pattern: route.pattern,
    //       methods: route.methods,
    //       params: route.meta.params, // Adjust according to your structure
    //     }))

    //   // Add the processed routes to the final array
    //   routeRecords.push(...routes)
    // }

    return routeRecords
  }

  processSingleRoute(route: Route): RouteRecord | null {
    const routeJSON = route.toJSON()
    if (routeJSON && routeJSON.name) {
      const record: RouteRecord = {
        name: routeJSON.name,
        pattern: routeJSON.pattern,
        methods: routeJSON.methods,
        params: routeJSON.meta.params, // Adjust according to your structure
      }
      return record
    }
    return null
  }

  processBriskRoute(route: BriskRoute): RouteRecord | null {
    const routeJSON = route.route?.toJSON()
    if (routeJSON && routeJSON.name) {
      const record: RouteRecord = {
        name: routeJSON.name,
        pattern: routeJSON.pattern,
        methods: routeJSON.methods,
        params: routeJSON.meta.params, // Adjust according to your structure
      }
      return record
    }
    return null
  }
  processrouteResource(route: RouteResource): RouteRecord[] {
    const routeRecords: RouteRecord[] = []
    route.routes.forEach((iroute) => {
      const routeJSON = iroute.toJSON()
      if (routeJSON && routeJSON.name) {
        const record: RouteRecord = {
          name: routeJSON.name,
          pattern: routeJSON.pattern,
          methods: routeJSON.methods,
          params: routeJSON.meta.params, // Adjust according to your structure
        }
        routeRecords.push(record)
      }
    })
    return routeRecords
  }
  processRouteGroup(route: RouteGroup): RouteRecord[] {
    const routeRecords: RouteRecord[] = []
    route.routes.forEach((iroute) => {
      if (iroute instanceof Route) {
        const routeRecord = this.processSingleRoute(iroute)
        if (routeRecord) {
          routeRecords.push(routeRecord)
        }
      } else if (iroute instanceof BriskRoute) {
        const routeRecord = this.processBriskRoute(iroute)
        if (routeRecord) {
          routeRecords.push(routeRecord)
        }
      } else if (iroute instanceof RouteResource) {
        routeRecords.push(...this.processrouteResource(iroute))
      } else if (iroute instanceof RouteGroup) {
        routeRecords.push(...this.processRouteGroup(iroute))
      }
    })
    return routeRecords
  }
  //   const routeJSON = route.toJSON()
  //   const record: RouteRecord = {
  //     name: routeJSON.name!,
  //     pattern: routeJSON.pattern,
  //     methods: routeJSON.methods,
  //     params: routeJSON.meta.params, // Adjust according to your structure
  //   }
  //   return record
  // }
}
//   getRoutes(): RouteRecord[] {
//     const routeRecords = []
//     const routesJSON = router.toJSON()
//     console.log(routesJSON)
//     // console.log(
//     router.routes.forEach((route) => {
//       if (route instanceof Route) {
//         console.log(route.getName())
//       }
//     })
//     // )

//     // Iterate over the keys in the routesObject
//     for (const group in routesJSON) {
//       // Access the array of RouteJSON objects for this group
//       const routesArray = routesJSON[group]

//       // Map over the array to extract and process each route
//       const routes = routesArray
//         .filter((route) => {
//           route.name !== undefined
//         })
//         .map((route) => ({
//           name: route.name!,
//           pattern: route.pattern,
//           methods: route.methods,
//           params: route.meta.params, // Adjust according to your structure
//         }))

//       // Add the processed routes to the final array
//       routeRecords.push(...routes)
//     }

//     return routeRecords
//   }
// }
// ;Route | RouteResource | RouteGroup | BriskRoute
