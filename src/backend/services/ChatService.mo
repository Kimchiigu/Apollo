import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Option "mo:base/Option";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Int "mo:base/Int";
import ChatModel "../model/chat/ChatModel";

actor ChatService {

    /// Aliases for types
    type Message = ChatModel.Message;
    type Session = ChatModel.Session;
    type SessionStatus = ChatModel.SessionStatus;

    /// User structure
    type User = {
        username: Text;
        principal: Principal;
    };

    /// Stable storage for users and sessions
    stable var users: List.List<User> = List.nil<User>();
    stable var sessions: List.List<Session> = List.nil<Session>();

    /// Generate a unique message ID
    func generateMessageId() : Text {
        let now = Time.now();
        let random = Nat.toText(Int.abs(now % 1000000));  // Removed Nat.abs
        return "msg_" # random;
    };

    /// Generate a unique session ID
    func generateSessionId() : Text {
        let now = Time.now();
        let random = Nat.toText(Int.abs(now % 1000000));  // Removed Nat.abs
        return "session_" # random;
    };


    /// Register a user
    public shared ({ caller }) func registerUser(username: Text) : async Text {
        let userExists = List.find<User>(users, func(u) = u.principal == caller);
        if (Option.isSome(userExists)) {
            return "User already registered!";
        };

        users := List.push({ username = username; principal = caller }, users);
        return "User " # username # " registered successfully!";
    };

    /// Create a chat session between a patient and a doctor
    public shared func createSession(patient_id: Principal, doctor_id: Principal) : async Text {
        let sessionId = generateSessionId();
        let newSession: Session = {
            session_id = sessionId;
            patient_id = patient_id;
            doctor_id = doctor_id;
            status = #Requested;
            start_time = Time.now();
            end_time = null;
            messages = List.nil<Message>();
        };

        sessions := List.push(newSession, sessions);
        return "Session created successfully with ID: " # sessionId;
    };

    /// Get all sessions for a user (patient or doctor)
    public query func getUserSessions(userId: Principal) : async [Session] {
        let userSessions = List.filter<Session>(sessions, func(s) = s.patient_id == userId or s.doctor_id == userId);
        return List.toArray(userSessions);
    };

    /// Send a message in a session
    public shared ({ caller }) func sendMessage(
        session_id: Text,
        content: Text,
        attachment_image: ?Blob,
        attachment_video: ?Blob
    ) : async Text {
        let sessionOpt = List.find<Session>(sessions, func(s) = s.session_id == session_id);

        switch (sessionOpt) {
            case (?session) {
                let newMessage: Message = {
                    message_id = generateMessageId();
                    sender_id = caller;
                    message_content = content;
                    attachment_image = attachment_image;
                    attachment_video = attachment_video;
                    timestamp = Time.now();
                };

                let updatedSession: Session = {
                    session_id = session.session_id;
                    patient_id = session.patient_id;
                    doctor_id = session.doctor_id;
                    status = session.status;
                    start_time = session.start_time;
                    end_time = session.end_time;
                    messages = List.push(newMessage, session.messages);
                };

                sessions := List.map<Session, Session>(sessions, func(s) = if (s.session_id == session_id) updatedSession else s);
                return "Message sent successfully!";
            };
            case null {
                return "Session not found!";
            };
        };
    };

    /// Get all messages in a session
    public shared func getMessages(session_id: Text) : async [Message] {
        let sessionOpt = List.find<Session>(sessions, func(s) = s.session_id == session_id);

        switch (sessionOpt) {
            case (?session) { return List.toArray(session.messages); };
            case null { return []; };
        };
    };

    /// Get all registered users
    public query func getUsers() : async [User] {
        return List.toArray(users);
    };

    /// Update session status
    public shared func updateSessionStatus(session_id: Text, newStatus: SessionStatus) : async Text {
        let sessionOpt = List.find<Session>(sessions, func(s) = s.session_id == session_id);

        switch (sessionOpt) {
            case (?session) {
                let updatedSession: Session = {
                    session_id = session.session_id;
                    patient_id = session.patient_id;
                    doctor_id = session.doctor_id;
                    status = newStatus;
                    start_time = session.start_time;
                    end_time = session.end_time;
                    messages = session.messages;
                };

                sessions := List.map<Session, Session>(sessions, func(s) = if (s.session_id == session_id) updatedSession else s);
                return "Session status updated to " # (switch (newStatus) {
                    case (#Requested) { "Requested" };
                    case (#Rejected) { "Rejected" };
                    case (#WaitingPayment) { "Waiting for Payment" };
                    case (#Active) { "Active" };
                    case (#Ended) { "Ended" };
                });
            };
            case null {
                return "Session not found!";
            };
        };
    };

    /// End a session
    public shared func endSession(session_id: Text) : async Text {
        let sessionOpt = List.find<Session>(sessions, func(s) = s.session_id == session_id);

        switch (sessionOpt) {
            case (?session) {
                let updatedSession: Session = {
                    session_id = session.session_id;
                    patient_id = session.patient_id;
                    doctor_id = session.doctor_id;
                    status = #Ended;
                    start_time = session.start_time;
                    end_time = ?Time.now();
                    messages = session.messages;
                };

                sessions := List.map<Session, Session>(sessions, func(s) = if (s.session_id == session_id) updatedSession else s);
                return "Session ended successfully!";
            };
            case null {
                return "Session not found!";
            };
        };
    };
}
