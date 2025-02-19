import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type Category = {
        category_id: Text;
        category_name: Text;
    };

    public type Subcategory = {
        subcategory_id: Text;
        subcategory_name: Text;
        category_id: Text;
    };

    public type Product = {
        product_id: Text;
        product_name: Text;
        subcategory_id: Text;
        description: Text;
        price: Nat;
        stock: Nat;
        image: Text; 
    };
}
