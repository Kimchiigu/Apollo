import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Option "mo:base/Option";

actor ChatService {

    /// Structure to represent a message
    type Message = {
        sender: Principal;
        content: Text;
        timestamp: Time.Time;
    };

    /// Structure for storing user data
    type User = {
        username: Text;
        principal: Principal;
    };

    /// Structure for chat session
    type Session = {
        name: Text;
        messages: List.List<Message>;
    };

    /// List to store registered users
    stable var users : List.List<User> = List.nil<User>();

    /// List to store chat sessions
    stable var sessions : List.List<Session> = List.nil<Session>();

    /// Registers a user with a username
    public shared ({ caller }) func registerUser(username: Text) : async Text {
        let userExists : ?User = List.find<User>(users, func(u) = u.principal == caller);
        
        if (Option.isSome(userExists)) {
            return "User already registered!";
        };

        users := List.push<User>({ username = username; principal = caller }, users);
        return "User " # username # " registered successfully!";
    };

    /// Creates a chat session
    public shared func createSession(name: Text) : async Text {
        let sessionExists = List.find<Session>(sessions, func(s) = s.name == name);
        if (Option.isSome(sessionExists)) {
            return "Session already exists!";
        };
        sessions := List.push<Session>({ name = name; messages = List.nil<Message>() }, sessions);
        return "Session " # name # " created successfully!";
    };

    /// Retrieves all available chat sessions
    public query func getSessions() : async [Text] {
        return List.toArray<Text>(List.map<Session, Text>(sessions, func(s) = s.name));
    };

    /// Sends a message to a session
    public shared ({ caller }) func sendMessage(sessionName: Text, content: Text) : async Text {
        let sessionIndex = List.find<Session>(sessions, func(s) = s.name == sessionName);
        
        switch (sessionIndex) {
            case (?session) {
                let newMessage: Message = {
                    sender = caller;
                    content = content;
                    timestamp = Time.now();
                };
                let updatedSession: Session = { name = session.name; messages = List.push<Message>(newMessage, session.messages) };
                sessions := List.map<Session, Session>(sessions, func(s) = if (s.name == sessionName) updatedSession else s);
                return "Message sent!";
            };
            case null {
                return "Session not found!";
            };
        };
    };

    /// Retrieves all messages from a session
    public shared func getMessages(sessionName: Text) : async [Message] {
        let sessionIndex = List.find<Session>(sessions, func(s) = s.name == sessionName);
        
        switch (sessionIndex) {
            case (?session) { return List.toArray<Message>(session.messages); };
            case null { return []; };
        };
    };

    /// Retrieves all registered users
    public query func getUsers() : async [User] {
        return List.toArray<User>(users);
    };
}
