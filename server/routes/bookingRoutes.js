const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  updateBookingStatus, 
  cancelBooking,
  updateBooking,
  updatePaymentStatus,
  deleteBooking
} = require('../controllers/bookingController');

// Public booking route and protected admin route
router.route('/')
  .post(createBooking)
  .get(protect, admin, getAllBookings);

router.put('/:id/status', protect, admin, updateBookingStatus);
router.put('/:id/cancel', protect, admin, cancelBooking);
router.put('/:id/payment', protect, admin, updatePaymentStatus);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, admin, deleteBooking);

module.exports = router;