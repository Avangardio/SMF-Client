export default function FormatMoney(amount: number): string {
    return `${Math.sign(amount) > 0 ? '+' : ''}` + Intl.NumberFormat('en', {notation: 'compact'}).format(amount);
}