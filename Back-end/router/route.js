const router = require ('express').Router();
const appointment = require('../model/appointment');

// read all Appointment
router.get("/", async (req, res) => {
  try {
    const readData = await appointment.find();
    res.send(readData);
  } catch (error) {
    res.json({ message: error });
  }
});

    // New Appointment
  router.post('/',async(req,res)=>{

    const existDate = await appointment.findOne({ appointDate: req.body.appointDate });

  const appoint = new appointment({
    appointDate : req.body.appointDate,
    name : req.body.name,
    email : req.body.email
  });

  try {
    if (existDate) {
      return res.json({success : false, message : "No appointment avaliable on that date"})
    }
    await appoint.save();
    res.json({success : true , message : `Save Successful appointment`});
  } catch (error) {
    res.json({success : false , message : "Couldn't save appointment!",error})
  }

})

            // delete Appointment
router.delete("/:deleteId", async (req, res) => {
  try {
    const deletedata = await appointment.findByIdAndRemove(req.params.deleteId);
    res.send(deletedata);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
