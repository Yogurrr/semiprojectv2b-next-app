import {useState} from "react";
import axios from "axios";
import {check_captcha, handleInput, process_submit} from "../../components/Utils";
import Layout from "../../components/layout/Layout";
import Home from "../index";

export default function Write()  {

    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('yogurrr');
    const [contents, setContents] = useState('');

    const handlewrite = async () => {
        if (grecaptcha.getResponse() && check_captcha(grecaptcha.getResponse())) {
            // 글쓰기 작업 진행
            const data = {title: title, userid: userid, contents: contents};
            if (await process_submit('/api/board/write', data) > 0) {
                location.href = '/board/list2';
            } else {
                alert('!!!');
            }
        }
    };

    return (
        <main className="write">
            <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>
                <div id="main">
                <h3>새글쓰기</h3>
                <form name="write" className="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" onChange={e => handleInput(setTitle, e)} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid" value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="dragup">본문</label>
                        <textarea name="contents" id="contents" rows="7" cols="55" onChange={e => handleInput(setContents, e)}>
                        </textarea></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey='6LdU4OskAAAAAGphv-UlASNVhJs3LGCNl6cfbJJr'></div>
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

Write.getLayout = (page) => (
    <Layout meta={{title: "새글쓰기"}}>
        {page}
    </Layout>
);