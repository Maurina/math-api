
exports.mainDashboardInfo = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    res.status(201).json({
        message:"Welcome to the main dashboard",
        post: {id: new Date().toLocaleDateString(), email: email, password: password}
    })
}