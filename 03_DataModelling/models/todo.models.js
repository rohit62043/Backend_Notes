import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: string,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubTodo',
            },
        ], //Array of sub-todos
    },
    { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);