import { useState, useCallback, useEffect} from "react";



let logoutTimer;


export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);



    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        // 토큰 발급 후 토큰 유효기간을 보여주는 코드  1000 * 60 * 60은 1시간
        // 현재 시간 new Date()에  new Date().getTime()을 해서 1시간을 더한 Date 객체를 얻음
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token,
            expiration: tokenExpirationDate.toISOString()
        }));
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            setTimeout(logout, remainingTime);

        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration));

        }
    }, [login]);

    return { token, login, logout, userId }

}