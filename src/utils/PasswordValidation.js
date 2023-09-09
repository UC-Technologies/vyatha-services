const passwordValidator = (req, res, next) => {
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if (!(/\s/.test(password)||/\s/.test(confirmPassword))) {
        if(password !== confirmPassword) res.status(403).json({ error: "Password must be same" });
        else {
            if(password.length < 8) res.status(403).json({ error: 'Password must be atleast 8 characters' });
            else {
                const lowerCase = /[a-z]/.test(password),
                    upperCase = /[A-Z]/.test(password),
                    numbers = /\d/.test(password),
                    specialChar = /[`!@#$%^&*()_+=|:;<>,./?"'{}]/.test(password);
                if(!(lowerCase && upperCase && numbers && specialChar))
                    res.status(403).json({ error: 'Password must contain one uppercase, lowercas, digit and special character' });
                else next();
            }
        }
    } else {
        res.status(403).json({ error: 'No space allowed in password' });
    }
}

module.exports = passwordValidator