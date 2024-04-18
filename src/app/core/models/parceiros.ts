export interface ParceirosServiceModel {
    id: string;
    ckc: any;
    createdBy: string;
    created: string;
    lastUpdate: string;
    lastUpdateBy: string;
    cko: any;
    deleted: boolean;
    code: string;
    languageId: string;
    data: {
        ctn_00004: {
            slt_00001: {
                value: string;
                label: string;
            };
            ipt_00001: string;
            j_id: string;
        }[];
        ctn_00003: [],
        ctn_00005: {
            ipt_00001: string,
            ipt_00002: string,
            slt_00001: {
                value: string,
                label: string,
            },
            j_id: string
        }[];
        ipt_00002: string,
        ipt_00003: string,
        ipt_00004: string,
        ipt_00005: string,
    };
}
