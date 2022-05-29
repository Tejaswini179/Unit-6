import React, { useState } from "react";
import "./Comments.css"
const Comment = ({ data }) => {
    const [spread, setspread] = useState(false);

    if (data.replies) {
        return (
            <div>
                <div className="MainCommentDiv">
                    <div className="btnDiv">
                        <button
                            className="btn"
                            onClick={() => setspread(!spread)}
                        >
                            +
                        </button>
                    </div>
                    <div className="upperDiv">
                        <div>
                            <div className="timeDiv">
                                <p>{data.author}</p>
                                <p>{data.points} points</p>
                                <p>
                                    {Math.floor(Math.random() * 59)} minutes ago
                                </p>
                            </div>
                        </div>
                        <div className="comment">
                            <p>{data.body}</p>
                        </div>
                        <div className="replyDiv">
                            <p>Reply</p>
                            <p>Give Award</p>
                            <p>Share</p>
                            <p>Report</p>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: spread ? "block" : "none",
                        paddingLeft: "90px",
                        borderLeft: "3.5px solid black",
                        marginLeft: "8px",
                    }}
                >
                    {data.replies.map((e) => {
                        return <Comment key={e.id} data={e} />;
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="MainCommentDiv endMainCommentDiv">
                <div className="btnDiv hideBtn">
                    <button className="btn" onClick={() => setspread(!spread)}>
                        +
                    </button>
                </div>
                <div className="upperDiv">
                    <div>
                        <div className="timeDiv">
                            <p>{data.author}</p>
                            <p>{data.points} points</p>
                            <p>{Math.floor(Math.random() * 59)} minutes ago</p>
                        </div>
                    </div>
                    <div className="comment">
                        <p>{data.body}</p>
                    </div>
                    <div className="replyDiv">
                        <p>Reply</p>
                        <p>Give Award</p>
                        <p>Share</p>
                        <p>Report</p>
                        <p>Save</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Comment;