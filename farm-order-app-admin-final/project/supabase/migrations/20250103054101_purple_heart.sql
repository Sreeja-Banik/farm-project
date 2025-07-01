/*
  # Initial Schema for Farm Equipment Rental System

  1. New Tables
    - `equipment`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `daily_rate` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `status` (enum: available, rented, maintenance)
      - `created_at` (timestamp)
    
    - `rentals`
      - `id` (uuid, primary key)
      - `equipment_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (enum: pending, approved, rejected, completed)
      - `total_amount` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create equipment table
CREATE TABLE equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  daily_rate numeric NOT NULL CHECK (daily_rate > 0),
  image_url text,
  category text NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'rented', 'maintenance')),
  created_at timestamptz DEFAULT now()
);

-- Create rentals table
CREATE TABLE rentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id uuid REFERENCES equipment(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now(),
  CHECK (end_date >= start_date)
);

-- Enable RLS
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin full access to equipment"
  ON equipment
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to rentals"
  ON rentals
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');