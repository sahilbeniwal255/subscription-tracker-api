import {mongoose} from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Subscription name is required"],
        trim : true,
        minLength : [2, "Subscription name must be at least 2 characters long"],
    },
    price : {
        type : Number,
        required: [true, "Price is required"],
        min : [0, "Price cannot be negative"]
    },
    currency : {
        type : String,
        required: [true, "Currency is required"],
        trim : true,
        enum : ['USD', 'EUR', 'GBP', 'INR', 'JPY'] //example currencies
    },
    frequency : {
        type : String,
        enum : ['monthly', 'yearly', 'weekly', 'daily'],
    },
    category : {
        type : String,
        required: [true, "Category is required"],
        enum : ['entertainment', 'productivity', 'education', 'health', 'other'],
    },
    paymentMethod : {
        type : String,
        required: [true, "Payment method is required"],
        trim : true,
    },
    status : {
        type : String,
        enum : ['active', 'canceled', 'expired'],
    },
    startDate : {
        type : Date,
        required: [true, "Start date is required"],
        validate : {
            validator : (value) => value <= new Date(), //start date cannot be in future
            message : "Start date cannot be in the future"
        }
    },
    nextRenewalDate : {
        type : Date,
        validate : {
            validator : function(value) {
                return !value || value >= this.startDate; //arrow function doesnot have this context
            },
            message : "Next renewal date cannot be before start date"
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: [true, "User reference is required"]
    }
}, { timestamps : true } //to keep track of createdAt and updatedAt
);

SubscriptionSchema.pre('save', function(next) {
    //additional logic before saving a subscription can be added here
    if(!this.renewalDate) {
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,
            'yearly': 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;