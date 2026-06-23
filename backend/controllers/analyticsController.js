import Employee from '../models/Employee.js';

// @desc    Get dashboard metrics & chart data
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res, next) => {
  try {
    // 1. Calculate General Card Stats
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });

    // Distinct departments count currently active in the database (or count of all existing departments in schema)
    const departmentsList = await Employee.distinct('department');
    const departmentsCount = departmentsList.length;

    // 2. Department-wise count (for Bar Chart)
    const departmentWise = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          department: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Ensure all 5 defined departments are returned even if they have 0 employees, for a clean UI
    const defaultDepartments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance'];
    const departmentChartData = defaultDepartments.map((dept) => {
      const found = departmentWise.find((d) => d.department === dept);
      return {
        department: dept,
        count: found ? found.count : 0,
      };
    });

    // 3. Status Distribution (for Pie Chart)
    const statusWise = await Employee.aggregate([
      {
        $group: {
          _id: '$status',
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          value: 1,
          _id: 0,
        },
      },
    ]);

    const defaultStatuses = ['Active', 'Inactive'];
    const statusChartData = defaultStatuses.map((status) => {
      const found = statusWise.find((s) => s.name === status);
      return {
        name: status,
        value: found ? found.value : 0,
      };
    });

    // 4. Monthly Joining Trend (for Line Chart)
    // Group by year and month
    const monthlyTrend = await Employee.aggregate([
      {
        $project: {
          yearMonth: { $dateToString: { format: '%Y-%m', date: '$joiningDate' } },
          monthName: {
            $let: {
              vars: {
                monthsInString: [
                  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ]
              },
              in: {
                $arrayElemAt: [
                  '$$monthsInString',
                  { $toInt: { $dateToString: { format: '%m', date: '$joiningDate' } } }
                ]
              }
            }
          },
          year: { $dateToString: { format: '%Y', date: '$joiningDate' } }
        }
      },
      {
        $group: {
          _id: { yearMonth: '$yearMonth', name: '$monthName', year: '$year' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.yearMonth': 1 }
      },
      {
        $project: {
          month: { $concat: ['$_id.name', ' ', '$_id.year'] },
          Employees: '$count',
          _id: 0
        }
      }
    ]);

    res.json({
      stats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentsCount,
      },
      charts: {
        departmentData: departmentChartData,
        statusData: statusChartData,
        joiningTrend: monthlyTrend,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAnalytics,
};
