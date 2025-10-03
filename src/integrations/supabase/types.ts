export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      complaints: {
        Row: {
          admin_response: string | null
          assigned_to_admin: string | null
          assigned_to_worker: string | null
          complaint_type: string
          created_at: string
          description: string
          house_id: string
          id: string
          location: string | null
          priority: string
          resolution_details: string | null
          resolved_at: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          assigned_to_admin?: string | null
          assigned_to_worker?: string | null
          complaint_type?: string
          created_at?: string
          description: string
          house_id: string
          id?: string
          location?: string | null
          priority?: string
          resolution_details?: string | null
          resolved_at?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          assigned_to_admin?: string | null
          assigned_to_worker?: string | null
          complaint_type?: string
          created_at?: string
          description?: string
          house_id?: string
          id?: string
          location?: string | null
          priority?: string
          resolution_details?: string | null
          resolved_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_response: string | null
          created_at: string
          description: string
          id: string
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          description: string
          id?: string
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          description?: string
          id?: string
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          budget_allocated: number | null
          budget_utilized: number | null
          created_at: string
          created_by: string
          description: string
          end_date: string | null
          id: string
          scheme_type: string
          start_date: string | null
          status: string
          target_area: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget_allocated?: number | null
          budget_utilized?: number | null
          created_at?: string
          created_by: string
          description: string
          end_date?: string | null
          id?: string
          scheme_type?: string
          start_date?: string | null
          status?: string
          target_area?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget_allocated?: number | null
          budget_utilized?: number | null
          created_at?: string
          created_by?: string
          description?: string
          end_date?: string | null
          id?: string
          scheme_type?: string
          start_date?: string | null
          status?: string
          target_area?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          government_id: string | null
          house_id: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          government_id?: string | null
          house_id?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          government_id?: string | null
          house_id?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          area_filter: string | null
          created_at: string
          data: Json
          generated_by: string
          id: string
          period_end: string | null
          period_start: string | null
          report_type: string
          title: string
        }
        Insert: {
          area_filter?: string | null
          created_at?: string
          data: Json
          generated_by: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          report_type: string
          title: string
        }
        Update: {
          area_filter?: string | null
          created_at?: string
          data?: Json
          generated_by?: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          report_type?: string
          title?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          badge_icon: string
          badge_name: string
          created_at: string
          id: string
          points_required: number
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          badge_icon: string
          badge_name: string
          created_at?: string
          id?: string
          points_required: number
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          badge_icon?: string
          badge_name?: string
          created_at?: string
          id?: string
          points_required?: number
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      waste_monitoring: {
        Row: {
          created_at: string
          date: string
          eco_points: number | null
          general_waste: number | null
          hazardous_waste: number | null
          id: string
          organic_waste: number | null
          recyclable_waste: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          eco_points?: number | null
          general_waste?: number | null
          hazardous_waste?: number | null
          id?: string
          organic_waste?: number | null
          recyclable_waste?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          eco_points?: number | null
          general_waste?: number | null
          hazardous_waste?: number | null
          id?: string
          organic_waste?: number | null
          recyclable_waste?: number | null
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
