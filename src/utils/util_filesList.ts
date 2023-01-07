let archivesList = [
    'DESCONTOS@Dependentes_para_Imposto_de_Renda.pdf',
    'DESCONTOS@Desconto_de_Pensão_Militar_Ext.pdf',
    'DESCONTOS@Imposto_de_Renda.pdf',
    'DESCONTOS@Pensão_Alimentícia.pdf',
    'DESCONTOS@Pensão_Militar.pdf',
    'DESCONTOS@PNR.pdf',
    'LEIS@Normas_do_Exame_de_Pagamento_-_Portaria_nº_02_SEF_de 3_FEV_14.pdf',
    'LEIS@Cadastro_no_FuSEx_-_Portaria_nº_049-DGP_de_28_de_fevereiro_de_2008.pdf.pdf',
    'LEIS@Desconto_Dependente_FuSEx_-_Portaria_Cmt_662_de_14_MAIO_19.pdf.pdf',
    'LEIS@Histórico_da_remuneração_militar.pdf',
    'LEIS@Lei_de_Remuneração_dos_Militares_[Lei_Nr_13.954_de_16_DEZ_19].pdf',
    'LEIS@Lei_de_Remuneração_dos_Militares_[MP_Nº_2215,_de_DEZ_00).pdf',
    'LEIS@Portaria_nº_244-DGP,_de_7_OUT_2019.pdf',
    'RECEITAS@Adicional_de_Compensação_Orgânica.pdf',
    'RECEITAS@Adicional_de_Compensação_por_Disponibilidade_Militar.pdf',
    'RECEITAS@Adicional_de_Habilitação.pdf',
    'RECEITAS@Adicional_de_Tempo_de_Serviço.pdf',
    'RECEITAS@Adicional_Férias.pdf',
    'RECEITAS@Adicional_militar.pdf',
    'RECEITAS@Adicional_Natalino.pdf',
    'RECEITAS@Adicional_permanência.pdf',
    'RECEITAS@Assistência_Pré_Escolar.pdf',
    'RECEITAS@Auxílio_Alimentação.pdf',
    'RECEITAS@Auxílio_Fardamento.pdf',
    'RECEITAS@Auxílio_Invalidez.pdf',
    'RECEITAS@Auxílio_Natalidade.pdf',
    'RECEITAS@Auxílio_Transporte.pdf',
    'RECEITAS@Compensação_Pecuniária.pdf',
    'RECEITAS@Dependentes_para_Salário_Família.pdf',
    'RECEITAS@Gratificações_de_Representação_2%.pdf',
    'RECEITAS@Gratificações_de_Representação_de_Comando.pdf'
]

const receitas = archivesList.filter(el => el.split('@')[0] == "RECEITAS")
const descontos = archivesList.filter(el => el.split('@')[0] == "DESCONTOS")
const leis = archivesList.filter(el => el.split('@')[0] == "LEIS")

export const filesList = {
    receitas,
    descontos,
    leis
}