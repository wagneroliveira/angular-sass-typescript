/// <reference path="../../typings/main/index.d.ts" />

import { ProdutoService } from './produto/produto.service';
import { HomeController } from './home/home.controller';
import { DetalharController } from './detalhar/detalhar.controller';
import { ProdutoController } from './produto/produto.controller';
import { ListarController } from './listar/listar.controller';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { API_URL } from './index.constants';

module projetoFinalCurso {
  'use strict';

  // Definição do módulo
  angular.module('projetoFinalCurso', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ui.router',
    'ui.bootstrap',
    'toastr',
    'angular-loading-bar'
  ])
    // Configuaração
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .constant('API_URL', API_URL)

    // Controllers
    .controller('HomeController', HomeController)
    .controller('ListarController', ListarController)
    .controller('ProdutoController', ProdutoController)
    .controller('DetalharController', DetalharController)

    // Services
    .service('produtoService', ProdutoService)

    // Diretivas
    .directive('acmeNavbar', acmeNavbar);
}
