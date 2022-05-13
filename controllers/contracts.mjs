export default function initContractController(db) {
  const getStudents = async (req, res) => {
    try {
      const { userId } = req.cookies;
      const parents = await db.Contract.findAll({
        where: { teacherId: userId },
        include: { as: 'parent', model: db.User },
      });
      const students = parents.map((el) => ({
        id: el.id,
        studentName: el.studentName,
        lessonRate: el.lessonRate,
        status: el.status,
      }));
      res.send(students);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getActiveStudents = async (req, res) => {
    try {
      const { userId } = req.cookies;
      const parents = await db.Contract.findAll({
        where: { teacherId: userId, status: 'accepted' },
        include: { as: 'parent', model: db.User },
      });
      const students = parents.map((el) => ({
        id: el.id,
        studentName: el.studentName,
      }));
      res.send(students);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getStudents, getActiveStudents,
  };
}
