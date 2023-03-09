import Link from "next/link";

const Nav = () => {
    return (
        <ul className="nav">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/join">회원가입</Link></li>
            <li><Link href="/login">로그인</Link></li>
            <li><Link href="/list">게시판</Link></li>
            <li><Link href="/myinfo">회원정보</Link></li>
        </ul>
    );
}

export default Nav;