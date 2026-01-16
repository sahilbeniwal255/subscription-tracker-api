import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send('Get Subscriptions');
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send('Get Subscriptions by ID: ' + req.params.id);
});

subscriptionRouter.post('/', (req, res) => {
    res.send('create Subscriptions');
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send('Update Subscriptions by ID: ' + req.params.id);
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send('Delete Subscriptions by ID: ' + req.params.id);
});

subscriptionRouter.get('/users/:id', (req, res) => {
    res.send('Get all Subscriptions for User ID: ' + req.params.id);
});

subscriptionRouter.put('/cancel/:id', (req, res) => {
    res.send('Cancel Subscription by ID: ' + req.params.id);
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send('Get Subscriptions');
});

export default subscriptionRouter;