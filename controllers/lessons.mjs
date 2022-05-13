export default function initLessonController(db) {
  const getLessons = async (req, res) => {
    try {
      const { userId } = req.cookies;
      const lessons = await db.Lesson.findAll({
        include: {
          as: 'contract',
          model: db.Contract,
          where: { teacherId: userId },
        },
      });
      const lessonsArr = lessons.map((el) => ({
        id: el.id,
        studentName: el.contract.studentName,
        details: el.details,
        lessonDate: el.lessonDate,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
      }));
      res.send(lessonsArr);
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

  return {
    getLessons, postLesson, deleteLesson,
  };
}
