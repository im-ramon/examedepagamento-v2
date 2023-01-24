export function convert_in_BRL(value: string | number | null): string | null {
    return value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : null;
}