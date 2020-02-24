exports.getStudentInfo = (req, res, next) => {
    res.status(200).json({
      posts: [{ name: 'Max',  unit: '1' }]
    });
  };

