## (ARCHIVED) ICRC-1 Ledger Setup

#### Link : https://internetcomputer.org/docs/current/tutorials/developer-liftoff/level-4/4.2-icrc-tokens

1. Add canister setup in dfx.json

   ```sh
   "icrc1_ledger_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/aba60ffbc46acfc8990bf4d5685c1360bd7026b9/rs/ledger_suite/icrc1/ledger/ledger.did",
      "wasm": "https://download.dfinity.systems/ic/aba60ffbc46acfc8990bf4d5685c1360bd7026b9/canisters/ic-icrc1-ledger.wasm.gz"
   }
   ```

2. Create minter account (miner for ICP coin in blockchain)

   ```sh
   dfx identity new minter
   dfx identity use minter
   export MINTER_ACCOUNT_ID=$(dfx identity get-principal)
   ```

3. Make your own Internet Token

   ```sh
   export TOKEN_NAME="Triton Token"
   export TOKEN_SYMBOL="TRTK"
   ```

4. Export your default account (can be your developer account)

   ```sh
   dfx identity new <your_account_name>
   dfx identity use <your_account_name>
   export DEPLOY_ID=$(dfx identity get-principal)
   ```

5. Predetermined minted tokens and transfer fee (for testing)

   ```sh
   export PRE_MINTED_TOKENS=10_000_000_000
   export TRANSFER_FEE=10_000
   ```

   ### **Explanation**

   - `PRE_MINTED_TOKENS`: The number of tokens minted during the ledger's initial deployment.

   - `TRANSFER_FEE`: The fee that users will pay whenever they make a transfer using the ledger.

6. Set the values for the ledger's archiving options

   ```sh
   dfx identity new archive_controller
   dfx identity use archive_controller
   export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
   export TRIGGER_THRESHOLD=2000
   export NUM_OF_BLOCK_TO_ARCHIVE=1000
   export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
   ```

   ### **Explanation**

   - `ARCHIVE_CONTROLLER`: Principal of the archive canister's controller.

   - `TRIGGER_THRESHOLD`: The number of blocks to archive once the trigger threshold is exceeded.

   - `NUM_OF_BLOCK_TO_ARCHIVE`: The amount of blocks to be archived.

   - `CYCLE_FOR_ARCHIVE_CREATION`: The amount of cycles to be sent to the archive canister when it is deployed.

7. Enable ICRC-2 and ICRC-3 Support

   ```sh
   export FEATURE_FLAGS=true
   ```

   `FEATURE_FLAGS`: Used to enable or disable certain ICRC-1 standard extensions. If you want to support the ICRC-2 standard extension, then set this flag to true

8. Deploy the icp-ledger canister

   ```sh
   dfx deploy icrc1_ledger_canister --specified-id mxzaz-hqaaa-aaaar-qaada-cai --argument "
   (variant {Init = record {
      token_symbol = \"${TOKEN_SYMBOL}\";
      token_name = \"${TOKEN_NAME}\";
      minting_account = record { owner = principal \"${MINTER_ACCOUNT_ID}\" };
      transfer_fee = ${TRANSFER_FEE};
      metadata = vec {};
      feature_flags = opt record { icrc2 = ${FEATURE_FLAGS} };
      initial_balances = vec {
         record { record { owner = principal \"${DEPLOY_ID}\" }; ${PRE_MINTED_TOKENS}; };
      };
      archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
      };
      cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
   }})"

   ```

9. Check the current available token

   ```sh
   dfx canister call icrc1_ledger_canister icrc1_metadata '()'
   ```

   It should returned:

   ```sh
   (
      vec {
         record { "icrc1:decimals"; variant { Nat = 8 : nat } };
         record { "icrc1:name"; variant { Text = "Triton Token" } };
         record { "icrc1:symbol"; variant { Text = "TRTK" } };
         record { "icrc1:fee"; variant { Nat = 10_000 : nat } };
         record { "icrc1:max_memo_length"; variant { Nat = 32 : nat } };
      },
   )
   ```

10. Check balance of an account

    ```sh
    dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {owner = principal \"${DEPLOY_ID}\"; })"
    ```

    - Change the `DEPLOY_ID` with any principal id that you want to check
    - To check a principal id :
      ```sh
      dfx identity use <your_account_name>
      dfx identity get-principal
      ```

11. Transfer token with ICRC-1

```sh
   dfx identity use <your_account_name>
   dfx canister call icrc1_ledger_canister icrc1_transfer "(record { to = record { owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";};  amount = 10_000;})"
```

- If you run this command, then the sender will be the current identity that is used!
- If success then it should return

```sh
(variant { Ok = 1 : nat })
```
