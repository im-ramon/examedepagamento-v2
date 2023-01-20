export const adic_hab_data: AdicHabDataProps[] = [
    {
        'altos_estudos_I': 30,
        'altos_estudos_II': 25,
        'aperfeicoamento': 20,
        'especializacao': 16,
        'formacao': 12,
        'sem_formacao': 0,
        'startAt': '2001-08-31',
        'endAt': '2020-06-30'
    },
    {
        'altos_estudos_I': 42,
        'altos_estudos_II': 37,
        'aperfeicoamento': 27,
        'especializacao': 19,
        'formacao': 12,
        'sem_formacao': 0,
        'startAt': '2020-07-01',
        'endAt': '2021-06-30'
    },
    {
        'altos_estudos_I': 54,
        'altos_estudos_II': 49,
        'aperfeicoamento': 34,
        'especializacao': 22,
        'formacao': 12,
        'sem_formacao': 0,
        'startAt': '2021-07-01',
        'endAt': '2022-06-30'
    },
    {
        'altos_estudos_I': 66,
        'altos_estudos_II': 61,
        'aperfeicoamento': 41,
        'especializacao': 25,
        'formacao': 12,
        'sem_formacao': 0,
        'startAt': '2022-07-01',
        'endAt': '2023-06-30'
    },
    {
        'altos_estudos_I': 73,
        'altos_estudos_II': 68,
        'aperfeicoamento': 45,
        'especializacao': 27,
        'formacao': 12,
        'sem_formacao': 0,
        'startAt': '2023-07-01',
        'endAt': '2200-12-31'
    },
]

export interface AdicHabDataProps {
    altos_estudos_I: number;
    altos_estudos_II: number;
    aperfeicoamento: number;
    especializacao: number;
    formacao: number;
    sem_formacao: number;
    startAt: string;
    endAt: string;
}