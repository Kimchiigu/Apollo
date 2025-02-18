import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Option "mo:base/Option";

actor ChatService {

    /// Structure to represent a message
    type Message = {
        sender: Principal;
        receiver: Principal;
        content: Text;
        timestamp: Time.Time;
    };

    /// Structure for storing user data
    type User = {
        username: Text;
        principal: Principal;
    };

    /// List to store registered users (Explicit Type Declaration ✅)
    stable var users : List.List<User> = List.nil<User>();

    /// List to store chat messages (Explicit Type Declaration ✅)
    stable var messages : List.List<Message> = List.nil<Message>();

    /// Registers a user with a username
    public shared ({ caller }) func registerUser(username: Text) : async Text {
        let userExists : ?User = List.find<User>(users, func(u) = u.principal == caller);
        
        if (Option.isSome(userExists)) {
            return "User already registered!";
        };

        users := List.push<User>({ username = username; principal = caller }, users);
        return "User " # username # " registered successfully!";
    };

    /// Sends a message to another user
    public shared ({ caller }) func sendMessage(receiver: Principal, content: Text) : async Text {
        let senderExists : ?User = List.find<User>(users, func(u) = u.principal == caller);
        let receiverExists : ?User = List.find<User>(users, func(u) = u.principal == receiver);
        
        if (Option.isNull(senderExists)) {
            return "Sender is not registered!";
        };
        if (Option.isNull(receiverExists)) {
            return "Receiver is not registered!";
        };

        let newMessage: Message = {
            sender = caller;
            receiver = receiver;
            content = content;
            timestamp = Time.now();
        };

        messages := List.push<Message>(newMessage, messages);
        return "Message sent!";
    };

    /// Retrieves chat messages between the caller and another user
    public shared ({ caller }) func getMessagesWith(user: Principal) : async [Message] {
        let chatHistory : List.List<Message> = List.filter<Message>(messages, func(m) = 
            (m.sender == caller and m.receiver == user) or 
            (m.sender == user and m.receiver == caller)
        );

        return List.toArray<Message>(chatHistory);
    };

    /// Retrieves all messages sent by the caller
    public shared ({ caller }) func getSentMessages() : async [Message] {
        let sentMessages : List.List<Message> = List.filter<Message>(messages, func(m) = m.sender == caller);
        return List.toArray<Message>(sentMessages);
    };

    /// Retrieves all messages received by the caller
    public shared ({ caller }) func getReceivedMessages() : async [Message] {
        let receivedMessages : List.List<Message> = List.filter<Message>(messages, func(m) = m.receiver == caller);
        return List.toArray<Message>(receivedMessages);
    };

    /// Retrieves all registered users
    public query func getUsers() : async [User] {
        return List.toArray<User>(users);
    };
}
