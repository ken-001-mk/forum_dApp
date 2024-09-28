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

import { useWaitForTransactionReceipt } from "wagmi";
import { deployedAddress } from "../contracts/deployed-contract";
import styles from "../styles/Custom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import {
	useReadForumGetPollFromPost,
	useWriteForumUpVotePollOption,
} from "../contracts/generated";

const Poll = ({ postId }: { postId: bigint }) => {
	const { data: pollDetails } = useReadForumGetPollFromPost({
    	address: deployedAddress,
    	args: [postId],
	});

	let voteCounter1 = pollDetails?.option1Counter;
	let voteCounter2 = pollDetails?.option2Counter;

	const { data: option1TxHash, writeContractAsync: votingOption1 } =
    	useWriteForumUpVotePollOption();
	const { data: option2TxHash, writeContractAsync: votingOption2 } =
    	useWriteForumUpVotePollOption();

	const { isLoading: isVotingOption1, isSuccess: hasVotedOption1 } =
    	useWaitForTransactionReceipt({
        	hash: option1TxHash,
    	});

	const { isLoading: isVotingOption2, isSuccess: hasVotedOption2 } =
    	useWaitForTransactionReceipt({
        	hash: option2TxHash,
    	});

	if (hasVotedOption1 && voteCounter1 !== undefined) voteCounter1 += BigInt(1);
	if (hasVotedOption2 && voteCounter2 !== undefined) voteCounter2 += BigInt(1);

	return (
    	<>
        	{pollDetails?.id && (
            	<div className={styles.card}>
                	<div className={styles.form}>
                    	<h1>Here is the poll: {pollDetails?.question}</h1>
                    	<button
                        	className={styles.pollButton}
                        	type="button"
                        	onClick={() => {
                            	votingOption1({
                                	address: deployedAddress,
                                	args: [postId, pollDetails?.option1.trim()],
                            	});
                        	}}
                    	>
                        	{isVotingOption1 ? (
                            	<>Voting... {pollDetails?.option1}</>
                        	) : (
                            	<>
                                	<FontAwesomeIcon icon={faArrowUpLong} />{" "}
                                	{pollDetails?.option1}
                            	</>
                        	)}
                        	{": "}
                        	{voteCounter1?.toString()}
                    	</button>
                    	<button
                        	className={styles.pollButton}
                        	type="button"
                        	onClick={() => {
                            	votingOption2({
                                	address: deployedAddress,
                                	args: [postId, pollDetails?.option2.trim()],
                            	});
                        	}}
                    	>
                        	{isVotingOption2 ? (
                            	<>Voting... {pollDetails?.option2}</>
                        	) : (
                            	<>
                                	<FontAwesomeIcon icon={faArrowUpLong} />{" "}
                                	{pollDetails?.option2}
                            	</>
                        	)}
                        	{": "}
                        	{voteCounter2?.toString()}
                    	</button>
                	</div>
            	</div>
        	)}
    	</>
	);
};

export default Poll;