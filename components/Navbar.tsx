import { Navbar as NavbarNextUI, Button } from '@nextui-org/react'

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'


export default function Navbar() {
    
    const supabase = useSupabaseClient()

    const user = useUser()
    
    return (
        <NavbarNextUI>
          <NavbarNextUI.Brand>Summary</NavbarNextUI.Brand>
          <NavbarNextUI.Content></NavbarNextUI.Content>
          <NavbarNextUI.Content>
            {user ? (
                <Button flat onPress={() => {supabase.auth.signOut()}}>Logout</Button>        
            ) : <Button as={NavbarNextUI.Link} flat href="/auth">Login</Button>}
        </NavbarNextUI.Content>
        </NavbarNextUI>
    )
}