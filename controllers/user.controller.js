import User from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find();
        res.status(200).json({"success" : true, "data" : users});
        
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {

        const users = await User.findById(req.params.id).select('-password'); //means we selected all fields except password '-' minus sign
        if(!users){
            return res.status(404).json({"success" : false, "message" : "User not found"});
        }
        res.status(200).json({"success" : true, "data" : users});
        
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(req.user.id != req.params.id) {
            const error  = new Error('Unauthorized access');
            error.status = 403;
            throw error;
        }
        if(!user){
            return res.status(404).json({"success" : false, "message" : "User not found"});
        }
        res.status(200).json({"success" : true, "message" : "User deleted successfully"});
    } catch (error) {
        next(error)
    }
}
