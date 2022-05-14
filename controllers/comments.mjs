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

  return {
    getComments,
  };
}
