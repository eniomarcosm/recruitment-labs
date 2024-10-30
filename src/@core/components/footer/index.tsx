import React from 'react'
import { Box, Typography, Link, Grid, IconButton, Container } from '@mui/material'
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#0f263a', p: 2, position: 'relative', mt: 'auto', width: '100%', mx: 0 }}>
      {/* Vertical Bar on the left side */}

      <Box sx={{}}>
        <Container>
          <Grid container spacing={2} sx={{ width: '100%', mx: 0 }}>
            {/* Serviços Section */}
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' color='white'>
                Serviços
              </Typography>
              <Link href='#desenvolvimento' sx={{ display: 'block', mb: 1, color: '#ed6a1b' }}>
                Desenvolvimento Web
              </Link>
              <Link href='#design' sx={{ display: 'block', mb: 1, color: '#ed6a1b' }}>
                Design Gráfico
              </Link>
              <Link href='#consultoria' sx={{ display: 'block', mb: 1, color: '#ed6a1b' }}>
                Consultoria em TI
              </Link>
            </Grid>

            {/* Contact Section */}
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' color='white'>
                Contactos
              </Typography>
              <Typography color='white'>Email: contato@empresa.com</Typography>
              <Typography color='white'>Telefone: (11) 1234-5678</Typography>
              <Typography color='white'>Endereço: Rua Exemplo, 123 - Cidade, Estado</Typography>
            </Grid>

            {/* Social Media Section */}
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' color='white'>
                Redes Sociais
              </Typography>
              <IconButton href='https://www.facebook.com' target='_blank' sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton href='https://www.twitter.com' target='_blank' sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton href='https://www.linkedin.com' target='_blank' sx={{ color: 'white' }}>
                <LinkedIn />
              </IconButton>
              <IconButton href='https://www.instagram.com' target='_blank' sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
            </Grid>
          </Grid>

          {/* Logo and Copyright Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
            <img src='/images/logo.jpg' alt='Logo' style={{ height: 40 }} />
            <Typography variant='body2' color='white'>
              © {new Date().getFullYear()} Empresa. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
