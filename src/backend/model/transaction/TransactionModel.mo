import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

module {
    public type Transaction = {
        transaction_id: Text;
        sender_id: Principal;
        receiver_id: Principal;
        money: Nat64;
        timestamp: Time.Time;
        status: Text;
        description: Text;
        reference_id: ?Text;
        fee: ?Nat64;
    }
}