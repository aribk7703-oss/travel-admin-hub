-- Update admin_list_users to include email from auth.users
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Verify caller is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  SELECT json_agg(row_to_json(t))
  INTO result
  FROM (
    SELECT 
      p.user_id as id,
      p.display_name,
      au.email,
      p.created_at,
      p.updated_at,
      au.last_sign_in_at,
      COALESCE(
        (SELECT json_agg(ur.role) FROM public.user_roles ur WHERE ur.user_id = p.user_id),
        '[]'::json
      ) as roles
    FROM public.profiles p
    JOIN auth.users au ON au.id = p.user_id
    ORDER BY p.created_at DESC
  ) t;

  RETURN COALESCE(result, '[]'::json);
END;
$$;