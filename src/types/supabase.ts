export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      players: {
        Row: {
          created_at: string;
          id: string;
          is_online: boolean;
          last_activity: string;
          nickname: string;
          session_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_online?: boolean;
          last_activity?: string;
          nickname: string;
          session_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_online?: boolean;
          last_activity?: string;
          nickname?: string;
          session_id?: string;
        };
        Relationships: [];
      };
      room_messages: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          player_id: string;
          room_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          player_id: string;
          room_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          player_id?: string;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'room_messages_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'room_messages_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
      room_participants: {
        Row: {
          id: string;
          is_room_chief: boolean;
          joined_at: string;
          player_id: string;
          room_code: string;
          turn_order: number;
          nickname: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          is_room_chief?: boolean;
          joined_at?: string;
          player_id: string;
          room_code: string;
          turn_order?: number;
          nickname?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          is_room_chief?: boolean;
          joined_at?: string;
          player_id?: string;
          room_code?: string;
          turn_order?: number;
          nickname?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'room_participants_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'room_participants_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          current_player_id: string | null;
          current_word: string[] | null;
          host_player_id: string;
          id: string;
          max_players: number;
          room_code: string;
          room_name: string;
          participants: Participants[];
          status: 'playing' | 'waiting' | 'full';
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          current_player_id?: string | null;
          current_word?: string[] | null;
          host_player_id: string;
          id?: string;
          max_players?: number;
          room_code: string;
          room_name: string;
          participants: Participants[];
          status?: 'playing' | 'waiting' | 'full';
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          current_player_id?: string | null;
          current_word?: string[] | null;
          host_player_id?: string;
          id?: string;
          max_players?: number;
          room_code?: string;
          room_name?: string;
          participants: Participants[];
          status?: 'playing' | 'waiting' | 'full';
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rooms_current_player_id_fkey';
            columns: ['current_player_id'];
            isOneToOne: false;
            referencedRelation: 'players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'rooms_host_player_id_fkey';
            columns: ['host_player_id'];
            isOneToOne: false;
            referencedRelation: 'players';
            referencedColumns: ['id'];
          },
        ];
      };
      word_history: {
        Row: {
          created_at: string;
          id: string;
          is_valid: boolean;
          player_id: string;
          room_id: string;
          round: number;
          word: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_valid?: boolean;
          player_id: string;
          room_id: string;
          round: number;
          word: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_valid?: boolean;
          player_id?: string;
          room_id?: string;
          round?: number;
          word?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'word_history_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'word_history_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_session_owner: {
        Args: { session_id: string };
        Returns: boolean;
      };
      join_room_atomic: {
        Args: {
          p_room_code: string;
          p_player_id: string;
        };
        Returns: {
          success: boolean;
          message: string;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export type Player = Database['public']['Tables']['players']['Row'];
export type Room = Database['public']['Tables']['rooms']['Row'];
export type InsertRoom = Database['public']['Tables']['rooms']['Insert'];
export type RoomParticipant = Database['public']['Tables']['room_participants']['Row'];
export type Participants = { nickname: string; id: string };
