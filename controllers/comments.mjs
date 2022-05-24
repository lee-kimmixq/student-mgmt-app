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
      const lessonId = req.params.id;
      const userId = req.user.id;
      const { content } = req.body;
      await db.Comment.create({
        userId,
        lessonId,
        content,
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const deleteComments = async (req, res) => {
    try {
      const { id } = req.params;
      await db.Comment.destroy({ where: { lessonId: id } });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getCommentData = async (req, res) => {
    try {
      const { id } = req.params;
      const commentCount = await db.Comment.count({
        where: { lessonId: id },
      });
      const recentComment = await db.Comment.findOne({
        attributes: ['createdAt'],
        where: { lessonId: id },
        order: [['createdAt', 'DESC']],
      });
      res.send({ commentCount, recentCommentDate: recentComment ? recentComment.createdAt : null });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getComments, postComment, deleteComments, getCommentData,
  };
}
