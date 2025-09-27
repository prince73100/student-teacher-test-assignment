import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    level:{
        type:String
    }
  },
  { timestamps: true }
);
const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
