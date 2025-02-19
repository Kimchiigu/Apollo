import UserModel "UserModel";
import List "mo:base/List";

module {
    public type CartItem = {
        product_id: Text;
        quantity: Nat;
    };

    public type Patient = UserModel.User and {
        cart: List.List<CartItem>;
    };
}