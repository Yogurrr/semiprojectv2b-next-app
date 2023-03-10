import Link from "next/link";
import fetch from "isomorphic-unfetch";

Member.getInitialProps = async function(ctx) {
    const res = await fetch(`http://localhost:3000/api/member`);
    const member = await res.json();

    return { member : member }
}

export default function Member(props)  {
    return (
        <main className="list">
            <h3>게시판</h3>
            <table className="board">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <tbody>
                <tr>
                    <td colSpan='5' className="alignrgt" style={{background: "white"}}>
                        <button><Link href='/write'>새글쓰기</Link></button>
                    </td>
                </tr>
                <tr>
                    <th>번호</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>가입일</th>
                </tr>

                {props.member.map(mem => (
                    <tr key={mem.mno}>
                        <td>{mem.mno}</td>
                        <td>{mem.userid}</td>
                        <td>{mem.name}</td>
                        <td>{mem.email}</td>
                        <td>{mem.regdate}</td>
                    </tr>
                ))}

                </tbody>
            </table>

            <ul className="pagenation">
                <li className="prev">이전</li>
                <li className="cpage">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>다음</li>
            </ul>
        </main>
    )
}