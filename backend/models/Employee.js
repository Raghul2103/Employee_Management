import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
      enum: {
        values: ['IT', 'HR', 'Sales', 'Marketing', 'Finance'],
        message: '{VALUE} is not a valid department',
      },
    },
    designation: {
      type: String,
      required: [true, 'Please add a designation'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: {
        values: ['Active', 'Inactive'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Active',
    },
    joiningDate: {
      type: Date,
      required: [true, 'Please add a joining date'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Employee', employeeSchema);
