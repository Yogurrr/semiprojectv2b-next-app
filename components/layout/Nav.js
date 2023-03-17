import Link from "next/link";
import {getSession} from "next-auth/client";

// component에는 getServerSideProps 사용 불가!!
/*export async function getServerSideProps(ctx) {
    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    console.log('header` - ', sess);

    return { props: {sess} }
}*/

const Nav = ({menu}) => {
    // console.log('nav - ', menu);
    return (
        <ul className="nav">
            <li><Link href="/">Home</Link></li>
            <li><a href="/member/join">회원가입</a></li>   {/*페이지 열 때마다 새롭게 렌더링해야하기 때문에 Link 태그 대신에 a 태그를 씀*/}

            {/*문자열을 html 태그로 출력 dangerouslySetInnerHTML */}
            <li dangerouslySetInnerHTML={{ __html: menu }}></li>

            <li><Link href="/board/list">게시판</Link></li>
            <li><Link href="/member/myinfo">회원정보</Link></li>
        </ul>
    );
}

export default Nav;