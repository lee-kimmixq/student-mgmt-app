export default function initCommentController(db) {
  const getComments = async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await db.Comment.findAll({
        where: { lessonId: id },
        include: {
          as: 'user',
          model: db.User,
        },
      });
      const commentsList = comments.map((el) => ({
        id: el.id,
        displayName: el.user.displayName,
        content: el.content,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
      }));
      res.send(commentsList);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const postComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.cookies;
      const { content } = req.body;
      await db.Comment.create({
        userId,
        lessonId: id,
        content,
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getComments, postComment,
  };
}
