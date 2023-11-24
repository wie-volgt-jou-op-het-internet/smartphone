export class Kiosk {
    constructor(name) {
        this.api = `http://192.168.88.100:7379/GET/${name}`;
    }

    async isActive() {
        try {
            const apiResponse = await fetch(this.api)
                .then(res => res.json())
                .then(res => res['GET']);
            return Boolean(apiResponse);
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}