//Декларируем тип для стейта дат
declare type DateType = string
//Интерфейс для стейта элемента

//Декларируем тип для описания обьекта элемента даты
declare type dataType = {
    action_id?: number,
    action_date: string,
    action_name: string,
    action_description?: string,
    action_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    action_amount?: number,
    action_currency?: string
}