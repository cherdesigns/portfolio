class GoogleSheetsProxy {
    private readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async getSheet(spreadsheetId: string, sheetName: string) {
        return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
            },
        }).then((data) => data.json());
    }
}

export default GoogleSheetsProxy;
