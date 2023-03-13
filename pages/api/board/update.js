import Board from "/models/Board";
import board from "../../board";

export default async (req, res) => {
    const {bno, title, contents} = req.body;

    try {
        // new Board(null, title, userid, null, contents, null).insert()
        const cnt = Board.modifyOne(bno, title, contents).update().then(result => result);

        res.status(200).json({cnt: await cnt});
    } catch (err) {
        res.status(500).json(err);
    }
}