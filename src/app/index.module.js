import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';


angular.module('myapp2', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize',
              'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'satellizer'])

  .constant('API_URL', 'http://localhost:5000/')
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('compareTo', CompareToDirective);
