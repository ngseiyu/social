import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // header token value is "Bearer xxxxx"
        const token = req.headers.authorization.split(" ")[1];
        
        // check is own token or google sign in token
        // google token > 500
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "test");

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;