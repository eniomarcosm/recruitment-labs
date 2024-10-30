import React, { ReactNode, useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link,
  Box,
  MenuItem,
  Paper
} from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import Footer from '../../@core/components/footer'
import { CandidaturaData } from '../vagas/publicar'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from 'src/configs/firebaseConfig'
import toast from 'react-hot-toast'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'

const imageSlides = [
  { src: '/images/slider/image1.jpg', alt: 'Slide 1' },
  { src: '/images/slider/image2.jpg', alt: 'Slide 2' },
  { src: '/images/slider/image3.jpg', alt: 'Slide 3' }
]

const testimonials = [
  {
    name: 'Maria Silva',
    position: 'Estagiária de Desenvolvimento',
    text: 'O estágio aqui foi uma experiência incrível! Aprendi muito e fiz amigos para a vida toda.'
  },
  {
    name: 'João Pereira',
    position: 'Estagiário de Design',
    text: 'A equipe é super acolhedora e sempre disposta a ajudar. Recomendo a todos!'
  },
  {
    name: 'Ana Costa',
    position: 'Estagiária de Marketing',
    text: 'Tive a chance de trabalhar em projetos reais e o suporte da equipe foi fundamental para meu crescimento.'
  },
  {
    name: 'Lucas Mendes',
    position: 'Estagiário de TI',
    text: 'Um ambiente de aprendizado incrível, onde pude aplicar meus conhecimentos e aprender mais.'
  },
  {
    name: 'Carla Souza',
    position: 'Estagiária de Vendas',
    text: 'Foi uma jornada enriquecedora, com oportunidades de desenvolvimento profissional e pessoal.'
  }
]
export default function Candidaturas() {
  const [vagas, setVagas] = useState<CandidaturaData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const vagasArray: CandidaturaData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'vagas'))
        querySnapshot.forEach(doc => {
          vagasArray.push(doc.data() as CandidaturaData)
        })
        setVagas(vagasArray)
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.log(error)
      }
      setIsLoading(false)
    }
    getData()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ModalProgressBar open={isLoading} />
      <AppBar position='sticky' sx={{ backgroundColor: '#0208a2' }}>
        <Container>
          <Toolbar>
            <img src='/images/logo.jpg' alt='Logo' style={{ height: 40, marginRight: '16px' }} />
            <Typography variant='h6' sx={{ flexGrow: 1 }} />
            <Link href='#sobre' color='inherit' sx={{ mr: 4 }}>
              Sobre
            </Link>
            <Link href='#contacto' color='inherit' sx={{ mr: 4 }}>
              Contactos
            </Link>
            <Button LinkComponent={Link} href='/login' variant='outlined' color='inherit'>
              Entrar
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ mb: 4, height: '40vh', overflow: 'hidden' }}>
        <Carousel
          showArrows={true}
          autoPlay
          interval={3000}
          infiniteLoop
          stopOnHover
          swipeable
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows={true}
          className='carousel'
        >
          {imageSlides.map((slide, index) => (
            <div
              key={index}
              className='slide'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <img
                alt={slide.alt}
                src={slide.src}
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
      <Container sx={{ flex: 1, my: 10 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Inscreva-se para um Estágio!
        </Typography>
        <Typography variant='body1' align='center' sx={{ mb: 4 }}>
          Estamos sempre em busca de novos talentos para fazer parte da nossa equipe. Confira as oportunidades
          disponíveis e candidate-se!
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <CustomTextField label='Área de Formação' fullWidth select>
              <MenuItem value={1}>Área 1</MenuItem>
              <MenuItem value={2}>Área 2</MenuItem>
              <MenuItem value={3}>Área 3</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField label='Área de Formação' fullWidth select>
              <MenuItem value={1}>Área 1</MenuItem>
              <MenuItem value={2}>Área 2</MenuItem>
              <MenuItem value={3}>Área 3</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField label='Área de Formação' fullWidth select>
              <MenuItem value={1}>Área 1</MenuItem>
              <MenuItem value={2}>Área 2</MenuItem>
              <MenuItem value={3}>Área 3</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {vagas.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ transition: '0.3s', '&:hover': { boxShadow: 20 } }}>
                <CardContent>
                  <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                    {card.titulo}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {card.descricao}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    Aplicar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Testimonial Section */}
      <Box sx={{ mt: 8, p: 4, pb: 5, backgroundColor: '#f4f4f4' }}>
        <Container>
          <Typography variant='h5' align='center' gutterBottom>
            O que nossos estagiários dizem
          </Typography>
          <Carousel
            autoPlay
            interval={5000}
            infiniteLoop
            stopOnHover
            showThumbs={false}
            showStatus={false}
            emulateTouch
          >
            {testimonials.map((testimonial, index) => (
              <Grid container spacing={4} key={index}>
                {[...Array(3)].map((_, idx) => {
                  const testimonialIndex = index + idx

                  return testimonialIndex < testimonials.length ? (
                    <Grid item xs={12} sm={4} key={testimonialIndex}>
                      <Paper
                        elevation={5}
                        sx={{
                          p: 4,
                          borderRadius: 2,
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: '100%', // Ensure all cards have the same height
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      >
                        <Typography variant='body1' sx={{ fontStyle: 'italic', mb: 2, flexGrow: 1 }}>
                          "{testimonials[testimonialIndex].text}"
                        </Typography>
                        <div>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 1 }}>
                            {testimonials[testimonialIndex].name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {testimonials[testimonialIndex].position}
                          </Typography>
                        </div>
                      </Paper>
                    </Grid>
                  ) : null
                })}
              </Grid>
            ))}
          </Carousel>
        </Container>
      </Box>
      <Footer /> {/* Add padding to the footer */}
    </Box>
  )
}

Candidaturas.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Candidaturas.guestGuard = true
