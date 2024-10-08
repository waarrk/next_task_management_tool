export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      notes: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
        Relationships: []
      }
      operation: {
        Row: {
          commands: Json | null
          create_user_id: string | null
          created_at: string
          id: number
          operators: Json | null
          results: Json | null
          satellite_schedule_id: string | null
          status: string | null
          update_at: string | null
        }
        Insert: {
          commands?: Json | null
          create_user_id?: string | null
          created_at?: string
          id?: number
          operators?: Json | null
          results?: Json | null
          satellite_schedule_id?: string | null
          status?: string | null
          update_at?: string | null
        }
        Update: {
          commands?: Json | null
          create_user_id?: string | null
          created_at?: string
          id?: number
          operators?: Json | null
          results?: Json | null
          satellite_schedule_id?: string | null
          status?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operation_create_user_id_fkey"
            columns: ["create_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operation_satellite_schedule_id_fkey"
            columns: ["satellite_schedule_id"]
            isOneToOne: false
            referencedRelation: "satellite_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      parsed_tle: {
        Row: {
          b_star_drag_term: number | null
          classification: string | null
          created_at: string
          eccentricity: number | null
          element_set_number: number | null
          ephemeris_type: number | null
          epoch_day: number | null
          epoch_year: number | null
          id: number
          inclination: number | null
          launch_number: number | null
          launch_piece: string | null
          launch_year: number | null
          mean_anomaly: number | null
          mean_motion: number | null
          mean_motion_first_derivative: number | null
          mean_motion_second_derivative: number | null
          name: string | null
          perigee_argument: number | null
          revolution_number: number | null
          right_ascension: number | null
          satellite_id: string | null
        }
        Insert: {
          b_star_drag_term?: number | null
          classification?: string | null
          created_at?: string
          eccentricity?: number | null
          element_set_number?: number | null
          ephemeris_type?: number | null
          epoch_day?: number | null
          epoch_year?: number | null
          id?: number
          inclination?: number | null
          launch_number?: number | null
          launch_piece?: string | null
          launch_year?: number | null
          mean_anomaly?: number | null
          mean_motion?: number | null
          mean_motion_first_derivative?: number | null
          mean_motion_second_derivative?: number | null
          name?: string | null
          perigee_argument?: number | null
          revolution_number?: number | null
          right_ascension?: number | null
          satellite_id?: string | null
        }
        Update: {
          b_star_drag_term?: number | null
          classification?: string | null
          created_at?: string
          eccentricity?: number | null
          element_set_number?: number | null
          ephemeris_type?: number | null
          epoch_day?: number | null
          epoch_year?: number | null
          id?: number
          inclination?: number | null
          launch_number?: number | null
          launch_piece?: string | null
          launch_year?: number | null
          mean_anomaly?: number | null
          mean_motion?: number | null
          mean_motion_first_derivative?: number | null
          mean_motion_second_derivative?: number | null
          name?: string | null
          perigee_argument?: number | null
          revolution_number?: number | null
          right_ascension?: number | null
          satellite_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parsed_tle_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "tle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parsed_tle_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "satellite_list"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "parsed_tle_satellite_id_fkey"
            columns: ["satellite_id"]
            isOneToOne: false
            referencedRelation: "satellite_list"
            referencedColumns: ["id"]
          },
        ]
      }
      satellite_list: {
        Row: {
          created_at: string
          id: string
          last_updated: string | null
          name: string
          norad_id: number | null
          status: string | null
          tle_fetch_on: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated?: string | null
          name: string
          norad_id?: number | null
          status?: string | null
          tle_fetch_on?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          last_updated?: string | null
          name?: string
          norad_id?: number | null
          status?: string | null
          tle_fetch_on?: boolean | null
        }
        Relationships: []
      }
      satellite_schedule: {
        Row: {
          azimuth_end: number | null
          azimuth_start: number | null
          country: Json | null
          created_at: string
          id: string
          max_elevation: number | null
          name: string | null
          operation: string | null
          pass_end_time: string | null
          pass_start_time: string | null
          satellite_id: string | null
          tle_id: number | null
          tle_updated_at: string | null
          updates_count: number | null
        }
        Insert: {
          azimuth_end?: number | null
          azimuth_start?: number | null
          country?: Json | null
          created_at?: string
          id?: string
          max_elevation?: number | null
          name?: string | null
          operation?: string | null
          pass_end_time?: string | null
          pass_start_time?: string | null
          satellite_id?: string | null
          tle_id?: number | null
          tle_updated_at?: string | null
          updates_count?: number | null
        }
        Update: {
          azimuth_end?: number | null
          azimuth_start?: number | null
          country?: Json | null
          created_at?: string
          id?: string
          max_elevation?: number | null
          name?: string | null
          operation?: string | null
          pass_end_time?: string | null
          pass_start_time?: string | null
          satellite_id?: string | null
          tle_id?: number | null
          tle_updated_at?: string | null
          updates_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "satellite_schedule_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "satellite_list"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "satellite_schedule_satellite_id_fkey"
            columns: ["satellite_id"]
            isOneToOne: false
            referencedRelation: "satellite_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satellite_schedule_tle_id_fkey"
            columns: ["tle_id"]
            isOneToOne: false
            referencedRelation: "tle"
            referencedColumns: ["id"]
          },
        ]
      }
      tle: {
        Row: {
          content: string | null
          created_at: string
          id: number
          name: string | null
          norad_id: number | null
          satellite_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          name?: string | null
          norad_id?: number | null
          satellite_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          name?: string | null
          norad_id?: number | null
          satellite_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tle_satellite_id_fkey"
            columns: ["satellite_id"]
            isOneToOne: false
            referencedRelation: "satellite_list"
            referencedColumns: ["id"]
          },
        ]
      }
      user_details: {
        Row: {
          auth_id: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          unit_no: number | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          unit_no?: number | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          unit_no?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_details_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

