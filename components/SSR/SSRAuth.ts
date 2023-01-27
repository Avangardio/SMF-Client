import {wrapper} from "../Redux/store";
import axios from "axios";
import {authUser} from "../Redux/Reducers/authReducer";
import {authLink} from "../../LINKS";

//функция для ССР для аутентификации пользователя
export const SSRAuth = wrapper.getServerSideProps(
    // @ts-ignore
    store => async ({req, res}) => {
        //отправляем запрос на сервер
        const answer = await axios(`${authLink}/auth/credentialsLogin`, {
            method: "GET",
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req!.headers.cookie
            }
        })
            .catch(error => {
                //ошибка 406 выскочит если уебаны взломали куки
                if (error.response.status === 406) return;
            })
        //если нет ответа, то куки взломаны и надо их удалить
        if (!answer) {
            //удаляем jwt куки
            //удаляем внешний логин куки
            res.setHeader('Set-Cookie', [`next-auth.session-token=1; Max-Age = -1`, `account=1; Max-Age = -1`]);
            console.log(1)
            return;
        }
        //пробрасываем пользователю куки с аутентификацией
        if (answer.headers["set-cookie"]) {
            //todo возможно потом доработать чтоб искал именно аккаунт
            res.setHeader('Set-Cookie', answer.headers["set-cookie"]);
        }
        //добавляем пользоваптеля и токен в стор
        await store.dispatch(authUser(answer.data))
    }
);
export default SSRAuth;