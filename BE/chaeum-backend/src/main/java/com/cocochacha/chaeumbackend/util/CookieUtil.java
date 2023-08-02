package com.cocochacha.chaeumbackend.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Base64;
import org.springframework.util.SerializationUtils;

/**
 * 쿠키 관리 클래스입니다.
 */
public class CookieUtil {

    /**
     * 요청값(이름, 값, 만료 기간)을 바탕으로 쿠키를 추가합니다.
     *
     * @param response HttpServletResponse 객체
     * @param name     쿠키의 이름
     * @param value    쿠키의 값
     * @param maxAge   쿠키의 만료 기간 (초 단위)
     */
    public static void addCookie(HttpServletResponse response, String name, String value,
            int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);

        response.addCookie(cookie);
    }

    /**
     * 쿠키의 이름을 입력받아 해당 이름의 쿠키를 삭제합니다.
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @param name     삭제할 쿠키의 이름
     */
    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response,
            String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return;
        }

        for (Cookie cookie : cookies) {
            if (name.equals(cookie.getName())) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }

    /**
     * 객체를 직렬화하여 쿠키의 값으로 변환합니다.
     *
     * @param obj 직렬화할 객체
     * @return 쿠키의 값으로 사용할 문자열 반환
     */
    public static String serialize(Object obj) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(obj));
    }

    /**
     * 객체를 역직렬화하여 객체로 변환합니다.
     *
     * @param cookie 쿠키 객체
     * @param cls    역직렬화된 객체의 Class 형식
     * @param <T>    객체의 타입을 나타내는 제네릭 타입
     * @return 역직렬화한 객체 반환
     */
    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }
}
