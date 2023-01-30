export interface user {
    username: string;
    email: string;
    emailVisibility: true;
    password: string;
    passwordConfirm: string;
    pg: string;
    boss_name: string;
    boss_pg: string;
    signature_place: string;
    type: number;
    om: string;
    name: string;
}


export interface auxiliary_sheets {
    user_id: string;
    form_data: string;
    observations: string;
}
