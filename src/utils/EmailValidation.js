const emailValidator = (req, res, next) => {
    const email = req.body.emailID
    if(!(/^[a-zA-Z0-9._-]+@[a-z]+\.nits\.ac\.in$/.test(email))) {
        res.status(400).json({ error: "Not a valid email id" });
    } else next();
}

module.exports = emailValidator