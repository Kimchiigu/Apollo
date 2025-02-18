# Clone this Project

1. Run this command to clone the repository
   ```sh
   git clone https://github.com/Kimchiigu/Apollo.git
   ```
2. Open your IDE in the Triton folder
   ```sh
   cd Apollo
   ```
   If you use Visual Studio Code
   ```sh
   code .
   ```

---

# How to Run the Project

## **IMPORTANT** for Windows User (WSL Setup)

DFX command can only be run in a linux environment, so Windows user needs to use WSL (Windows Subsystem Linux)

1. Install WSL (if you don't have) / Run WSL (if you already have installed)
   ```sh
   wsl
   ```
   For user who use WSL for the first time, just wait for the installation to be completed
2. If WSL is success, then it will show you a Linux terminal
   ```sh
   <username>@<device_name>:~$
   ```
3. Update package lists
   ```sh
   sudo apt update
   ```
   Usually the package is out of date so you need to update it manually
4. Install node.js and npm (Node Package Manager)
   ```sh
   sudo apt install nodejs npm
   ```
5. Check the version for both
   ```sh
   node -v
   npm -v
   ```
   Best to update the node and npm to the latest!
6. Install the IC SDK
   ```sh
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```
7. Check if DFX is successfully installed (DFX is the package manager installer for ICP)
   ```sh
   dfx --version
   ```
8. Make a Developer Identity
   ```sh
   dfx identity list
   dfx identity new IDENTITY_NAME
   dfx identity use IDENTITY_NAME
   ```
   When creating new identity, it will ask you to make a passphrase (password) for everytime you deploy a canister to the ICP

## Always Run This First

To ensure the DFX environment is active, run the following command:

```sh
 dfx start --clean --background
```

## First Setup (If Cloning the Repository for the First Time)

1. Install the required dependencies:

   ```sh
   npm i
   ```

2. Set up **Internet Identity**:

   ```sh
   dfx deps pull
   dfx deps init
   dfx generate internet_identity
   ```

   If there exist a `deps` folder after git clone, make sure to delete the folder to create a new one with the commands above due to a different download hash

3. Set up **Backend Service - User**:

   ```sh
   dfx canister create backend_service_user
   dfx generate backend_service_user
   ```

4. Set up **Backend Service - Transaction**:

   ```sh
   dfx canister create backend_service_transaction
   dfx generate backend_service_transaction
   ```

5. Set up **Backend Service - Chat**:

   ```sh
   dfx canister create backend_service_chat
   dfx generate backend_service_chat
   ```

6. Set up **Frontend**:

   ```sh
   npm run build
   dfx canister create frontend
   ```

   You need to run `npm run build` to generate a dist folder that will be used when `dfx deploy`

7. **Run the ICP Ledger Setup first!** (see the next section) <br>
   It is necessary to run the ICP ledger setup because the next step would be deploying all of the canisters

8. Once everything is set up, deploy the application:

   ```sh
   dfx deploy
   ```

9. **(COMING SOON)** You can bypass all of the setups with the command:
   ```sh
   npm run finsetup
   ```
   See the detail command of "finsetup" in file package.json (root directory)

---

## ICP Ledger Setup

1. Add canister setup in dfx.json **(No need to paste this again because it's already in the file)**

   ```sh
   "icp_ledger_canister": {
      "type": "custom",
      "candid": "icp_ledger.did",
      "wasm": "https://download.dfinity.systems/ic/5d202894864f4db4a5a46f44422aebc80c3d321b/canisters/ledger-canister.wasm.gz"
   }
   ```

2. Create minter account (miner for ICP coin in blockchain)

   ```sh
   dfx identity new minter
   dfx identity use minter
   export MINTER_ACCOUNT_ID=$(dfx ledger account-id)
   ```

3. Create deployment account (use default)

   ```sh
   dfx identity use default
   DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
   ```

4. Deploy ICP Ledger Canister **(CHANGE TO OTHER ACCOUNT OTHER THAN DEFAULT & MINTER)**

   ```sh
   dfx deploy --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister --argument "
   (variant {
      Init = record {
         minting_account = \"$MINTER_ACCOUNT_ID\";
         initial_values = vec {
         record {
            \"$DEFAULT_ACCOUNT_ID\";
            record {
               e8s = 10_000_000_000 : nat64;
            };
         };
         };
         send_whitelist = vec {};
         transfer_fee = opt record {
         e8s = 10_000 : nat64;
         };
         token_symbol = opt \"LICP\";
         token_name = opt \"Local ICP\";
      }
   })
   "
   ```

## If you open the project again (not the first setup)

1. Start the `dfx` environment

   ```sh
   dfx start --clean --background
   ```

2. Deploy **Internet Identity**:

   ```sh
   dfx deps deploy internet_identity
   ```

3. Create minter account (miner for ICP coin in blockchain)

   ```sh
   dfx identity new minter
   dfx identity use minter
   export MINTER_ACCOUNT_ID=$(dfx ledger account-id)
   ```

4. Create deployment account (use default)

   ```sh
   dfx identity use default
   DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
   ```

5. Deploy ICP Ledger Canister **(CHANGE TO OTHER ACCOUNT OTHER THAN DEFAULT & MINTER)**

   ```sh
   dfx deploy --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister --argument "
   (variant {
      Init = record {
         minting_account = \"$MINTER_ACCOUNT_ID\";
         initial_values = vec {
         record {
            \"$DEFAULT_ACCOUNT_ID\";
            record {
               e8s = 10_000_000_000 : nat64;
            };
         };
         };
         send_whitelist = vec {};
         transfer_fee = opt record {
         e8s = 10_000 : nat64;
         };
         token_symbol = opt \"LICP\";
         token_name = opt \"Local ICP\";
      }
   })
   "
   ```

6. Deploy the entire application:

   ```sh
   dfx deploy
   ```

7. Run the **Frontend** (use **PowerShell**, not WSL, to enable **Hot Module Reload (HMR)**):
   ```sh
   npm run frontend
   ```

**Note:**

- No need to run `npm run backend` because it's already deployed to the internet.
- If there are changes in the backend (mainly the Motoko file `Main.mo`) then run `dfx deploy` again.
- If you want to create a new canister, then you need to run:
  - `dfx canister create <canister_name>`
  - `dfx generate <canister_name>`
  - Add the canister configuration in `dfx.json` with the format: <br>
    `"<backend_name>": {
  "type": "motoko",
  "main": "your_directory/main.mo"
},`
  - Then deploy with `dfx deploy`
- The motoko file name doesn't have to be `Main.mo`, it can be anything like `User.mo`, `Fish.mo`, etc
