alter table "public"."tle" drop constraint "tle_satellite_id_fkey";

create table "public"."parsed_tle" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "satellite_id" uuid,
    "norad_id" bigint,
    "name" text,
    "classification" text,
    "launch_year" bigint,
    "launch_number" bigint,
    "launch_piece" text,
    "epoch_year" bigint,
    "epoch_day" double precision,
    "mean_motion_first_derivative" double precision,
    "b_star_drag_term" bigint,
    "ephemeris_type" bigint,
    "element_set_number" bigint,
    "inclination" double precision,
    "right_ascension" double precision,
    "eccentricity" double precision,
    "perigee_argument" double precision,
    "mean_anomaly" double precision,
    "mean_motion" double precision,
    "revolution_number" bigint
);


CREATE UNIQUE INDEX parsed_tle_id_key ON public.parsed_tle USING btree (id);

CREATE UNIQUE INDEX parsed_tle_pkey ON public.parsed_tle USING btree (id);

CREATE UNIQUE INDEX tle_id_key ON public.tle USING btree (id);

alter table "public"."parsed_tle" add constraint "parsed_tle_pkey" PRIMARY KEY using index "parsed_tle_pkey";

alter table "public"."parsed_tle" add constraint "parsed_tle_id_fkey" FOREIGN KEY (id) REFERENCES tle(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."parsed_tle" validate constraint "parsed_tle_id_fkey";

alter table "public"."parsed_tle" add constraint "parsed_tle_id_key" UNIQUE using index "parsed_tle_id_key";

alter table "public"."tle" add constraint "tle_id_key" UNIQUE using index "tle_id_key";

alter table "public"."tle" add constraint "tle_satellite_id_fkey" FOREIGN KEY (satellite_id) REFERENCES satellite_list(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."tle" validate constraint "tle_satellite_id_fkey";

grant delete on table "public"."parsed_tle" to "anon";

grant insert on table "public"."parsed_tle" to "anon";

grant references on table "public"."parsed_tle" to "anon";

grant select on table "public"."parsed_tle" to "anon";

grant trigger on table "public"."parsed_tle" to "anon";

grant truncate on table "public"."parsed_tle" to "anon";

grant update on table "public"."parsed_tle" to "anon";

grant delete on table "public"."parsed_tle" to "authenticated";

grant insert on table "public"."parsed_tle" to "authenticated";

grant references on table "public"."parsed_tle" to "authenticated";

grant select on table "public"."parsed_tle" to "authenticated";

grant trigger on table "public"."parsed_tle" to "authenticated";

grant truncate on table "public"."parsed_tle" to "authenticated";

grant update on table "public"."parsed_tle" to "authenticated";

grant delete on table "public"."parsed_tle" to "service_role";

grant insert on table "public"."parsed_tle" to "service_role";

grant references on table "public"."parsed_tle" to "service_role";

grant select on table "public"."parsed_tle" to "service_role";

grant trigger on table "public"."parsed_tle" to "service_role";

grant truncate on table "public"."parsed_tle" to "service_role";

grant update on table "public"."parsed_tle" to "service_role";

