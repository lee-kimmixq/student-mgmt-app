export default function initInvoiceController(db) {
  const getInvoices = async (req, res) => {
    try {
      const { id, accountType } = req.user;
      const parameters = {
        teacher: {
          include: {
            as: 'contract',
            model: db.Contract,
            where: { teacherId: id },
            include: {
              as: 'parent',
              model: db.User,
            },
          },
        },
        parent: {
          include: {
            as: 'contract',
            model: db.Contract,
            where: { parentId: id },
            include: {
              as: 'teacher',
              model: db.User,
            },
          },
        },
      };
      const invoices = await db.Invoice.findAll(parameters[accountType]);
      res.send(invoices);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getInvoices,
  };
}
