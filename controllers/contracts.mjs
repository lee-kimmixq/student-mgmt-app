export default function initContractController(db) {
  const getStudents = async (req, res) => {
    try {
      const { userId } = req.cookies;
      const contracts = await db.Contract.findAll({
        where: { teacherId: userId },
        include: { as: 'parent', model: db.User },
      });
      const students = contracts.map((el) => ({
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

  const changeStudentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const contract = await db.Contract.findByPk(id);
      // TODO: error dealing
      contract.update({
        status,
        updatedAt: new Date(),
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const postRequest = async (req, res) => {
    try {
      const { teacherId } = req.body;
      const { userId } = req.cookies;
      const existingContract = await db.Contract.findOne({
        where: {
          teacherId,
          parentId: userId,
        },
      });
      if (existingContract) {
        res.send({ success: false, reason: 'You have already added this teacher' });
        return;
      }
      await db.Contract.create({
        teacherId,
        parentId: userId,
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getStudents, getActiveStudents, changeStudentStatus, postRequest,
  };
}
