import {useState} from "react";

import axios from "axios";

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    const url = `http://localhost:3000/api/board/view?bno=${bno}`;
    const res = await axios.get(url);
    const board = await res.data[0];
    console.log(board);

    return { props: {board} }
}

export default function Write ()  {

    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('yogurrr');
    const [contents, setContents] = useState('');

    return (
        <div className="write">
            <h3>새글쓰기</h3>
            <form name="write" className="writefrm">
                <div><label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" /></div>

                <div><label htmlFor="uid">작성자</label>
                    <input type="text" name="uid" id="uid" value={userid} readOnly /></div>

                <div><label htmlFor="contents" className="dragup">본문</label>
                    <textarea name="contents" id="contents" rows="7" cols="55">
                    </textarea></div>

                <div><label></label>
                    <button type="button">입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
    )
}