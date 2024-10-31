import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Toolbar,
  Typography,
  Grid,
  Paper,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material'
import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import Footer from 'src/@core/components/footer'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'
import { firestore, storage } from 'src/configs/firebaseConfig'
import toast from 'react-hot-toast'
import { CandidaturaData, niveis } from '../vagas/publicar'
import { SelectiveData } from 'src/types/pages/generalData'
import DatePicker from 'react-datepicker'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { genders, idTypes } from 'src/constants/user'
import IconifyIcon from 'src/@core/components/icon'
import { CustomInputPicker } from 'src/components/forms/DatePickerHelpers'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { ButtonStyled, ImgStyled, ResetButtonStyled } from '../colaborador/cadastrar'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const candidaturaSchema = z.object({
  id: z.string().optional(),
  nomeCompleto: z.string(),
  genero: z.string(),
  documentoIdentificacao: z.string(),
  numeroIdentificacao: z.string(),
  nuit: z.string(),
  dataNascimento: z.date().nullable(), // For date field, can also use `string()` with formatting in form handler.
  documento: z.any(), // For uploaded document field
  email: z.string(),
  telefone: z.string(),
  telefone2: z.string().optional(), // Optional secondary contact
  instituicaoEnsino: z.string(),
  curso: z.string(),
  grauAcademico: z.string(),
  certificadoDeNotas: z.any(), // For uploaded grades certificate
  curriculo: z.any(), // For uploaded resume
  documentoAsset: z.any()
})

export type CandidatoData = z.infer<typeof candidaturaSchema>

export default function DescricaoCandidatura() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedVaga, setSelectedVaga] = useState<CandidaturaData | null>(null)
  const [dpts, setDpts] = useState<SelectiveData[]>([])
  const router = useRouter()
  const [courses, setCourse] = useState<SelectiveData[]>([])
  const [vagas, setVagas] = useState<CandidaturaData[]>([])

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<CandidatoData>({
    resolver: zodResolver(candidaturaSchema)
  })

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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const dataArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'departments'))
        querySnapshot.forEach(doc => {
          dataArray.push(doc.data() as SelectiveData)
        })
        setDpts(dataArray)
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.error(error)
      }
    }
    fetchDepartments()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const dataArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'courses'))
        querySnapshot.forEach(doc => {
          dataArray.push(doc.data() as SelectiveData)
        })
        setCourse(dataArray)
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.error(error)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchVagaDetails = async () => {
      try {
        setIsLoading(true)
        if (router.query.id) {
          const vagaRef = doc(collection(firestore, 'vagas'), router.query.id as string)
          const vagaSnap = await getDoc(vagaRef)
          if (vagaSnap.exists()) {
            setSelectedVaga(vagaSnap.data() as CandidaturaData)
          } else {
            toast.error('Solicitação não encontrada!')
          }
        }
      } catch (error) {
        toast.error('Erro ao solicitar dados!')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVagaDetails()
  }, [router.query.id])

  // const handleApply = () => {
  //   router.push(`/apply/${router.query.id}`)
  // }

  const filterCourses = courses.filter(area => vagas.some(vaga => vaga.area_formacao === area.id))

  // ** Image Uploader

  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/documento-erro.png')
  const [imgSrcDoc, setImgSrcDoc] = useState<string>('/images/avatars/documento-erro.png')
  const [imgSrcCV, setImgSrcCV] = useState<string>('/images/avatars/documento-erro.png')

  const [inputValue, setInputValue] = useState<string>('')
  const [inputValueDoc, setInputValueDoc] = useState<string>('')
  const [inputValueCv, setInputValueCv] = useState<string>('')

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const selectedFile = files[0]

      reader.onload = () => {
        if (selectedFile.type.toLowerCase() === 'application/pdf') {
          setImgSrc('/images/avatars/documento.png')
        } else {
          setImgSrc(reader.result as string)
        }
      }
      reader.readAsDataURL(files[0])
      setValue('certificadoDeNotas', files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageChangeDocument = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const selectedFile = files[0]

      reader.onload = () => {
        if (selectedFile.type.toLowerCase() === 'application/pdf') {
          setImgSrcDoc('/images/avatars/documento.png')
        } else {
          setImgSrcDoc(reader.result as string)
        }
      }
      reader.readAsDataURL(files[0])
      setValue('documentoAsset', files[0])

      if (reader.result !== null) {
        setInputValueDoc(reader.result as string)
      }
    }
  }
  const handleInputImageChangeCurriculo = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const selectedFile = files[0]

      reader.onload = () => {
        if (selectedFile.type.toLowerCase() === 'application/pdf') {
          setImgSrcCV('/images/avatars/documento.png')
        } else {
          setImgSrcCV(reader.result as string)
        }
      }
      reader.readAsDataURL(files[0])
      setValue('curriculo', files[0])

      if (reader.result !== null) {
        setInputValueCv(reader.result as string)
      }
    }
  }

  const handleInputImageResetCurriculo = () => {
    setInputValue('')
    setValue('curriculo', '')
    setImgSrc('/images/avatars/documento-erro.png')
  }

  const handleInputImageResetDocumento = () => {
    setInputValueDoc('')
    setValue('documentoAsset', '')
    setImgSrc('/images/avatars/documento-erro.png')
  }
  const handleInputImageReset = () => {
    setInputValueCv('')
    setValue('certificadoDeNotas', '')
    setImgSrc('/images/avatars/documento-erro.png')
  }

  function generateRandomString(length = 5): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters[randomIndex]
    }

    return randomString
  }

  // Usage

  const onSubmit = async (values: FieldValues) => {
    const cert = values?.certificadoDeNotas
    const ID = values?.documentoAsset
    const curriculo = values?.curriculo
    const randomString = generateRandomString()

    try {
      setIsLoading(true)

      // Create references to the storage locations
      const storageRefCert = ref(storage, `documents/${randomString}/${cert.name}`)
      const storageRefID = ref(storage, `documents/${randomString}/${ID.name}`)
      const storageRefCurr = ref(storage, `documents/${randomString}/${curriculo.name}`)

      // Define the upload tasks
      const uploadTaskCert = uploadBytesResumable(storageRefCert, cert)
      const uploadTaskID = uploadBytesResumable(storageRefID, ID)
      const uploadTaskCurr = uploadBytesResumable(storageRefCurr, curriculo)

      // Track upload progress and errors
      const handleProgress = (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is', progress, '% done')
      }

      const handleError = (error: any) => {
        console.log(error)
        toast.error('Erro ao carregar ficheiro!')
        setIsLoading(false)
      }

      // Wait for all uploads to complete
      await Promise.all([
        new Promise<void>(resolve => {
          uploadTaskCert.on('state_changed', handleProgress, handleError, () => resolve())
        }),
        new Promise<void>(resolve => {
          uploadTaskID.on('state_changed', handleProgress, handleError, () => resolve())
        }),
        new Promise<void>(resolve => {
          uploadTaskCurr.on('state_changed', handleProgress, handleError, () => resolve())
        })
      ])

      // Get download URLs
      const downloadURLCert = await getDownloadURL(storageRefCert)
      const downloadURLID = await getDownloadURL(storageRefID)
      const downloadURLCurr = await getDownloadURL(storageRefCurr)

      // Save the document in Firestore
      const newRef = doc(collection(firestore, 'absence_justification'))
      await setDoc(newRef, {
        ...values,
        id: newRef.id,
        codicoCandidatura: randomString,
        idVaga: router?.query.id,
        certificado: downloadURLCert,
        identificacao: downloadURLID,
        curriculo: downloadURLCurr,
        createdAt: new Date()
      })

      toast.success('Dados carregados com sucesso!')
      setIsLoading(false)
      reset()
      router.push('/faltas/historico')
    } catch (error) {
      toast.error('Erro ao submeter candidatura')
      console.error(error)
      setIsLoading(false)
    }

    // } else {
    //   toast.error('Ficheiros inválidos')
    // }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
      <ModalProgressBar open={isLoading} />
      <Box sx={{ marginTop: 30, mb: 10 }}>
        <Container>
          <Card>
            <CardHeader title='Descrições da Vaga' sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }} />
            <Divider />
            <CardContent>
              {selectedVaga ? (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='h5' fontWeight='bold'>
                      {selectedVaga.titulo}
                    </Typography>
                    <Typography variant='body1' color='text.secondary' sx={{ marginTop: 1 }}>
                      {selectedVaga.descricao}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Idade Mínima:
                      </Typography>
                      <Typography>{selectedVaga.idade_min}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Idade Máxima:
                      </Typography>
                      <Typography>{selectedVaga.idade_max}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Data de Validade:
                      </Typography>
                      <Typography>
                        {selectedVaga.data_validade?.toDate().toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Departamento:
                      </Typography>
                      <Typography>{dpts.find(dpt => dpt.id === selectedVaga.departmento)?.name}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Área de Formação:
                      </Typography>
                      <Typography>{courses.find(cour => cour.id === selectedVaga.area_formacao)?.name}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Nível:
                      </Typography>
                      <Typography>{selectedVaga.nivel}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Anos de Experiência:
                      </Typography>
                      <Typography>{selectedVaga.anos_experieriencia}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Nacionalidade:
                      </Typography>
                      <Typography>{selectedVaga.nacionalidade}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        Línguas Exigidas:
                      </Typography>
                      <Typography>{JSON.stringify(selectedVaga.linguas_exigidas)}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                <Typography>Selecione uma vaga para ver os detalhes.</Typography>
              )}
            </CardContent>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  {/* Section: Personal Information */}
                  <Grid item xs={12}>
                    <Divider>Dados Pessoais</Divider>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='nomeCompleto'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Nome Completo'
                          required
                          fullWidth
                          error={!!errors.nomeCompleto}
                          placeholder={errors.nomeCompleto?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='genero'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Sexo'
                          fullWidth
                          required
                          select
                          {...field}
                          error={!!errors.genero}
                          placeholder={errors.genero?.message}
                        >
                          {genders.map(gender => (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='documentoIdentificacao'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Tipo de Identificação'
                          fullWidth
                          required
                          select
                          {...field}
                          error={!!errors.documentoIdentificacao}
                          placeholder={errors.documentoIdentificacao?.message}
                        >
                          {idTypes.map(idType => (
                            <MenuItem key={idType} value={idType}>
                              {idType}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='numeroIdentificacao'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Número do Documento'
                          required
                          fullWidth
                          error={!!errors.numeroIdentificacao}
                          placeholder={errors.numeroIdentificacao?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='nuit'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='NUIT'
                          required
                          fullWidth
                          error={!!errors.nuit}
                          placeholder={errors.nuit?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='dataNascimento'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          locale='ptBR'
                          selected={value}
                          showYearDropdown
                          showMonthDropdown
                          dateFormat='dd/MM/yyyy'
                          onChange={e => onChange(e)}
                          placeholderText='DD/MM/AAAA'
                          customInput={
                            <CustomInputPicker
                              label='Data de Nascimento'
                              error={!!errors.dataNascimento}
                              {...(errors.dataNascimento && { helperText: 'Este campo é obrigatório' })}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <IconButton>
                                      <IconifyIcon icon={'tabler:calendar'} />
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {/* Section: Document Upload */}
                    <CardContent sx={{ pt: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ImgStyled src={imgSrcDoc} alt='Anexo do Documento' />
                        <div>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                            Documento
                            <input
                              hidden
                              type='file'
                              value={inputValueDoc}
                              accept='image/png, image/jpeg, image/jpg'
                              onChange={handleInputImageChangeDocument}
                              id='account-settings-upload-image'
                            />
                          </ButtonStyled>
                          <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageResetDocumento}>
                            Limpar
                          </ResetButtonStyled>
                          <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                            Formatos permitidos PNG, JPG e JPEG. Tamanho Máximo de 8MB
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </Grid>

                  {/* Section: Contact Information */}
                  <Grid item xs={12}>
                    <Divider>Informações de Contacto</Divider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Email'
                          required
                          type='email'
                          fullWidth
                          error={!!errors.email}
                          placeholder={errors.email?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='telefone'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Contacto Primário'
                          required
                          fullWidth
                          error={!!errors.telefone}
                          placeholder={errors.telefone?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='telefone2'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Contacto Secundário'
                          required
                          fullWidth
                          error={!!errors.telefone2}
                          placeholder={errors.telefone2?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  {/* Section: Application Information */}
                  <Grid item xs={12}>
                    <Divider>Informações da Candidatura</Divider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='instituicaoEnsino'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Instituição de Ensino'
                          required
                          fullWidth
                          error={!!errors.instituicaoEnsino}
                          placeholder={errors.instituicaoEnsino?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='curso'
                      control={control}
                      render={({ field }) => (
                        <CustomAutocomplete
                          fullWidth
                          options={filterCourses}
                          getOptionLabel={option => option.name}
                          value={filterCourses.find(option => option.id === field.value) || null}
                          onChange={(_, selectedOption) => {
                            field.onChange(selectedOption ? selectedOption.id : '')
                          }}
                          renderInput={params => (
                            <CustomTextField
                              {...params}
                              label='Área de Formação'
                              error={!!errors.curso}
                              helperText={errors.curso?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='grauAcademico'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label='Grau Académico'
                          fullWidth
                          required
                          select
                          {...field}
                          error={!!errors.grauAcademico}
                          placeholder={errors.grauAcademico?.message}
                        >
                          {niveis.map(nivel => (
                            <MenuItem key={nivel} value={nivel}>
                              {nivel}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  {/* Document Upload for Grades */}
                  <Grid item xs={12} sm={12}>
                    <CardContent sx={{ pt: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ImgStyled src={imgSrc} alt='Anexo do Certificado' />
                        <div>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                            Certificado de Notas
                            <input
                              hidden
                              type='file'
                              value={inputValue}
                              accept='image/png, image/jpeg, image/jpg'
                              onChange={handleInputImageChange}
                              id='account-settings-upload-image'
                            />
                          </ButtonStyled>
                          <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                            Limpar
                          </ResetButtonStyled>
                          <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                            Formatos permitidos PDF, PNG, JPG e JPEG. Tamanho Máximo de 8MB
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    {/* Section: Document Upload */}
                    <CardContent sx={{ pt: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ImgStyled src={imgSrcCV} alt='Anexo do Curriculo' />
                        <div>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                            Carregar Currículo
                            <input
                              hidden
                              type='file'
                              value={inputValueCv}
                              accept='image/png, image/jpeg, image/jpg'
                              onChange={handleInputImageChangeCurriculo}
                              id='account-settings-upload-image'
                            />
                          </ButtonStyled>
                          <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageResetCurriculo}>
                            Limpar
                          </ResetButtonStyled>
                          <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                            Formatos permitidos PNG, JPG e JPEG. Tamanho Máximo de 8MB
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      sx={{ backgroundColor: '#0208a2', '&:hover': { backgroundColor: '#ed6a1b' } }}
                    >
                      Aplicar para esta Vaga
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Box></Box>
      <Footer />
    </Box>
  )
}

DescricaoCandidatura.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

DescricaoCandidatura.guestGuard = true
