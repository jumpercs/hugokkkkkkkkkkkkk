export interface FormularioModel {
    id: string;
    ckc: null;
    createdBy: string;
    created: string;
    lastUpdate: string;
    lastUpdateBy: null;
    cko: null;
    deleted: boolean;
    code: string;
    languageId: string;
    data: {
        ctn_00005: FormularioServiceModel[];
        slt_00001: string;
        ipt_00002: string;
        ipt_00003: string;
        ipt_00004: string;
        ipt_00005: string;
    };
}


export interface FormularioServiceModel {
    j_id: string;
    slt_00004: {
        value: string;
        label: string;
    },
    slt_00001: {
        value: string;
        label: string;
    },
    slt_00002: {
        value: string;
        label: string;
    } | undefined;
    slt_00003: {
        value: string;
        label: string;
    },
    cst_00001: {
        code: string;
        name: string;
    } | undefined;

    ipt_00001: string
}