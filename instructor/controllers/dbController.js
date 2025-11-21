import sequelize from "sequelize";

let db = null;
let CourseDB = null;

const getDb = () => {
  if (!db) {
    db = new sequelize(process.env.POSTGRES_URL);
    
    db.options.logging = (message) => {
      if (message.startsWith("Executing")) {
      } else {
        console.log(message);
      }
    };

    CourseDB = db.define("course", {
      id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: sequelize.STRING,
    });
  }
  return { db, CourseDB };
};

const deleteCourse = async (courseData) => {
  try {
    const { db: dbInstance, CourseDB: CourseModel } = getDb();
    
    await dbInstance.sync();
    
    const result = await CourseModel.findByPk(courseData.id);
    if (result) {
      await CourseModel.destroy({
        where: {
          id: courseData.id,
        },
      });
      return { success: true, message: "Course deleted successfully" };
    } else {
      return { success: false, message: "Course not found" };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export default { deleteCourse };

