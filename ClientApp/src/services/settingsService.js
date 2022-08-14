import { ServiceBase } from '../core/ServiceBase';

export default class SettingsService extends ServiceBase {

    async retrieveSettings() {
        const result = await this.requestJson({
            url: '/api/settings',
            method: 'GET',
        });
        return result;
    }

}
