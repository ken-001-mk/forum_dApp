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

import { useState } from "react";
import PostForm from "../../components/PostForm";
import styles from "../../styles/Custom.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useAccountEffect } from "wagmi";

const Forum = () => {
	const [account, setAccount] = useState(useAccount()?.address);
	useAccountEffect({
    	onConnect(data) {
        	setAccount(data.address);
    	},
    	onDisconnect() {
        	console.log("Account Disconnected");
        	setAccount(undefined);
    	},
	});
	return (
    	<>
        	<div className={styles.main}>
            	<header>
                	<nav>
                    	<ConnectButton
                        	label={account === undefined ? "Connect Wallet To Post" : ""}
                    	/>
                	</nav>
            	</header>

            	<div>
                	<PostForm account={account} />
            	</div>
        	</div>
    	</>
	);
};

export default Forum;