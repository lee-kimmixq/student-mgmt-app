import jwt from 'jsonwebtoken';

const generateToken = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1 day' });

export default generateToken;
