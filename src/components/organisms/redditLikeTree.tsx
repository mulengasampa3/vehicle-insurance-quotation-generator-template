import React, { useState } from 'react';

// --- Data Structure ---
interface CommentData {
    id: string;
    author: string;
    text: string;
    upvotes: number;
    downvotes: number;
    replies?: CommentData[]; // Optional for comments without replies
}

const commentsData: CommentData[] = [
    {
        id: '1',
        author: 'sawariz0r',
        text: 'Yaaay! Vista is back!',
        upvotes: 154,
        downvotes: 14,
        replies: [
            {
                id: '1a',
                author: 'Perrin-Golden-Eyes',
                text: 'But Vista done "like only Apple can."',
                upvotes: 27,
                downvotes: 0,
                replies: []
            },
            {
                id: '1b',
                author: 'JohnCasey3306',
                text: 'Feeling nostalgic for a time long past, when Apple actually were at the forefront of innovative design.',
                upvotes: 9,
                downvotes: 0,
                replies: [
                    {
                        id: '1b',
                        author: 'JohnCasey3306',
                        text: 'Feeling nostalgic for a time long past, when Apple actually were at the forefront of innovative design.',
                        upvotes: 9,
                        downvotes: 0,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        author: 'LanguageLoose157',
        text: 'Feels KDE Plasma',
        upvotes: 13,
        downvotes: 0,
        replies: []
    }
];

// --- Comment Component ---
interface CommentProps {
    comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(true);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="mb-4 bg-gray-800 p-3 rounded-md relative"> {/* Comment container */}
            <div className="flex items-center mb-1"> {/* Comment header */}
                <span className="font-bold text-gray-200 mr-2 text-sm">{comment.author}</span>
                <span className="text-gray-500 text-xs">5d ago</span> {/* Static for now */}
            </div>
            <div className="text-gray-100 text-sm mb-2"> {/* Comment content */}
                <p>{comment.text}</p>
            </div>
            <div className="flex items-center space-x-2 text-xs"> {/* Comment actions */}
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <span className="mr-1">↑</span> {comment.upvotes}
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <span className="mr-1">↓</span> {comment.downvotes}
                </button>
                <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Reply</button>
                {comment.replies && comment.replies.length > 0 && (
                    <button
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        onClick={toggleReplies}
                    >
                        {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
                    </button>
                )}
            </div>

            {showReplies && comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-4 pl-4 border-l-2 border-gray-700"> {/* Indentation for replies */}
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} /> // Recursive rendering
                    ))}
                </div>
            )}
        </div>
    );
};

// --- CommentTree Component ---
interface CommentTreeProps {
    comments: CommentData[];
}

const CommentTree: React.FC<CommentTreeProps> = ({ comments }) => {
    return (
        <div className="max-w-3xl mx-auto p-5 bg-gray-900 rounded-lg shadow-lg"> {/* Overall wrapper */}
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

// --- Main App Component ---
const CommentTreeApp: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-5"> {/* Global background */}
            <h1 className="text-3xl font-bold text-center mb-8">Reddit-like Comments</h1>
            <CommentTree comments={commentsData} />
        </div>
    );
};

export default CommentTreeApp;