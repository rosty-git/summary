import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

import { Container } from '@nextui-org/react';


export default function LoginPage() {
  const supabaseClient = useSupabaseClient()

  const user = useUser()
  const router = useRouter();

  if (user) router.push("/")

  return (
    <Container xs>
      <Auth
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={[]}
        socialLayout="vertical"
        dark={false}
      />
    </Container>
  )
}
