import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Link from 'src/@core/theme/overrides/link'

export default function StackAppBar() {
  return (
    <AppBar position='fixed' sx={{ borderBottom: 4, borderColor: '#ed6a1b', backgroundColor: '#0208a2', paddingY: 1 }}>
      <Container>
        <Toolbar>
          <img src='/images/logo.jpg' alt='Logo' style={{ height: 50, marginRight: '16px' }} />
          <Typography variant='h6' sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FFF' }}></Typography>
          <Link href='#sobre' color='inherit' sx={{ mr: 4, fontSize: '1rem', '&:hover': { color: '#ffdd57' } }}>
            Sobre
          </Link>
          <Link href='#contacto' color='inherit' sx={{ mr: 4, fontSize: '1rem', '&:hover': { color: '#ffdd57' } }}>
            Contato
          </Link>
          <Button
            LinkComponent={Link}
            href='/login'
            variant='outlined'
            color='inherit'
            sx={{ borderColor: '#ed6a1b', '&:hover': { backgroundColor: '#ed6a1b', color: '#FFF' } }}
          >
            Entrar
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
