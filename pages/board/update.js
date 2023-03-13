import axios from "axios";
import {useState} from "react";
import { check_captcha } from "../../models/Utils";

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    const url = `http://localhost:3000/api/board/view?bno=${bno}`;
    const res = await axios.get(url);
    const board = await res.data[0];

    return { props: {board} }
}

const process_update = async (data) => {
    const cnt = fetch('/api/board/update', {
        method: 'post', mode: 'cors', body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }).then(async res => await res.json());

    return await cnt;
};
export default function Update({board}) {

    const [title, setTitle] = useState(board.title);
    const [userid, setUserid] = useState('yogurrr');
    const [contents, setContents] = useState(board.contents);

    const handleUpdate = async () => {
        if (grecaptcha.getResponse() && await check_captcha(grecaptcha.getResponse)) {
            let data = {bno: board.bno, title: title, contents: contents};
            if ((await process_update(data)).cnt > 0) location.href = '/board/view?bno=' + board.bno;
        } else {
            alert('!!!');
        }
    };

    const handleInput = (setInput, e) => {
        setInput(e.target.value);
    };

    return (
        <main className="write">
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div id="main">
                <h3>게시판 수정하기</h3>
                <form name="write" className="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" value={title} onChange={e => handleInput(setTitle, e)} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid" value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="dragup">본문</label>
                        <textarea name="contents" id="contents" rows="7" cols="55" onChange={e => handleInput(setContents, e)}>
                        {contents}</textarea></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey='6LdU4OskAAAAAGphv-UlASNVhJs3LGCNl6cfbJJr'></div>
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handleUpdate}>수정완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>
    );
}