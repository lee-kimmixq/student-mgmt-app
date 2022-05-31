export default function initContractController(db) {
  const getStudents = async (req, res) => {
    try {
      const { id } = req.user;
      const contracts = await db.Contract.findAll({
        where: { teacherId: id },
        include: { as: 'parent', model: db.User },
      });
      const students = contracts.map((el) => ({
        id: el.id,
        parentName: el.parent.displayName,
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
      const { id } = req.user;
      const parents = await db.Contract.findAll({
        where: { teacherId: id, status: 'accepted' },
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
      const { status, studentName } = req.body;
      const contract = await db.Contract.findByPk(id);
      // TODO: error dealing
      if (status) {
        contract.update({
          status,
          updatedAt: new Date(),
        });
      }
      if (studentName) {
        contract.update({
          studentName,
          updatedAt: new Date(),
        });
      }
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const postRequest = async (req, res) => {
    try {
      const { teacherId } = req.body;
      const { id } = req.user;
      const existingContract = await db.Contract.findOne({
        where: {
          teacherId,
          parentId: id,
        },
      });
      if (existingContract) {
        res.send({ success: false, reason: 'You have already added this teacher' });
        return;
      }
      await db.Contract.create({
        teacherId,
        parentId: id,
      });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getTeachers = async (req, res) => {
    try {
      const { id } = req.user;
      const contracts = await db.Contract.findAll({
        where: { parentId: id },
        include: { as: 'teacher', model: db.User },
      });
      const teachers = contracts.map((el) => ({
        id: el.id,
        teacherName: el.teacher.displayName,
      }));
      res.send(teachers);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getStudents, getActiveStudents, changeStudentStatus, postRequest, getTeachers,
  };
}
