# List of All Middlewares

## Authentication Middleware

- export const verifyToken = async (req, res, next) => {}
- export const verifyTokenAndAuthorization = async (req, res, next) => {}
- export const verifyTokenAndAdmin = async (req, res, next) => {}

## Multer Middleware

- export const upload = multer({ storage: storage });

## Rate Limiter Middleware

- export const rateLimiter = rateLimit({
  windowMs: 15 _ 60 _ 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  });
