import { ServiceBase } from '../core/ServiceBase';

export default class HighValueItemService extends ServiceBase {

    async retrieveItems() {
        const result = await this.requestJson({
            url: '/api/highValueItems',
            method: 'GET',
        });
        return result;
    }

    async addItem(item) {
        const result = await this.requestJson({
            url: '/api/highValueItems',
            method: 'POST',
            data: item,
        });
        return result;
    }

    async removeItem(id) {
        var result = await this.requestJson({
            url: `/api/highValueItems/${id}`,
            method: 'DELETE',
        });
        return result;
    }

};
