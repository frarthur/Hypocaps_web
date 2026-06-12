export type Database = {
  public: {
    Tables: {
      questionnaire_responses: {
        Row: {
          id: string;
          created_at: string;
          first_name: string | null;
          age: string | null;
          email: string | null;
          concern_diabetes: string;
          diabetes_type: string | null;
          uses_resucrage: string | null;
          resucrage_food_types: string[] | null;
          resucrage_specialized: string[] | null;
          resucrage_specialized_other: string | null;
          has_resucrage_problems: string | null;
          resucrage_problems: string[] | null;
          resucrage_problems_other: string | null;
          resucrage_form_preference: string | null;
          source: string;
          should_be_reimbursed: string;
          would_try_neutral_taste: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name?: string | null;
          age?: string | null;
          email?: string | null;
          concern_diabetes: string;
          diabetes_type?: string | null;
          uses_resucrage?: string | null;
          resucrage_food_types?: string[] | null;
          resucrage_specialized?: string[] | null;
          resucrage_specialized_other?: string | null;
          has_resucrage_problems?: string | null;
          resucrage_problems?: string[] | null;
          resucrage_problems_other?: string | null;
          resucrage_form_preference?: string | null;
          source: string;
          should_be_reimbursed: string;
          would_try_neutral_taste?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string | null;
          age?: string | null;
          email?: string | null;
          concern_diabetes?: string;
          diabetes_type?: string | null;
          uses_resucrage?: string | null;
          resucrage_food_types?: string[] | null;
          resucrage_specialized?: string[] | null;
          resucrage_specialized_other?: string | null;
          has_resucrage_problems?: string | null;
          resucrage_problems?: string[] | null;
          resucrage_problems_other?: string | null;
          resucrage_form_preference?: string | null;
          source?: string;
          should_be_reimbursed?: string;
          would_try_neutral_taste?: string | null;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          message?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
