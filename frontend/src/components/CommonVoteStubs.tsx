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

import config from "../wagmi";
import { useState } from "react";
import {
	simulateContract,
	writeContract,
	waitForTransactionReceipt,
	readContract,
} from "@wagmi/core";
import { deployedAddress, ABI } from "../contracts/deployed-contract";
import type {
	PostDetails,
	CommentDetails,
	writeContractFn,
	readContractFn,
} from "../types/posts/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLongArrowDown,
	faLongArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Custom.module.css";

const CommonVoteStubs = ({
	id,
	likes,
	upVoteFn,
	downVoteFn,
	getFn,
}: {
	id: bigint;
	likes: bigint;
	upVoteFn: writeContractFn;
	downVoteFn: writeContractFn;
	getFn: readContractFn;
}) => {
	const [likeCounter, setLikeCounter] = useState(likes);

	const handleUpvote = async () => {
    	const { result } = await simulateContract(config, {
        	address: deployedAddress,
        	abi: ABI,
        	functionName: upVoteFn,
        	args: [id],
    	});

    	console.log(result);

    	const upvoteTxHash = await writeContract(config, {
        	address: deployedAddress,
        	abi: ABI,
        	functionName: upVoteFn as writeContractFn,
        	args: [id],
    	});

    	const transaction = await waitForTransactionReceipt(config, {
        	hash: upvoteTxHash,
    	});

    	if (transaction.status === "reverted") {
        	alert("Upvoting failed! Transaction was reverted due to an error!");
        	return;
    	}

    	const postOrComment: PostDetails | CommentDetails = (await readContract(
        	config,
        	{
            	abi: ABI,
            	address: deployedAddress,
            	functionName: getFn,
            	args: [id],
        	},
    	)) as PostDetails | CommentDetails;

    	setLikeCounter(postOrComment.likes);
	};

	const handleDownVote = async () => {
    	const { result } = await simulateContract(config, {
        	address: deployedAddress,
        	abi: ABI,
        	functionName: downVoteFn,
        	args: [id],
    	});

    	console.log(result);

    	const downvoteTxHash = await writeContract(config, {
        	address: deployedAddress,
        	abi: ABI,
        	functionName: downVoteFn,
        	args: [id],
    	});

    	const transaction = await waitForTransactionReceipt(config, {
        	hash: downvoteTxHash,
    	});

    	if (transaction.status === "reverted") {
        	alert("Downvoting failed! Transaction was reverted due to an error!");
        	return;
    	}

    	const postOrComment: PostDetails | CommentDetails = (await readContract(
        	config,
        	{
            	abi: ABI,
            	address: deployedAddress,
            	functionName: getFn,
            	args: [id],
        	},
    	)) as PostDetails | CommentDetails;

    	setLikeCounter(postOrComment.likes);
	};
	return (
    	<>
        	<div className={styles.vote}>
            	<button type="button" onClick={handleUpvote}>
                	<FontAwesomeIcon icon={faLongArrowUp} /> {likeCounter.toString()}
            	</button>
				<button type="button" onClick={handleDownVote} title="Downvote">
                	<FontAwesomeIcon icon={faLongArrowDown} />
            	</button>
        	</div>
    	</>
	);
};

export default CommonVoteStubs;