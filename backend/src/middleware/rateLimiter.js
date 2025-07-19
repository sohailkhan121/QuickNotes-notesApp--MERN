import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {    
    try {
        const {success } = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({messasge:"Too Many requests, Please try again later"});
        }
        next();
    } catch (error) {
        console.log("Rate limit error!!,error",error);
        next(error);
    }
};

export default rateLimiter;