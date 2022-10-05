import mongoose from 'mongoose';
import { refresh_token_expiry } from '../../utils/config';

const Schema = mongoose.Schema;

const user_tokens_schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        password_reset_token: { type: String, default: null },
        verification_token: {
            type: String,
            default: `${Math.floor(100000 + Math.random() * 900000)}`
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamp: true }
);

const blacklisted_access_tokens_schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        access_tokens: [{ type: String }]
    },
    {
        createdAt: {
            type: Date,
            expires: refresh_token_expiry || '5d',
            default: Date.now
        }
    }
);

export const UserToken = mongoose.model('UserToken', user_tokens_schema),
    BlacklistedTokens = mongoose.model('BlacklistedAccessTokens', blacklisted_access_tokens_schema)

