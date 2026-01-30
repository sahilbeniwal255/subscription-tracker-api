import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user : req.user._id
        })
        res.status(201).json(subscription);
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id != req.params.id) {
            const error  = new Error('Unauthorized access');
            error.status = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error)
    }
}

export const getSubscriptions = async (req, res) => { 
    try { 
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
};
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error: error.message });
  }
};

export const getUpcomingRenewals = async (req, res) => {
  try {
    const today = new Date();
    const upcoming = await Subscription.find({ renewalDate: { $gte: today }, user : req.user._id, status: 'active' });
    res.status(200).json(upcoming);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming renewals', error: error.message });
  }
};
