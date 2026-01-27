import aj from "../config/arcjet.js";

const arcjet = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested : 1});
        if(decision.isDenied) {
            if(decision.reason.isRateLimit) return res.send(429, 'Too Many Requests - Rate limit exceeded');
            if(decision.reason.isBot) return res.send(403, 'Forbidden - Bot access denied');
            if(decision.reason.isShield) return res.send(403, 'Forbidden - Malicious activity detected');
            res.send(403, 'Forbidden - Access denied');
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default arcjet;