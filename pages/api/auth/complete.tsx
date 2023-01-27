import type {NextApiRequest, NextApiResponse} from 'next';
import axios from "axios";
import {authLink, callbackUrl} from "../../../LINKS";


type Data = {
    name: string
}
//функция для регистрации/логина пользователя черещ внешную систему
export default async function complete(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        //Получаем данные из сесси апи
        //Примерный ответ: {"user":{"name":"Avangardio","email":"12lol34lol56lol@gmail.com","image":"https://lh3.googleusercontent.com/a/AEdFTp57y9WnU-cTOae2nhpvjIznFBx-NukfkjTLli--Ig=s96-c"},"expires":"2023-02-03T19:03:19.767Z"}
        const response = await axios.get(`${callbackUrl}/api/auth/session`, {
            //включаем куки
            withCredentials: true,
            // В заголовках пробрасываем куки от пользователя на апи
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req!.headers.cookie
            }
        });
        //отправляем запрос на сервер, ждем ответа, прикрепляем имейл и никнейм из ответа
        const answer = await axios.get(`${authLink}/auth/externalLogin?email=${response.data.user.email}&nickname=${response.data.user.name}`, {
            //включаем куки
            withCredentials: true,
            // В заголовках пробрасываем куки от пользователя на апи
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req!.headers.cookie
            }
        });
        //пробрасываем от апи -) пользователю куки с аутентификацией
        if (answer.headers["set-cookie"]) {
            res.setHeader('Set-Cookie', answer.headers["set-cookie"]);
        }
        //ловим ошибки
    } catch (error) {
        //todo доработать обработку ошибки, хз как пока
        console.log(error)
        //res.redirect('/');
    }
    //Наконец, отправляем пользователя на главную
    res.redirect('/')
}
