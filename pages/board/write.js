import {useState} from "react";

import axios from "axios";
// import {getRawProjectId} from "next/dist/telemetry/project-id";

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    const url = `http://localhost:3000/api/board/view?bno=${bno}`;
    const res = await axios.get(url);
    const board = await res.data[0];
    // console.log(board);

    return { props: {board} }
}

const check_captcha = async (response) => {
    let url = '/api/board/recaptcha?response=' + response;
    const data = axios.get(url).then(data => data.data);
    console.log((await data).success);

    return (await data).success;
};
const process_write = async (data) => {
    const cnt = fetch('/api/board/write', {
        method: 'POST', mode: 'cors', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());

    return (await cnt).cnt;
};
export default function Write()  {

    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('yogurrr');
    const [contents, setContents] = useState('');
    // const [recaptcha, setRecaptcha] = useState(undefined);

    const handlewrite = () => {
        if (grecaptcha.getResponse() && check_captcha(grecaptcha.getResponse())) {
            // 글쓰기 작업 진행
            const data = {title: title, userid: userid, contents: contents};
            if (process_write(data) > 0) {
                location.href = '/board/list2';
            }
        }
    };
    const handleTitle = (e) => {
        setTitle(e.target.value)
    };
    const handleContents = (e) => {
        setContents(e.target.value)
    };
    return (
        <main className="write">
            <div id="main">
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                <h3>새글쓰기</h3>
                <form name="write" className="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" onChange={handleTitle} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid" value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="dragup">본문</label>
                        <textarea name="contents" id="contents" rows="7" cols="55" onChange={handleContents}>
                        </textarea></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey='6LdU4OskAAAAAGphv-UlASNVhJs3LGCNl6cfbJJr'></div>
                        {/*process.env.SITE_KEY*/}
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handlewrite}>입력완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>
    )
}