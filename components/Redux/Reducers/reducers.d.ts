//интерфейс для действия по возможной аутентификации и получению токена в любом случае
declare interface Auth_authUser {//Токен для работы с сервером
    token: string
    //Информация об аккаунте, если есть, значит юзер залогинен
    account?: {
        email: string
        nickname: string
    }
}

//Декларируем Интерфейс будущего слайса
declare interface IFinanceReducer {
    data: dataType[]
    status: 'loading' | 'ready' | 'error'
}

//Декларируем тип для описания обьекта элемента даты
declare type dataType = {
    action_id: string,
    action_date: string,
    action_name: string,
    action_description: string,
    action_place: string,
    action_type: string,
    action_files: string,
    action_amount: string,
    action_currency: string
}