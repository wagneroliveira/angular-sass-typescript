import { ProdutoService } from './../produto/produto.service';
import { Produto } from './../produto/model/produto.model';

interface IListarScope extends ng.IScope {
    produtos: Produto[];
}

export class ListarController {

    /** @ngInject */
    constructor(
        private $scope: IListarScope,
        private produtoService: ProdutoService,
        private toastr: angular.toastr.IToastrService,
        private $state: angular.ui.IStateService
    ) {
        this.init();
    }

    public remover(id: string): void {
        this.produtoService.delete(id)
            .then((response: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.success('Produto removido.');
                this.listar();
            })
            .catch((error: ng.IHttpPromiseCallbackArg<string>) => {
                this.toastr.error('Não foi possível remover o produto.');
            });
    }

    public editar(id: string): void {
        this.$state.go('editar', { id: id });
    }

    private listar(): void {
        this.produtoService.list()
            .then((response: ng.IHttpPromiseCallbackArg<Produto[]>) => {
                this.$scope.produtos = response.data;
            })
            .catch((error: ng.IHttpPromiseCallbackArg<string>) => {
                this.$scope.produtos = new Array<Produto>();
                this.toastr.error('Lista de produtos não disponível.');
            });
    }

    private init(): void {
        this.$scope.produtos = new Array<Produto>();
        this.listar();
    }
}
