module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      lastName: String,
      birthdate: Date,
      career: String,
      averageScore: Number,
      idCard: String,
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Student = mongoose.model("student", schema);
  return Student;
};
