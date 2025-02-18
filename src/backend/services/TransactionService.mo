import ICPLedger "canister:icp_ledger_canister";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
    public shared ({caller}) func transferICP(
        amount : Nat64, 
        recipientID : Principal
    ) : async Result.Result<Text, Text> {
        
        let fee_e8s : Nat64 = 10_000;
        let memo : Nat64 = 0;
        let created_at_time = null;
        
        // ✅ Corrected: Await `account_identifier` function
        let recipientAccount : Blob = await ICPLedger.account_identifier({
            owner = recipientID;
            subaccount = null;
        });

        // ✅ Construct TransferArgs
        let transferArgs : ICPLedger.TransferArgs = {
            memo = memo;
            amount = { e8s = amount };
            fee = { e8s = fee_e8s };
            from_subaccount = null; // Use default account
            to = recipientAccount;
            created_at_time = created_at_time;
        };

        // ✅ Execute Transfer
        let transferResult = await ICPLedger.transfer(transferArgs);

        // ✅ Handle Transfer Result
        switch (transferResult) {
            case (#Ok(blockIndex)) {
                return #ok("Transfer successful! Block index: " # Nat64.toText(blockIndex));
            };
            case (#Err(err)) {
                return #err("Transfer failed: " # debug_show(err));
            };
        };
    };
}
