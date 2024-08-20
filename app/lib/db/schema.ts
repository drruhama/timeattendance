
//import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { pgTable, text, timestamp, date, time, serial, integer } from "drizzle-orm/pg-core";
import { number } from "zod";

//import db from ".";
export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    hashedPassword: text("hashed_password").notNull(),
    fullName: text("full_name").notNull(),
    homebase: text("homebase"),
    office: text("office"),
    keterangan: text("keterangan")
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const attendanceTable = pgTable("attendance", {
    id: text("id").primaryKey(),
    employeId: text("employed_id")
        .notNull()
        .references(() => userTable.id),
    jenisKehadiran: text("jenis_hadir"),
    tanggal: text("tanggal").notNull(),
    startTime: text("start_time"),
    endTime: text("end_time"),
    lokasi: text("lokasi")
});



export const employeTable = pgTable("employee", {
    id: serial("id").primaryKey(),
    empId: text("emplo_id")
        .notNull()
        .references(() => userTable.id),
    nik: text("NIK"),
    nama: text("nama"),
    jenisKelamin: text("jenis_kelamin"),
    tempatLahir: text("tempat_lahir"),
    tanggalLahir: date("tanggal_lahir"),
    ktp: text("ktp"),
    alamatKtp: text("alamat_ktp"),
    alamatDomisili: text("alamat_domisili"),
    nokk: text("no_kk"),
    agama: text("agama"),
    nohp: integer("no_hp"),
    emailPribadi: text("email_pribadi"),
    emailPerusahaan: text("email_perusahaan"),
    golDarah: text("gol_darah"),
    ibuKandung: text("ibu_kandung"),
});

export const empcardTable = pgTable("empcard", {
    id: text("id").primaryKey(),
    emploId: text("emplo_id")
        .notNull()
        .references(() => userTable.id),
    bpjstk: text("bpjstk"),
    bpjskes: text("bpjskes"),
    rekMandiri: text("rek_mandiri"),
    pemilikrek: text("pem_rek"),
    reklain: text("rek_lain"),
    npwp: text("npwp")
});

export const empcompanyTable = pgTable("empcompany", {
    id: text("id").primaryKey(),
    idemp: text("id_emp")
        .notNull()
        .references(() => userTable.id),
    perusahaan: text("perusahaan"),
    divRegion: text("divisi_region"),
    departemen: text("departemen"),
    keterangan: text("keterangan"),
    status: text("status"),
    statKar: text("status_karyawan"),
    jabatan: text("jabatan"),
    dirin: text("dirin"),
    statusGol: text("status_gol"),
    tglJoin: date("tgl_join"),
    tglakhKer: text("tgl_akhir_ker"),
    ktrCab: text("kantor_cab")
});

export const empbenefitTable = pgTable("empbenefit", {
    id: text("id").primaryKey(),
    empId: text("emp_id")
        .notNull()
        .references(() => userTable.id),
    gaPok: integer("gaji_pokok"),
    tunjangan: integer("tunjangan"),
    lainya: integer("lainya"),
    statPtkp: text("stat_ptkp"),
    skPengangkatan: text("sk_pengangkatan")
});

export const pendidikanTable = pgTable("pendidikan", {
    id: text("id").primaryKey(),
    emploId: text("emplo_id")
        .notNull()
        .references(() => userTable.id),
    tingkatPendidikan: text("tingkat_pendidikan"),
    jurusan: text("jurusan"),
    namaLembaga: text("nama_lembaga"),
});

export const riwayatkjTable = pgTable("riwayatkj", {
    id: text("id").primaryKey(),
    idEmp: text("emplo_id")
        .notNull()
        .references(() => userTable.id),
    jabatan: text("jabatan"),
    noUrut: integer("no_urut"),
    noPkwt: text("no_pkwt"),
    startPkwt: date("start_pkwt"),
    endPkwt: date("end_pkwt")
});

export const workcalTable = pgTable("workcal", {
    id: serial("id").primaryKey(),
    tanggal: text("tanggal").unique(),
    hari: text("hari")
});