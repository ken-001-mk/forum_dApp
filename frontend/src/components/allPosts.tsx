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

import { readContract } from "@wagmi/core";
import config from "../wagmi";
import { ABI, deployedAddress } from "../contracts/deployed-contract";
import type { PostDetails } from "../types/posts/types";

const allPosts = async () => {
	const postIdIncrement = (await readContract(config, {
    	abi: ABI,
    	address: deployedAddress,
    	functionName: "postIdIncrement",
    	args: [],
	})) as bigint;

	const posts: Promise<PostDetails | undefined>[] = [];
	// the first post was already initialised with 0x000000000
	for (let i = 1; i < postIdIncrement; i++) {
    	const post: Promise<PostDetails | undefined> = readContract(config, {
        	abi: ABI,
        	address: deployedAddress,
        	functionName: "getPost",
        	args: [BigInt(i)],
    	}) as Promise<PostDetails | undefined>;

    	posts.push(post);
	}
	return await Promise.all(posts).then((values) => {
    	const binding = values.filter((post): post is PostDetails => !!post);
    	return binding;
	});
};

export default allPosts;