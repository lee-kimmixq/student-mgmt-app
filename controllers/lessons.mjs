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

  return {
    getLessons,
  };
}
