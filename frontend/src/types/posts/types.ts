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

export type writeContractFn = Readonly<
	| "createComment"
	| "createPoll"
	| "createPost"
	| "downVoteComment"
	| "downVotePost"
	| "upVoteComment"
	| "upVotePollOption"
	| "upVotePost"
>;

export type readContractFn = Readonly<
	| "commentIdIncrement"
	| "comments"
	| "compareStringsbyBytes"
	| "getComment"
	| "getCommentsFromPost"
	| "getPoll"
	| "getPollFromPost"
	| "getPost"
	| "getPostsFromAddress"
	| "pollIdIncrement"
>;

export type PostDetails = {
	owner: `0x${string}`;
	id: bigint;
	title: string;
	description: string;
	spoil: boolean;
	likes: bigint;
	timestamp: bigint;
};

// Alias it so we don't get confused. Both have the same fields
export type CommentDetails = PostDetails;

export type PollFormDetails = {
	question: string;
	option1: string;
	option2: string;
};

export type PollAllDetails = {
	id: bigint;
	question: string;
	option1: string;
	option2: string;
	option1Counter: bigint;
	option2Counter: bigint;
};