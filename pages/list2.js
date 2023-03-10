import Link from "next/link";
import fetch from "isomorphic-unfetch";
// import mariadb from "mariadb";

const getStpgns = (cpg, alpg) => {
    let stpgn = parseInt((cpg - 1) / 10) * 10 + 1   // 페이지네이션 시작값
    let stpgns = [];
    for (let i = stpgn; i < stpgn + 10; ++i) {
        if (i <= alpg) {
            let iscpg = (i === cpg) ? false : true;   // 현재 페이지 표시
            let pgn = {'num': i, 'iscpg': iscpg}
            stpgns.push(pgn);
        }
    }
    return stpgns;
}

const getPgns = (cpg, alpg) => {
    let isprev = (cpg - 1 > 0);   // 이전 버튼 표시 여부 지정
    let isnext = (cpg < alpg);   // 다음 버튼 표시 여부 지정
    let isprev10 = (cpg - 1 >= 10);   // (cpg - 10 > 0)
    let isnext10 = (cpg <= alpg - 10);   // (cpg + 10 < alpg)
    let pgn = {'prev': cpg - 1, 'next': cpg + 1,   // 이전 : 현재 페이지 - 1, 다음 : 현재 페이지 + 1
        'isprev': isprev, 'isnext': isnext,
        'prev10': cpg - 10, 'next10': cpg + 10,
        'isprev10': isprev10, 'isnext10': isnext10};
    // 10 해서 안 되면 '9 + 1' 하기

    return pgn;
}

export async function getServerSideProps(ctx) {
    let [ cpg, ftype, fkey ] = [ ctx.query.cpg, ctx.query.ftype, ctx.query.fkey ];

    cpg = cpg ? parseInt(cpg) : 1;
    let params = `cpg=${cpg}`;   // 질의문자열 생성
    let url = `http://localhost:3000/api/board/list?${params}`;
    
    const res = await fetch(url);
    const boards = await res.json();

    let alpg = Math.ceil(  parseInt(boards.allcnt) / 25);   // 총 페이지수 계산

    // 페이지네이션 처리 1
    let stpgns = getStpgns(cpg, alpg);

    // 페이지네이션 처리 2
    let pgn = getPgns(cpg, alpg);

    // 처리 결과를 boards 객체에 추가
    boards.stpgns = stpgns;
    boards.pgn = pgn;

    return { props : {boards} }
}

export default function List( {boards} )  {
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
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>

                {boards.boards.map(bd => (
                    <tr key={bd.bno}>
                        <td>{bd.bno}</td>
                        <td>{bd.title}</td>
                        <td>{bd.userid}</td>
                        <td>{bd.regdate}</td>
                        <td>{bd.views}</td>
                    </tr>
                ))}

                </tbody>
            </table>

            <ul className="pagenation">
                {boards.pgn.isprev ? <li className="prev"><a href={`?cpg=${boards.pgn.prev}`}>이전</a></li> : ''}

                {boards.pgn.isprev10 ? <li className="prev"><a href={`?cpg=${boards.pgn.prev10}`}>이전10</a></li> : ''}

                {boards.stpgns.map( pgn => {
                    pgn.iscpg ?
                    <li key={pgn.num} className='cpage'>{pgn.num}</li> :
                    <li key={pgn.num}><a href={`?cpg=${pgn.num}`}>{pgn.num}</a></li>
                })}

                {boards.pgn.isnext10 ? <li className="prev"><a href={`?cpg=${boards.pgn.next10}`}>다음10</a></li> : ''}

                {boards.pgn.isnext ? <li className="prev"><a href={`?cpg=${boards.pgn.next}`}>다음</a></li> : ''}

            </ul>
        </main>
    )
}