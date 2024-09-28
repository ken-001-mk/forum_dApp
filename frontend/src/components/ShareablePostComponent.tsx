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
import type { PostDetails } from "../types/posts/types";
import styles from "../styles/Custom.module.css";
import CommonVoteStubs from "./CommonVoteStubs";

const ShareablePostComponent = ({ post }: { post: PostDetails }) => {
	return (
    	<article key={post.id} className={styles.card}>
        	<Link
            	href={{
                	pathname: "/posts/[id]",
                	query: { id: post.id.toString() },
            	}}
        	>
            	<h2>{post.title}</h2>
        	</Link>
        	<h3>
            	from <span className={styles.address}>{post.owner}</span>
        	</h3>
        	<div className={styles.description}>
            	<p>{post.description}</p>
        	</div>
        	<CommonVoteStubs
            	key={post.id}
            	id={post.id}
            	likes={post.likes}
            	upVoteFn={"upVotePost"}
            	downVoteFn={"downVotePost"}
            	getFn={"getPost"}
        	/>
    	</article>
	);
};

export default ShareablePostComponent;