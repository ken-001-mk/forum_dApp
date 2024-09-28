// Copyright 2024 mwask
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Link from "next/link";
import styles from "../styles/Custom.module.css";
import CommonVoteStubs from "./CommonVoteStubs";
import type { CommentDetails, PostDetails } from "../types/posts/types";

const ShareableCommentComponent = ({
	comment,
	post,
}: { comment: CommentDetails; post: PostDetails }) => {
	return (
    	<article key={comment.id} className={styles.cardPlain}>
        	<h2>
            	{comment.title} on{" "}
            	<Link href={`/posts/${encodeURIComponent(post.id.toString())}`}>
                	{post.title}
            	</Link>
        	</h2>
        	<h3>
            	from <span className={styles.address}>{comment.owner}</span>
        	</h3>
        	<p>{comment.description}</p>
        	<CommonVoteStubs
            	key={comment.id}
            	id={comment.id}
            	likes={comment.likes}
            	upVoteFn={"upVoteComment"}
            	downVoteFn={"downVoteComment"}
            	getFn={"getComment"}
        	/>
    	</article>
	);
};

export default ShareableCommentComponent;