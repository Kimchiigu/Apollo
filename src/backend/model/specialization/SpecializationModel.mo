import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";

module {
    public type Specialization = {
        specialization_id: Text;
        name: Text;
        image: Text;
        list_of_doctor: List.List<Principal>;
    };

    public module SpecializationList {
        public func getSpecializations(): List.List<Specialization> {
            List.fromArray<Specialization>([
                { specialization_id = "1"; name = "Dokter Umum"; image = "dokter_umum.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "2"; name = "Spesialis Anak"; image = "spesialis_anak.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "3"; name = "Spesialis Kulit"; image = "spesialis_kulit.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "4"; name = "Spesialis Penyakit Dalam"; image = "spesialis_penyakit_dalam.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "5"; name = "Spesialis THT"; image = "spesialis_tht.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "6"; name = "Spesialis Kandungan"; image = "spesialis_kandungan.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "7"; name = "Dokter Hewan"; image = "dokter_hewan.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "8"; name = "Psikiater"; image = "psikiater.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "9"; name = "Psikolog Klinis"; image = "psikolog_klinis.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "10"; name = "Kesehatan Paru"; image = "kesehatan_paru.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "11"; name = "Spesialis Mata"; image = "spesialis_mata.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "12"; name = "Seksologi & Spesialis Reproduksi Pria"; image = "seksologi_reproduksi.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "13"; name = "Spesialis Gizi Klinik"; image = "spesialis_gizi.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "14"; name = "Talk Therapy Clinic"; image = "talk_therapy.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "15"; name = "Dokter Gigi"; image = "dokter_gigi.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "16"; name = "Perawatan Rambut"; image = "perawatan_rambut.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "17"; name = "Spesialis Bedah"; image = "spesialis_bedah.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "18"; name = "Spesialis Jantung"; image = "spesialis_jantung.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "19"; name = "Spesialis Saraf"; image = "spesialis_saraf.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "20"; name = "Laktasi"; image = "laktasi.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "21"; name = "Program Hamil"; image = "program_hamil.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "22"; name = "Fisioterapi & Rehabilitasi"; image = "fisioterapi_rehabilitasi.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "23"; name = "Medikolegal & Hukum Kesehatan"; image = "medikolegal.png"; list_of_doctor = List.nil<Principal>() },
                { specialization_id = "24"; name = "Pemeriksaan Lab"; image = "pemeriksaan_lab.png"; list_of_doctor = List.nil<Principal>() }
            ])
        };
    };
}
