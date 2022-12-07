# Ui2022

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0-next.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## deploy to server via scp:
staging:
build: `yarn build --configuration=staging --base-href /backOffice2022/ --deploy-url /backOffice2022/`

deployment: `scp -r /home/ipat/weplantaforest/ui2022/dist/ui2022/* ipat@iplantatree.org:/home/ipat/weplantaforest/ui/dist/backOffice2022`

production:
!! extend urls in /assets/fonts/roboto/roboto.css
--> /assets/fonts/roboto/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2 -> /backOffice2022/assets/fonts/roboto/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2

build: `yarn build --configuration=production --base-href /backOffice2022/ --deploy-url /backOffice2022/`

deployment: `scp -r /home/ipat/weplantaforest/ui2022/dist/ui2022/* ipat@iplantatree.org:/home/ipat/iplantatree/ui/dist/backOffice2022`
