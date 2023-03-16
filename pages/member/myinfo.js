import axios from "axios";
import {getSession, signOut, useSession} from "next-auth/client";
import Layout from "../../components/layout/Layout";
import Home from "../index";

export async function getServerSideProps(ctx) {
    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if(!sess) {   // 로그인하지 않은 경우 로그인으로 이동
        return {
            redirect: { permanent: false, destination: '/member/login' },
            props: {}
        }
    }

    // let userid = ctx.query.userid;
    // let userid = 'aaa111';
    let userid = sess.user.userid;   // 로그인한 사용자 아이디
    let url = `http://localhost:3000/api/member/myinfo?userid=${userid}`;

    const res = await axios.get(url);
    const member = await res.data[0];
    console.log('pg myinfo - ', await member);

    return { props: { member: member, session: sess } }
}

export default function Myinfo({member, session}) {

    // const {session, loading} = useSession();
    console.log('myinfo - ', session?.user?.userid);

    return (
        <main>
            <h3>회원정보</h3>
            <table className="myinfo">
                <tbody>
                <tr>
                    <td>아이디</td>
                    <td>{member.userid}</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>{member.name}</td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>{member.email}</td>
                </tr>
                <tr>
                    <td>가입일</td>
                    <td>{member.regdate}</td>
                </tr>
                </tbody>
            </table>
        </main>
    )
}

Myinfo.getLayout = (page) => (
    <Layout meta={{title: "회원정보"}}>
        {page}
    </Layout>
);