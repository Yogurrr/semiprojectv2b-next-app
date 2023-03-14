import Link from "next/link";

const Nav = () => {
    return (
        <ul className="nav">
            <li><Link href="/">Home</Link></li>
            <li><a href="/member/join">회원가입</a></li>   {/*페이지 열 때마다 새롭게 렌더링해야하기 때문에 Link 태그 대신에 a 태그를 씀*/}
            <li><a href="/member/login">로그인</a></li>
            <li><Link href="/board/list2">게시판</Link></li>
            <li><Link href="/member/myinfo">회원정보</Link></li>
        </ul>
    );
}

export default Nav;