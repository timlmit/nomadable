const jwt = require("jsonwebtoken");
import nextConnect from "next-connect";
const { env } = process;

const openUrls = [
  "/api/signup-with-email",
  "/api/verify-user",
  "/api/login-user",
  "/api/place-with-data",
];

const withoutAuth = (url: string): boolean => {
  const _url = url.split("?")[0];
  return openUrls.includes(_url);
};

async function authentication(req: any, res: any, next: any) {
  const token = req.body.token || req.query.token || req.headers.authorization;

  try {
    if (token && token !== "null") {
      await jwt.verify(token, env.JWT_SECRET);
      const payload = jwt.decode(token);

      req.userId = payload.userId;
      req.admin = payload.admin;
      return next();
    }

    if (withoutAuth(req.url)) {
      return next();
    }

    throw Error;
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }
}

const middleware = nextConnect();

middleware.use(authentication);

export default middleware;
