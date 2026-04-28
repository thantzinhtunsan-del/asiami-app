export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'stripe' | 'paypay' | 'cod';
export type UserRole = 'buyer' | 'seller' | 'admin';
export type ProductCategory = 'food_grocery' | 'snacks' | 'cultural_items' | 'restaurant' | 'fashion' | 'beauty' | 'other';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          full_name: string | null;
          language_preference: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
        Relationships: [];
      };
      community_badges: {
        Row: {
          id: string;
          name: string;
          flag_emoji: string;
          color: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_badges']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['community_badges']['Insert']>;
        Relationships: [];
      };
      seller_profiles: {
        Row: {
          id: string;
          user_id: string;
          store_name: string;
          description: string | null;
          nationality: string | null;
          community_badge_id: string | null;
          photo_url: string | null;
          banner_url: string | null;
          stripe_account_id: string | null;
          approved: boolean;
          rejection_reason: string | null;
          business_type: string;
          response_time_hours: number;
          total_sales: number;
          average_rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seller_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seller_profiles']['Insert']>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          seller_id: string;
          title: string;
          description: string | null;
          price: number;
          category: ProductCategory;
          stock: number;
          images: string[];
          active: boolean;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string;
          total: number;
          status: OrderStatus;
          payment_method: PaymentMethod;
          payment_intent_id: string | null;
          delivery_address: Json;
          tracking_number: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price_at_purchase: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string;
          product_id: string | null;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
        Relationships: [];
      };
      saved_sellers: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['saved_sellers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['saved_sellers']['Insert']>;
        Relationships: [];
      };
    };
  };
}

// Convenience types with joins
export type SellerWithBadge = Database['public']['Tables']['seller_profiles']['Row'] & {
  community_badges: Database['public']['Tables']['community_badges']['Row'] | null;
};

export type ProductWithSeller = Database['public']['Tables']['products']['Row'] & {
  seller_profiles: SellerWithBadge;
};

export type OrderWithItems = Database['public']['Tables']['orders']['Row'] & {
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    products: Database['public']['Tables']['products']['Row'];
  })[];
};
