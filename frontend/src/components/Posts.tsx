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

import type { Address } from "viem";
import type { PostDetails } from "../types/posts/types";
import ShareablePostComponent from "./ShareablePostComponent";

const Posts = ({
	posts,
	account,
}: { posts: PostDetails[]; account: Address | undefined }) => {
	if (account === undefined)
    	return (
        	<>
            	<h3>Account is disconnected. Please connect to load posts</h3>
        	</>
    	);
	return (
    	<>
        	{posts.map((post) => (
            	<ShareablePostComponent post={post} key={post.id} />
        	))}
    	</>
	);
};

export default Posts;