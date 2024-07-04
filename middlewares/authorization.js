import Admin from "../models/admin-schema.js";
export const authorizeAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne(req);

        if (!admin) {
            return res.status(403).json({
                status: 'fail',
                message: 'Access denied, Admins only!'
            });
        }

        next();
    } catch (error) {
        console.log("There was an error during authorization", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error during authorization',
            error: error.message
        });
    }
};
export default authorizeAdmin;