type GoogleSheet = { values: string[][] };

class GoogleSheetsProxy {
    private readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async getSheet(spreadsheetId: string, sheetName: string): Promise<GoogleSheet> {
        return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //update this token with yours.
                Authorization: `Bearer ${this.accessToken}`,
            },
        }).then((data) => data.json());
    }
}

export default GoogleSheetsProxy;
