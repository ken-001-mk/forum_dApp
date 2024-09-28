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

import { useEffect, useState } from "react";
import { ABI, deployedAddress } from "../contracts/deployed-contract";
import type { CommentDetails, PostDetails } from "../types/posts/types";
import { readContract } from "wagmi/actions";
import config from "../wagmi";
import ShareableCommentComponent from "./ShareableCommentComponent";
import { useReadForumGetCommentsFromPost } from "../contracts/generated";

const Comments = ({ post }: { post: PostDetails }) => {
	const {
		data: postToCommentIds,
		isLoading,
	}: { data: bigint[] | undefined; isLoading: boolean } =
		useReadForumGetCommentsFromPost({
			address: deployedAddress,
			args: [post.id],
		});

	const [comments, setComments] = useState<CommentDetails[]>([]);

	useEffect(() => {
		if (!postToCommentIds) {
			return;
		}
		const fetchCommentsFromCommentIds = async () => {
			const promised_comments: Promise<CommentDetails>[] = [];
			const binding = postToCommentIds as bigint[];
			for (const commentId of binding) {
				const comment = readContract(config, {
					abi: ABI,
					address: deployedAddress,
					functionName: "getComment",
					args: [commentId],
				});

				promised_comments.push(comment);
			}
			return promised_comments;
		};

		if (!isLoading) {
			fetchCommentsFromCommentIds().then((promises) => {
				Promise.all(promises).then((values) => {
					setComments(values);
				});
			});
		}
	}, [isLoading, postToCommentIds]);

	return (
		<>
			{comments.map((comment) => (
				<ShareableCommentComponent
					comment={comment}
					post={post}
					key={comment.id}
				/>
			))}
		</>
	);
};

export default Comments;