import axios from "axios";

export async function getServerSideProps(ctx) {
    // let userid = ctx.query.userid;
    let userid = 'aaa111';
    let url = `http://localhost:3000/api/member/myinfo?userid=${userid}`;

    const res = await axios.get(url);
    const member = await res.data[0];
    console.log('pg myinfo - ', await member);

    return {props: {member} }
}

export default function Myinfo({member}) {
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