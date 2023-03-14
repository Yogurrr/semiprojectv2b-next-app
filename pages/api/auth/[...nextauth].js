// npm install next-auth@3.29.10 --save-dev
// 경로 : /pages/api/auth/[...nextauth].js
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
    providers: [
        Credentials({
            name: "userid-passwd-credentials",
            credentials: {
                userid: { label: "아이디", type: "text" },
                passwd: { label: "비밀번호", type: "password" }
            },   // 로그인 폼 정의
            async authorize(credentials, req) {
                // 입력한 인증 정보 가져옴
                const userid = credentials.userid;
                const passwd = credentials.passwd;
                if (userid === 'aaa111' && passwd === 'bbb111') {
                    return credentials;
                }
            }
        })
    ],
    callbacks: {
        // token, user, account, profile, isNewUser
        async jwt(token, user, account, profile, isNewUser) {
            console.log('jwt - ', user);
            if (user?.userid) token.userid = user.userid;

            return token;
            },
        // session, userOrToken
        async session(session, userOrToken) {
            console.log('session - ', userOrToken);
            session.user.userid = userOrToken.userid;

            return session;
        }
    }
});