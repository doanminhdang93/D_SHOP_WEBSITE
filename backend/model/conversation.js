const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
    {
        groupTitles:{
            type: String,
        },
        members:{
            type: Array,
        },
        lastMessage: {
            type: String,
        },
        lastMessageId:{
            type: String,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model('Conversation', conversationSchema);