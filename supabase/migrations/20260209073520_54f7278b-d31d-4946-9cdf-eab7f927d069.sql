-- Function to list all users with roles (admin only)
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
      p.created_at,
      p.updated_at,
      COALESCE(
        (SELECT json_agg(ur.role) FROM public.user_roles ur WHERE ur.user_id = p.user_id),
        '[]'::json
      ) as roles
    FROM public.profiles p
    ORDER BY p.created_at DESC
  ) t;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- Function to assign a role (admin only)
CREATE OR REPLACE FUNCTION public.admin_assign_role(_target_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  -- Prevent self-demotion for admin role
  IF _target_user_id = auth.uid() AND _role != 'admin' THEN
    RAISE EXCEPTION 'Cannot change your own admin role';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_target_user_id, _role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

-- Function to remove a role (admin only)
CREATE OR REPLACE FUNCTION public.admin_remove_role(_target_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  -- Prevent removing own admin role
  IF _target_user_id = auth.uid() AND _role = 'admin' THEN
    RAISE EXCEPTION 'Cannot remove your own admin role';
  END IF;

  DELETE FROM public.user_roles
  WHERE user_id = _target_user_id AND role = _role;

  RETURN true;
END;
$$;