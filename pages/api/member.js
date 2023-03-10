import oracledb from "oracledb";

try {
    oracledb.initOracleClient({libDir: 'c:/Java/instantclient_19_17'})
} catch (e) {
    //
} finally {
    //
}

const dbconfig = {
    connectString: process.env.ORACLE_HOST,
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PWD,
};

export default async (req, res) => {
    let conn;
    const sql = `select mno, userid, name, email, date_format(regdate, '%y-%m-%d') from board2 order by mno desc`;
    try {
        conn = await oracledb.getConnection(dbconfig);

        const rowData = await conn.query(sql);
        res.status(200).json(rowData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } finally {
        if (conn) await conn.close();
    }
}