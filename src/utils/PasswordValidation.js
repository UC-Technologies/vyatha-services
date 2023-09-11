const passwordValidator = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const lowerCase = /[a-z]/.test(password),
        upperCase = /[A-Z]/.test(password),
        numbers = /\d/.test(password),
        specialChar = /[`!@#$%^&*()_+=|:;<>,./?"'{}]/.test(password);
    if (/\s/.test(password)||/\s/.test(confirmPassword)) res.status(400).json({ error: 'No space allowed in password' });
    else if(password !== confirmPassword) res.status(400).json({ error: "Password must be same" });
    else if(password.length < 8) res.status(400).json({ error: 'Password must be atleast 8 characters' });
    else if(!(lowerCase && upperCase && numbers && specialChar))
        res.status(400).json({ error: 'Password must contain one uppercase, lowercas, digit and special character' });
    else next();
}

module.exports = passwordValidator