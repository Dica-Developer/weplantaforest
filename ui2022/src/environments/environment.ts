// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // backendUrl: 'http://192.168.178.88:8081',
  // backendAdminUrl: 'http://192.168.178.88:8083',
  // backendArticleManagerUrl: 'http://192.168.178.88:8082',
  backendUrl: 'http://localhost:8081',
  backendAdminUrl: 'http://localhost:8083',
  backendArticleManagerUrl: 'http://localhost:8082',
  oldFrontendUrl: 'http://localhost:8080',
  frontendUrl: 'http://localhost:4200',
  baseUrl: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
