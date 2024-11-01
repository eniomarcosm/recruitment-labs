import React from 'react'
import { Box, Typography, Link, Grid, IconButton, Container } from '@mui/material'
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#003366', color: 'white', py: 4, mt: 'auto', width: '100%' }}>
      <Container>
        <Grid container spacing={4} sx={{ width: '100%', mx: 0 }}>
          {/* Serviços Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' color='white' sx={{ mb: 1, fontWeight: 'bold' }}>
              Nossos Serviços
            </Typography>
            <Link href='#desenvolvimento' sx={{ display: 'block', mb: 1, color: '#d40000', textDecoration: 'none' }}>
              Desenvolvimento de Infraestrutura
            </Link>
            <Link href='#logistica' sx={{ display: 'block', mb: 1, color: '#d40000', textDecoration: 'none' }}>
              Logística e Transporte
            </Link>
            <Link href='#consultoria' sx={{ display: 'block', mb: 1, color: '#d40000', textDecoration: 'none' }}>
              Consultoria em Operações Portuárias
            </Link>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' color='white' sx={{ mb: 1, fontWeight: 'bold' }}>
              Contato
            </Typography>
            <Typography color='white'>Email: contato@cornelder.co.mz</Typography>
            <Typography color='white'>Telefone: +258 21 123 456</Typography>
            <Typography color='white'>Endereço: Porto da Beira, Beira - Moçambique</Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' color='white' sx={{ mb: 1, fontWeight: 'bold' }}>
              Redes Sociais
            </Typography>
            <IconButton href='https://www.facebook.com' target='_blank' sx={{ color: '#d40000' }}>
              <Facebook />
            </IconButton>
            <IconButton href='https://www.twitter.com' target='_blank' sx={{ color: '#d40000' }}>
              <Twitter />
            </IconButton>
            <IconButton href='https://www.linkedin.com' target='_blank' sx={{ color: '#d40000' }}>
              <LinkedIn />
            </IconButton>
            <IconButton href='https://www.instagram.com' target='_blank' sx={{ color: '#d40000' }}>
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>

        {/* Logo and Copyright Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, paddingRight: 4 }}>
          <img src='/images/logo.jpg' alt='Cornelder Logo' style={{ height: 40 }} />
          <Typography variant='body2' color='white'>
            © {new Date().getFullYear()} Cornelder de Moçambique. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
