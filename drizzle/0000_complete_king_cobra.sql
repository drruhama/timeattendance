CREATE TABLE IF NOT EXISTS "attendance" (
	"id" text PRIMARY KEY NOT NULL,
	"employed_id" text NOT NULL,
	"jenis_hadir" text,
	"tanggal" text NOT NULL,
	"start_time" time,
	"end_time" time,
	"lokasi" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"hashed_password" text NOT NULL,
	"full_name" text NOT NULL,
	"homebase" text,
	"office" text,
	"keterangan" text,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employed_id_user_id_fk" FOREIGN KEY ("employed_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
 ALTER COLUMN "start_time" SET DATA TYPE times without time zone USING ("start_time"::time with time zone)
ALTER COLUMN "end_time" SET DATA TYPE times without time zone USING ("end_time"::time with time zone)
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
