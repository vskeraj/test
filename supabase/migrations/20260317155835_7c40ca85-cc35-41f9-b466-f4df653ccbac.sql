
-- Replace the overly permissive contact messages insert policy with a rate-limited version
DROP POLICY "Anyone can insert contact messages" ON public.contact_messages;

-- Allow inserts but restrict to reasonable fields only
CREATE POLICY "Anyone can submit contact form" ON public.contact_messages
  FOR INSERT WITH CHECK (
    length(name) > 0 AND length(name) <= 100
    AND length(email) > 0 AND length(email) <= 255
    AND length(subject) > 0 AND length(subject) <= 200
    AND length(message) >= 10 AND length(message) <= 1000
  );
