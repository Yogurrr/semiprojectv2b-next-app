import {useState} from "react";
import {check_captcha, handleInput, hashPassword, process_submit} from "../../models/Utils";

export default function Join() {

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handlejoin = async () => {
        if (grecaptcha.getResponse() && check_captcha(grecaptcha.getResponse())) {
            // 회원가입 작업 진행
            let hshpwd = await hashPassword(passwd);   // 암호를 해쉬화 함
            const data = {userid: userid, passwd: await hshpwd, name: name, email: email};
            if (await process_submit('/api/member/join', data) > 0) {
                location.href = '/member/login';
            } else {
                alert('!!!');
            }
        }
    };
    return (
        <div className="jogin">
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <h3>회원가입</h3>
            <form>
                <div><label htmlFor="uid">아이디</label>
                    <input type="text" name="uid" id="uid" onChange={e => handleInput(setUserid, e)} /></div>
                <div><label htmlFor="pwd">비밀번호</label>
                    <input type="password" name="pwd" id="pwd" onChange={e => handleInput(setPasswd, e)} /></div>
                <div><label htmlFor="repwd">비밀번호 확인</label>
                    <input type="password" name="repwd" id="repwd" onChange={e => handleInput(setRepwd, e)} /></div>
                <div><label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" onChange={e => handleInput(setName, e)} /></div>
                <div><label htmlFor="email">이메일</label>
                    <input type="text" name="email" id="email" onChange={e => handleInput(setEmail, e)} /></div>

                <div><label></label>
                    <div className="g-recaptcha cap" data-sitekey='6LdU4OskAAAAAGphv-UlASNVhJs3LGCNl6cfbJJr'></div>
                </div>

                <div><label></label>
                    <button type="button" onClick={handlejoin}>입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </div>
    )
}