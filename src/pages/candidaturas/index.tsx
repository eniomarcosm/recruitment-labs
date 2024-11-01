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
  Paper,
  Divider
} from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import Footer from '../../@core/components/footer'
import { CandidaturaData } from '../vagas/publicar'
import { collection, getDocs, query } from 'firebase/firestore'
import { firestore } from 'src/configs/firebaseConfig'
import toast from 'react-hot-toast'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'
import { SelectiveData } from 'src/types/pages/userStaff'
import { Controller, useForm } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import IconifyIcon from 'src/@core/components/icon'

const candidaturaSchema = z.object({
  area_formacao: z.string(),
  departamento: z.string()
})

export type CandidaturaData = z.infer<typeof candidaturaSchema>

const imageSlides = [
  {
    src: '/images/slider/image1.jpg',
    alt: 'Slide 1',
    title: 'Junte-se a Cornelder de Moçambique, adira já ao programa de Estágios'
  },
  {
    src: '/images/slider/image2.jpg',
    alt: 'Slide 2',
    title: 'Aproveite está oportunidade para fazer parte desta família'
  },
  { src: '/images/slider/image3.jpg', alt: 'Slide 3', title: 'Desde 1998, desenvolvendo habilidades' },
  { src: '/images/slider/image4.jpg', alt: 'Slide 4', title: 'Torne-se um profissional, candidate-se para estágio' }
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
export default function Candidaturas(props) {
  const [vagas, setVagas] = useState<CandidaturaData[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [courses, setCourse] = useState<SelectiveData[]>([])
  const [dpts, setDpts] = useState<SelectiveData[]>([])

  const {
    control,
    watch,

    formState: { errors }
  } = useForm<CandidaturaData>({
    resolver: zodResolver(candidaturaSchema)
  })

  const { area_formacao } = watch()

  useEffect(() => {
    const getData = async () => {
      try {
        const dataArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'departments'))

        querySnapshot.forEach(doc => {
          dataArray.push(doc.data() as SelectiveData)
        })
        setDpts(dataArray)
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const dataArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'courses'))

        querySnapshot.forEach(doc => {
          dataArray.push(doc.data() as SelectiveData)
        })
        setCourse(dataArray)
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.log(error)
      }
    }
    getData()
  }, [])

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

  const filterCourses = courses.filter(area => vagas.some(vaga => vaga.area_formacao === area.id))

  const filterVagas = area_formacao ? vagas.filter(vaga => vaga.area_formacao === area_formacao) : vagas

  const filterDepartamentos = dpts.filter(
    dpt => vagas.some(vaga => vaga.departmento === dpt.id) && vagas.some(vaga => vaga.area_formacao === area_formacao)
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ModalProgressBar open={isLoading} />
      <AppBar
        position='fixed'
        sx={{ borderBottom: 4, borderColor: '#ed6a1b', backgroundColor: '#0208a2', paddingY: 1 }}
      >
        <Container>
          <Toolbar>
            <Link href='/candidaturas'>
              <img src='/images/logo.jpg' alt='Logo' style={{ height: 50, marginRight: '16px' }} />
            </Link>
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
      <Box sx={{ height: '70vh', overflow: 'hidden' }}>
        <Carousel
          showArrows={true}
          autoPlay
          interval={4000}
          infiniteLoop
          stopOnHover
          swipeable
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
        >
          {imageSlides.map((slide, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
            >
              <img
                alt={slide.alt}
                src={slide.src}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'brightness(80%)'
                }}
              />
              <Typography
                variant='h3'
                sx={{
                  position: 'absolute',
                  color: '#FFF',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 8px rgba(0,0,0,0.8)'
                }}
              >
                {slide.title}
              </Typography>
            </div>
          ))}
        </Carousel>
      </Box>
      <Box sx={{ flex: 1, py: 10, backgroundColor: '#ffff' }}>
        <Container>
          <Typography variant='h4' align='center' gutterBottom>
            Inscreva-se para um Estágio!
          </Typography>
          <Typography variant='body1' align='center' sx={{ mb: 4 }}>
            Estamos sempre em busca de novos talentos para fazer parte da nossa equipe. Confira as oportunidades
            disponíveis e candidate-se!
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='area_formacao'
                control={control}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    options={filterCourses}
                    getOptionLabel={option => `${option.name}`}
                    value={filterCourses.find(option => option.id === field.value) || null}
                    onChange={(_, selectedOption) => {
                      field.onChange(selectedOption ? selectedOption.id : '')
                    }}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        label='Área de Formação'
                        error={!!errors.area_formacao}
                        helperText={errors.area_formacao?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='departmento'
                control={control}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    options={filterDepartamentos}
                    getOptionLabel={option => `${option.name}`}
                    value={filterDepartamentos.find(option => option.id === field.value) || null}
                    onChange={(_, selectedOption) => {
                      field.onChange(selectedOption ? selectedOption.id : '')
                    }}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        label='Departamento'
                        error={!!errors.departmento}
                        helperText={errors.departmento?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <CustomTextField label='Área de Formação' fullWidth select>
                <MenuItem value={1}>Área 1</MenuItem>
                <MenuItem value={2}>Área 2</MenuItem>
                <MenuItem value={3}>Área 3</MenuItem>
              </CustomTextField>
            </Grid> */}
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {filterVagas.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  variant='outlined'
                  sx={{
                    transition: '0.3s',
                    borderWidth: 3,
                    borderColor: '#ed6a1b',
                    borderRadius: 2,
                    '&:hover': { boxShadow: 20, transform: 'scale(1.05)' }
                  }}
                >
                  <CardContent>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                      {card.titulo}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {card.descricao}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconifyIcon icon='tabler:calendar' size={18} style={{ marginRight: '8px' }} />
                      Valido Até:{' '}
                      {card?.data_validade?.toDate()?.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}{' '}
                      {/* Ensure 'validoAte' is available in your card data */}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      size='small'
                      color='primary'
                      LinkComponent={Link}
                      href={`/candidaturas/${card.id}`}
                      sx={{ '&:hover': { backgroundColor: '#ed6a1b', color: '#FFF' } }}
                    >
                      Ver Detalhes
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* <Container sx={{ flex: 1, my: 10 }}>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {filterVagas.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{ transition: '0.3s', borderRadius: 2, '&:hover': { boxShadow: 15, transform: 'scale(1.05)' } }}
              >
                <CardContent>
                  <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                    {card.titulo}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {card.descricao}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconifyIcon icon='tabler:calendar' size={18} style={{ marginRight: '8px' }} />
                    Valido Até:{' '}
                    {card?.data_validade?.toDate()?.toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}{' '}
                    {/* Ensure 'validoAte' is available in your card data
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    size='small'
                    color='primary'
                    LinkComponent={Link}
                    href='/candidaturas/212122'
                    sx={{ '&:hover': { backgroundColor: '#ed6a1b', color: '#FFF' } }}
                  >
                    Ver Detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
      <Box sx={{ p: 20, pb: 5, backgroundColor: '#ed6a1b' }}></Box>
      {/* Testimonial Section */}
      <Box sx={{ p: 4, pb: 5, backgroundColor: '#f9f9f9' }}>
        <Container>
          <Typography variant='h5' align='center' gutterBottom>
            O que nossos estagiários dizem
          </Typography>
          <Grid container spacing={4}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={5}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <Typography variant='body1' sx={{ fontStyle: 'italic', mb: 2, flexGrow: 1 }}>
                    "{testimonial.text}"
                  </Typography>
                  <div>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 1 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {testimonial.position}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer /> {/* Add padding to the footer */}
    </Box>
  )
}

Candidaturas.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Candidaturas.guestGuard = true
