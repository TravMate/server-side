import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || ".sZz=x9OfY`2o4X";

interface UserPayload {
  _id: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    userData?: UserPayload;
  }
}

function verifyTokens(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.userData = decoded;
    next();
  } catch (error) {
    next(error);
     return;
  }
}

// المستخدم العادي: يمكنه فقط تعديل أو الوصول إلى معلوماته الشخصية.
function verifyTokensAndAuthorization(req: Request, res: Response, next: NextFunction) {
  verifyTokens(req, res, () => {
    if (req.userData?._id === req.params.id || req.userData?.role==="admin") {
      return next();
    } else {
      return res.status(403).json({
        message: "You are not allowed to update this user, you can only update your account",
      });
    }
  });
}

// المشرف (Admin): يمكنه الوصول إلى معلومات جميع المستخدمين وتعديلها.
function verifyTokensAndAdmin(req: Request, res: Response, next: NextFunction) {
  verifyTokens(req, res, () => {
    if (req.userData?.role==="admin") {
      return next();
    } else {
      console.log(req.userData);
      return res.status(403).json({ message: "You are not allowed, only admin is allowed" });
    }
  });
}

export { verifyTokens, verifyTokensAndAuthorization, verifyTokensAndAdmin };
