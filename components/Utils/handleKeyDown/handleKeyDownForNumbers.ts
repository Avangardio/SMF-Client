//Функция-обработчик нажатия, предотвращает нажатия не на цифры
export default function handleKeyDownForNumbers(event: React.KeyboardEvent<HTMLInputElement>) {
    const keys = ['Period', 'Backspace', 'Minus', 'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'];
    //ищем совпадения
    if (!keys.includes(event.code) || event.code === 'Shift') event.preventDefault();
}