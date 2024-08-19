import { z } from "zod"

export const SignUpSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters long"}),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long"}),
    fullname: z.string().min(2).max(50),
    homebase: z.enum(["Cabang (AIRA)","Cabang (API)","Cabang (IAPI)","Cabang (Sangkuriang)","Head Office (AIRA)","Head Office (AMN)","Head Office (AMP)","Head Office (ANS)","Head Office (API)","Head Office (BONT)","Head Office (GCE)","Head Office (GTA)","Head Office (IAPS)","Head Office (IAPSI)","Head Office (ISM)","Head Office (MAV)","HO Sangkuriang","Head Office (SPI)","Head Office (GRT)","Head Office (WTP)","Other"]),
    office: z.enum(["Accounting","Admin RM","Analist","Building & Mining","Cabang Aceh-Medan","Cabang Bali","Cabang Balikpapan","Cabang Bandar Lampung","Cabang Bandung","Cabang Bangka Belitung","Cabang Banjarmasin","Cabang Banyuwangi","Cabang Bekasi","Cabang Bengkulu","Cabang Bogor","Cabang Cikampek","Cabang Cikande","Cabang Cilegon","Cabang Cirebon","Cabang Glodok","Cabang Gresik","Cabang IAPS Sidamukti","Cabang Jakarta","Cabang Jambi","Cabang Jawa Timur","Cabang Kalimantan","Cabang Kal AIRA","Cabang Karawang","Cabang Kendari","Cabang Lamongan","Cabang Lombok","Cabang Makassar","Cabang Manado","Cabang Medan","Cabang Mojokerto","Cabang Padang","Cabang Palangkaraya","Cabang Palembang","Cabang Palu","Cabang PangkalanBun","Cabang Pasuruan","Cabang Pekanbaru","Cabang Pontianak","Cabang Purwakarta","Cabang Samarinda","Cabang Sampit","Cabang Semarang","Cabang Solo","Cabang Sorong","Cabang Sukabumi","Cabang Surabaya","Cabang Tangerang","Cabang TanjungSelor","CEO Secretary","Control Valve","E-Procurement","Finance","Finance Control","Flexible Hoses","Flow Meter","General Affair","Head Office (AIRA)","Head Office (AMN)","Head Office (ANS)","Head Office (API)","Head Office (BONT)","Head Office (GCE)","Head Office (GRT)","Head Office (GTA)","Head Office (IAPS)","Head Office (IAPSI)","Head Office (ISM)","Head Office (MAV)","HO Sangkuriang","Head Office (WTP)","Head Office AIP(SBP)","Head Office (AMP)","Head Office (SPI)","Human Capital","IAPSI Pelabuhan Ratu","IAPS Kendari","Import","Internal Audit","Inventory Control","IT","Legal","Marcomm","Oleochemical","Operasional","PPIC Ekspedisi","PPIC Logistic","Purchasing","QHSE","Sanitary","Sawit","Warehouse","WHS Makassar","Water Pump","Water Work","Workshop","Other"])
  }).refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"]
  })

  export const SignInSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters long"}),
    //confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long"}),
  })

  export const AttendSchema = z.object({
    employeID: z.string().min(1).max(50),
    jenisKehadiran: z.enum(["Dinas luar","Normal","Visit","Izin","Cuti","Sakit"]),
    tanggal: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    lokasi: z.string()
  })