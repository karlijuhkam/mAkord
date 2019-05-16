export interface Band {
    id: number;
    name: string;
    introduction: string;
}

export interface BandRequest {
    name?: string;
    introduction?: string;
}

export class BandFilter {
    name?: string;
    page: 0;
    size: 10;
    sort?: string;
    sortDir?: string;

    getParams(): any {
        const params: any = {};

        if (this.name) {
            params.name = this.name;
        }

        if (this.page > 0) {
            params.page = this.page;
        }

        if (this.size > 0) {
            params.size = this.size;
        }

        if (this.sort) {
            params.sort = this.sort;
        }

        if (this.sortDir) {
            params.sortDir = this.sortDir;
        }
        return params;
    }
}
