import { Produto } from './model/produto.model';
import { ProdutoService } from './produto.service';

interface IProdutoScope extends ng.IScope {
    produto: Produto;
}

export class ProdutoController {

    /** @ngInject */
    constructor(
        private produtoService: ProdutoService,
        private $scope: IProdutoScope,
        private toastr: angular.toastr.IToastrService,
        private $state: angular.ui.IStateService,
        private $timeout: ng.ITimeoutService
    ) {
        this.init();
    }

    public enviar(): void {
        if (this.$scope.produto._id) {
            this.atualizar();
        } else {
            this.salvar();
        }
    }

    public atualizar(): void {
        this.produtoService.update(this.$scope.produto)
            .then((response: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.success('Produto Atualizado');
                this.$timeout(() => {
                    this.$state.go('listar');
                }, 3000);
            })
            .catch((error: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.error('Ocorreu um erro. Tente novamente!');
            });
    }

    public salvar(): void {
        this.produtoService.save(this.$scope.produto)
            .then((response: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.success('Produto Cadastrado');
                this.$scope.produto = new Produto();
            })
            .catch((error: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.error('Ocorreu um erro. Tente novamente!');
            });
    }

    private buscarProduto(): void {
        this.produtoService.get(this.$scope.produto._id)
            .then((response: ng.IHttpPromiseCallbackArg<Produto>) => {
                this.$scope.produto = response.data[0];
            })
            .catch((error: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.error('Produto indisponível para edição.');
            });
    }

    private init(): void {
        this.$scope.produto = new Produto();
        if (this.$state.params['id']) {
            this.$scope.produto._id = this.$state.params['id'];
            this.buscarProduto();
        }
    }
}
