import List "mo:base/List";
import Principal "mo:base/Principal";

module {
    public type User = {
        user_id: Principal;
        full_name: Text;
        email: Text;
        phone_number: Text;
        address: Text;
        dob: Text;
        gender: Text;
        picture_profile: Text;
        role: Text;
        list_of_session: List.List<Text>;
    };
}
