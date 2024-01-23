const express = require('express');
const Appointment = require('../models/productModels');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Create a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const appointmentData = req.body;
    const appointment = new Appointment(appointmentData);

    await appointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an appointment by ID
router.put('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, specialization, experience, location, date, slots, fee } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { name, image, specialization, experience, location, date, slots, fee },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an appointment by ID
router.delete('/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully', appointment: deletedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
