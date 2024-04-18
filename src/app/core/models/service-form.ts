// export interface ServiceForm {
//     j_id: string,
//     slt_00004: { value: string, label: string },
//     slt_00001: { value: string, label: string },
//     slt_00003: { value: "ABERTO", label: "ABERTO" },
//     ipt_00001: string
// }


export interface ServiceForm {
    j_id: string,
    // slt_00004: { value: string, label: string },
    segmento_id: string,
    segmento_value: string,
    // slt_00001: { value: string, label: string },
    servico_id: string,
    servico_label: string,
    status_label: string,
    status_value: string,
    file_name?: string, 
    file_id?: string, 

    // slt_00003: { value: "ABERTO", label: "ABERTO" },
    descricao: string
}