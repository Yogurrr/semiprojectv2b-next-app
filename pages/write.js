const Write = () => {
    return (
        <div className="write">
            <h3>새글쓰기</h3>
            <form name="write" className="writefrm">
                <div><label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" /></div>

                <div><label htmlFor="uid">작성자</label>
                    <input type="text" name="uid" id="uid" value="yogurrr" readOnly /></div>

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

export default Write;