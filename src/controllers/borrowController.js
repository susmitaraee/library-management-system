import borrowService from "../services/borrowService.js";

const processBorrowing = async (req, res) => {
  try {
    const { bookNumber, studentID, borrowDate, dueDate } = req.body;

    if (!bookNumber || !studentID || !borrowDate || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const borrowing = await borrowService.createBorrow({
      bookNumber,
      studentID,
      borrowDate,
      dueDate,
    });

    return res.status(201).json({
      message: "Book borrowed successfully",
      borrowing,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBorrowStatistics = async (req, res) => {
  try {
    const stats = await borrowService.fetchBorrowStatistics();

    return res.status(200).json({
      message: "Borrow statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Display all
const getAllBorrowings = async (req, res) => {
  try {
    const { studentId, bookId, status } = req.query;
    let filters = {};
    if (studentId) filters.studentId = studentId;
    if (bookId) filters.bookId = bookId;
    if (status) filters.status = status;

    const borrowings = await borrowService.getAllBorrowings(filters);
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
const getBorrowingById = async (req, res) => {
  try {
    const borrowing = await borrowService.getBorrowingById(req.params.id);
    if (!borrowing) return res.status(404).json({ message: "Not found" });
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateBorrowing = async (req, res) => {
  try {
    const borrowing = await borrowService.updateBorrowing(
      req.params.id,
      req.body
    );
    if (!borrowing) return res.status(404).json({ message: "Not found" });
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
const deleteBorrowing = async (req, res) => {
  try {
    const borrowing = await borrowService.deleteBorrowing(req.params.id);
    if (!borrowing) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Borrowing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  processBorrowing,
  getBorrowStatistics,
  getAllBorrowings,
  getBorrowingById,
  updateBorrowing,
  deleteBorrowing,
};
