import Link from "next/link";

const Nav = () => {
    return (
        <ul className="nav">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pages/member/join">회원가입</Link></li>
            <li><Link href="/pages/member/login">로그인</Link></li>
            <li><Link href="/board/list2">게시판</Link></li>
            <li><Link href="/pages/member/myinfo">회원정보</Link></li>
        </ul>
    );
}

export default Nav;