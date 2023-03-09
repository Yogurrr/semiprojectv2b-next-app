import React from "react";

const Login = () => {
    return (
        <div className="jogin">
            <h3>로그인</h3>
            <form>
                <div><label htmlFor="uid">아이디</label>
                    <input type="text" name="uid" id="uid" /></div>
                <div><label htmlFor="pwd">비밀번호</label>
                    <input type="password" name="pwd" id="pwd" /></div>
                <div><label></label>
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    )
}

export default Login;