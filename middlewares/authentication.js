import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401).json({
        status:'fail',
        message: 'Unauthorized'
      }); 
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;