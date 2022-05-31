export default function initLessonController(db) {
  const getLessons = async (req, res) => {
    try {
      const { id, accountType } = req.user;

      const accountIdObj = accountType === 'teacher' ? { teacherId: id } : { parentId: id };

      const lessons = await db.Lesson.findAll({
        attributes: ['id', 'lessonDate'],
        order: [['lessonDate', 'DESC']],
        include: {
          model: db.Contract,
          where: accountIdObj,
          attributes: ['studentName', 'updatedAt'],
        },
      });

      const lessonsArr = await Promise.all(
        lessons.map(async (lesson) => ({
          id: lesson.id,
          contractId: lesson.contract.id,
          studentName: lesson.contract.studentName,
          lessonDate: lesson.lessonDate,
          commentCount: await db.Comment.count({
            where: { lessonId: lesson.id },
          }),
          recentCommentDate: await db.Comment.findOne({
            attributes: ['createdAt'],
            where: { lessonId: lesson.id },
            order: [['createdAt', 'DESC']],
          }),
        })),
      );

      res.send(lessonsArr);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getLessonDetails = async (req, res) => {
    try {
      const { id } = req.params;

      const lesson = await db.Lesson.findByPk(id, {
        attributes: ['id', 'details', 'lessonDate', 'createdAt', 'updatedAt', 'contractId'],
        include: {
          model: db.Contract,
          attributes: ['studentName'],
        },
      });

      res.send(lesson);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const postLesson = async (req, res) => {
    try {
      const {
        studentId, details, date,
      } = req.body;
      await db.Lesson.create({
        contractId: studentId,
        details,
        lessonDate: date,
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const deleteLesson = async (req, res) => {
    try {
      const { id } = req.params;
      const lesson = await db.Lesson.findOne({ where: { id } });
      // TODO: error dealing
      lesson.destroy();
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const updateLesson = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        studentId, details, date,
      } = req.body;
      const lesson = await db.Lesson.findOne({ where: { id } });
      // TODO: error dealing
      lesson.update({
        contractId: studentId,
        details,
        lessonDate: date,
        updatedAt: new Date(),
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getLessons, getLessonDetails, postLesson, deleteLesson, updateLesson,
  };
}
