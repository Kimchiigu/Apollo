import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import List "mo:base/List";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import UserModel "../model/user/UserModel";
import DoctorModel "../model/user/DoctorModel";
import PatientModel "../model/user/PatientModel";

actor UserService {
    type User = UserModel.User;
    type Doctor = DoctorModel.Doctor;
    type Patient = PatientModel.Patient;
    type CartItem = PatientModel.CartItem;

    let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
    let doctors = TrieMap.TrieMap<Principal, Doctor>(Principal.equal, Principal.hash);
    let patients = TrieMap.TrieMap<Principal, Patient>(Principal.equal, Principal.hash);

    // ========================
    // User Registration
    // ========================

    public shared func registerUser(
        userId: Principal,
        full_name: Text,
        email: Text,
        phone_number: Text,
        address: Text,
        dob: Text,
        gender: Text,
        picture_profile: Text,
        role: Text,
        specialization_id: ?Text,
        registration_number: ?Text
        ) : async Result.Result<Text, Text> {

        if (users.get(userId) != null) {
            return #err("User already exists.");
        };

        switch (role) {
            case ("Patient") {
            let patient: Patient = {
                user_id = userId;
                full_name = full_name;
                email = email;
                phone_number = phone_number;
                address = address;
                dob = dob;
                gender = gender;
                picture_profile = picture_profile;
                role = role;
                list_of_session = List.nil();
                cart = List.nil<CartItem>();
            };
            patients.put(userId, patient);
            };
            case ("Doctor") {
            switch (registration_number, specialization_id) {
                case (?regNum, ?specId) {
                let doctor: Doctor = {
                    user_id = userId;
                    full_name = full_name;
                    email = email;
                    phone_number = phone_number;
                    address = address;
                    dob = dob;
                    gender = gender;
                    picture_profile = picture_profile;
                    role = role;
                    list_of_session = List.nil();
                    registration_number = regNum;
                    specialization_id = specId;
                    is_available = true;
                    rating = 0.0;
                    rated_by = 0;
                    service_price = 0;
                    queue = List.nil<Principal>();
                };
                doctors.put(userId, doctor);
                };
                case _ {
                return #err("Doctor registration requires specialization_id and registration_number.");
                };
            };
            };
            case _ {
            return #err("Invalid role. Only 'Patient' or 'Doctor' allowed.");
            };
        };

        users.put(userId, {
            user_id = userId;
            full_name = full_name;
            email = email;
            phone_number = phone_number;
            address = address;
            dob = dob;
            gender = gender;
            picture_profile = picture_profile;
            role = role;
            list_of_session = List.nil();
        });

        return #ok("User registered successfully.");
        };

    // ========================
    // Update User Info
    // ========================

    public shared func updateUser(
    userId: Principal,
    full_name: ?Text,
    email: ?Text,
    phone_number: ?Text,
    address: ?Text,
    dob: ?Text,
    gender: ?Text,
    picture_profile: ?Text,
    role: ?Text,
    specialization_id: ?Text,
    service_price: ?Nat,
    is_available: ?Bool
) : async Result.Result<Text, Text> {

    let user = users.get(userId);

    switch (user) {
        case (?user) {
            // Update base user fields
            let updatedUser: User = {
                user_id = user.user_id;
                full_name = Option.get(full_name, user.full_name);
                email = Option.get(email, user.email);
                phone_number = Option.get(phone_number, user.phone_number);
                address = Option.get(address, user.address);
                dob = Option.get(dob, user.dob);
                gender = Option.get(gender, user.gender);
                picture_profile = Option.get(picture_profile, user.picture_profile);
                role = Option.get(role, user.role);
                list_of_session = user.list_of_session;
            };

            // Update user-specific fields based on role
            switch (user.role) {
                case ("Doctor") {
                    let doctor = doctors.get(userId);
                    switch (doctor) {
                        case (?doc) {
                            let updatedDoctor: Doctor = {
                                user_id = updatedUser.user_id;
                                full_name = updatedUser.full_name;
                                email = updatedUser.email;
                                phone_number = updatedUser.phone_number;
                                address = updatedUser.address;
                                dob = updatedUser.dob;
                                gender = updatedUser.gender;
                                picture_profile = updatedUser.picture_profile;
                                role = updatedUser.role;
                                list_of_session = updatedUser.list_of_session;
                                registration_number = doc.registration_number;
                                specialization_id = Option.get(specialization_id, doc.specialization_id);
                                is_available = Option.get(is_available, doc.is_available);
                                service_price = Option.get(service_price, doc.service_price);
                                rating = doc.rating;
                                rated_by = doc.rated_by;
                                queue = doc.queue;
                            };
                            doctors.put(userId, updatedDoctor);
                        };
                        case null {
                            return #err("Doctor profile not found.");
                        };
                    };
                };

                case ("Patient") {
                    let patient = patients.get(userId);
                    switch (patient) {
                        case (?pat) {
                            let updatedPatient: Patient = {
                                user_id = updatedUser.user_id;
                                full_name = updatedUser.full_name;
                                email = updatedUser.email;
                                phone_number = updatedUser.phone_number;
                                address = updatedUser.address;
                                dob = updatedUser.dob;
                                gender = updatedUser.gender;
                                picture_profile = updatedUser.picture_profile;
                                role = updatedUser.role;
                                list_of_session = updatedUser.list_of_session;
                                cart = pat.cart;  // Ensure cart remains intact
                            };
                            patients.put(userId, updatedPatient);
                        };
                        case null {
                            return #err("Patient profile not found.");
                        };
                    };
                };

                case _ {
                    return #err("Unsupported role for update.");
                };
            };

            // Update the general user map
            users.put(userId, updatedUser);
            return #ok("User updated successfully.");
        };

        case null {
            return #err("User not found.");
        };
    };
};


    // ========================
    // Get User Info
    // ========================

    public query func getUserById(userId: Principal) : async Result.Result<User, Text> {
        switch (users.get(userId)) {
            case (?user) { return #ok(user); };
            case null { return #err("User not found."); };
        };
    };

    public query func getDoctorById(userId: Principal) : async Result.Result<Doctor, Text> {
        switch (doctors.get(userId)) {
            case (?doctor) { return #ok(doctor); };
            case null { return #err("Doctor not found."); };
        };
    };

    public query func getPatientById(userId: Principal) : async Result.Result<Patient, Text> {
        switch (patients.get(userId)) {
            case (?patient) { return #ok(patient); };
            case null { return #err("Patient not found."); };
        };
    };

    // ========================
    // Delete User
    // ========================

    public shared func deleteUser(userId: Principal) : async Result.Result<Text, Text> {
        switch (users.get(userId)) {
            case (?user) {
                users.delete(userId);
                if (user.role == "Doctor") {
                    doctors.delete(userId);
                } else if (user.role == "Patient") {
                    patients.delete(userId);
                };
                return #ok("User deleted successfully.");
            };
            case null { return #err("User not found."); };
        };
    };

    // ========================
    // Helper Functions
    // ========================
    public query func getName(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.full_name;
         };
         case (null) {
            return "Stranger";
         };
      };
   };

    public query func getAllUsers() : async [User] {
      return Array.map<(Principal, User), User>(
         Iter.toArray(users.entries()),  // Convert iterator to array
         func((_, user)) = user
      );
   };


    public query func getAllDoctors() : async [Doctor] {
      return Array.map<(Principal, Doctor), Doctor>(
         Iter.toArray(doctors.entries()),
         func((_, doctor)) = doctor
      );
   };


    public query func getAllPatients() : async [Patient] {
      return Array.map<(Principal, Patient), Patient>(
         Iter.toArray(patients.entries()),
         func((_, patient)) = patient
      );
   };

    // ========================
    // Debugging
    // ========================

    public query func whoami() : async Principal {
        return Principal.fromActor(UserService);
    };

    public query func printHello() : async Text {
        return "Hello from UserService!";
    };
}
