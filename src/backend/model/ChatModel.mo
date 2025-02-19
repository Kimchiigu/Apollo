import Time "mo:base/Time";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";

module {
    // ? means "nullable"
    public type SessionStatus = {
        #Requested;
        #Rejected;
        #WaitingPayment;
        #Active;
        #Ended;
    };

    public type Message = {
        message_id: Text;
        sender_id: Principal;
        message_content: Text;
        attachment_image: ?Blob;
        attachment_video: ?Blob;
        timestamp: Time.Time;
    };

    public type Session = {
        session_id: Text;
        patient_id: Principal;
        doctor_id: Principal;
        status: SessionStatus;
        start_time: Time.Time;
        end_time: ?Time.Time;
        messages: List.List<Message>;
    };
}
