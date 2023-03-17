/*import '../styles/globals.css'*/
import {getSession} from "next-auth/client";
import React from "react";

import './index.css';
import '../pages/board.css';
import '../public/css/main.css'
import '../public/css/project2.css'
import '../public/css/normalize.css'
import App from "next/app";

function MyApp({ Component, pageProps, menu }) {
    console.log('myapp - ', menu);

    pageProps.meta = menu;

    const getLayout = Component.getLayout ?? ((page) => page);
    return (
      <React.Fragment>
          {getLayout(< Component {...pageProps} /> )}
      </React.Fragment>
  )
}

MyApp.getInitialProps = async (ctx) => {
    // nextjs app의 기본 props 객체 초기화 - 애플리케이션 단위 전역변수
    const appProps = await App.getInitialProps(ctx);

    const sess = await getSession(ctx);
    let menu = '<a href="/member/login">로그인</a>';
    if (sess) menu = '<a href="/member/logout">로그아웃</a>';

    appProps.menu = menu;
    console.log('app - ', appProps.menu);

    return { ...appProps }
}

export default MyApp