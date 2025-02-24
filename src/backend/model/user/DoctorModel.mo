import UserModel "UserModel";
import List "mo:base/List";

module {
    public type Doctor = UserModel.User and {
        registration_number: Text;
        specialization_id: Text;
        is_available: Bool;
        rating: Float;
        rated_by: Nat;
        service_price: Nat;
        queue: List.List<Principal>;
    };
}