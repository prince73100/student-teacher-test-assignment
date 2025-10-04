import Assignment from "../model/teacher.model.js";


// POST /api/assignments
export const createAssignment = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { title, description, dueDate, subject,level } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      subject,
      level,
      teacher: teacherId,
    });

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('teacher', 'name email');
    res.status(200).json({assignments});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
