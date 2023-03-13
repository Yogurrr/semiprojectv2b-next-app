import Board from "../../board";

export default async (req, res) => {
    const {bno} = req.query;

    try {
        const cnt = new Board().delete(bno).then(result => result);

        // res.status(200).json({'cnt': await cnt});
        res.redirect(301, '/board/list2');
    } catch (err) {
        res.status(500).json(err);
    }
}