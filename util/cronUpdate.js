const Purchase = require("../models/purchase");

const ubdateSuscriptcion = async () => {
  const today = new Date();
  const purchase = await Purchase.find({ available: true });
  purchase.forEach(async (e) => {
    const date = new Date(`"${e.createdAt}"`);
    const rest = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    if (rest >= 30) {
      await Purchase.updateOne({ _id: e._id }, { $set: { available: false } });
    }
  });
  console.log(`CronJob realizado dia y horario : ${today.toLocaleString()}`);
};

module.exports = { ubdateSuscriptcion };
