const mariadb = require('../models/mariadb');

let membersql = {
    insertsql : ' insert into MEMBER (userid, passwd, name, email) ' +
        ' values (?, ?, ?, ?) ',
    loginsql : ' select count(userid) cnt, name, email from MEMBER ' +
        ' where userid = ? and passwd = ? ',
    selectOne: ` select mno, userid, name, email, date_format(regdate, '%y-%m-%d %HH:%i:%s') regdate ` +
        ' from MEMBER where userid = ? '
}

class Member {

    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }

    // 회원정보 저장
    async insert() {
        let conn = null;
        let params = [this.userid, this.passwd, this.name, this.email];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.insertsql, params);
            await conn.commit();
            if (result.affectedRows > 0) result = result.affectedRows;
        } catch (ex) {
            console.log(ex);
        } finally {
            await mariadb.closeConn(conn);
        }
        return result;
    }

    async login(uid, pwd) {  // 로그인 처리
        let conn = null;
        let params = [uid, pwd];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.loginsql, params);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

    async selectOne(uid) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [uid];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.selectOne, params);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

};

module.exports = Member;