import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import IconifyIcon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CandidatoData } from '../candidaturas/[id]'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { SelectiveData } from 'src/types/pages/userStaff'
import Link from 'next/link'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { firestore } from 'src/configs/firebaseConfig'
import toast from 'react-hot-toast'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'

export default function Filtrar(props) {
  const [dataString, setDataString] = useState<string>('')
  const [candidatos, setCandidatos] = useState<SelectiveData[]>([])
  const [vagas, setVagas] = useState<SelectiveData[]>([])
  const [cursos, setCursos] = useState<SelectiveData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filteredCandidatos, setFilteredCandidatos] = useState<SelectiveData[]>([])
  const [error, setError] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  console.log(dataString)

  const getData = async () => {
    setIsLoading(true)
    try {
      const vagasArray: SelectiveData[] = []
      const querySnapshot = await getDocs(collection(firestore, 'candidaturas'))
      querySnapshot.forEach(doc => {
        vagasArray.push(doc.data() as SelectiveData)
      })
      setCandidatos(vagasArray)
    } catch (error) {
      toast.error('Erro ao solicitar dados!')
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const dptArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'courses'))

        querySnapshot.forEach(doc => {
          dptArray.push(doc.data() as SelectiveData)
        })
        setCursos(dptArray)
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
        const vagasArray: SelectiveData[] = []
        const querySnapshot = await getDocs(collection(firestore, 'vagas'))
        querySnapshot.forEach(doc => {
          vagasArray.push(doc.data() as SelectiveData)
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

  interface CellType {
    row: CandidatoData
  }

  const renderClient = (row: CandidatoData) => {
    if (row.avatar?.length) {
      return <CustomAvatar src={row?.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color='primary'
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.nomeCompleto)}
        </CustomAvatar>
      )
    }
  }

  const handleAiSearch = () => {
    setIsLoading(true)
    const criteria = dataString.toLowerCase()
    let filtered = [...candidatos] // Clone da lista original de candidatos

    // Regex para capturar o número de melhores ou piores candidatos (ex: "3 melhores", "5 piores")
    const match = criteria.match(/(\d+)\s*(melhores|piores)/)
    const isTop = criteria.includes('melhor') || criteria.includes('melhores')
    const isBottom = criteria.includes('pior') || criteria.includes('piores')

    if (match) {
      // Extrai o número de candidatos desejado do prompt (ex: 3 ou 5)
      const count = parseInt(match[1], 10)

      // Filtra candidatos que têm médias, ordena e seleciona os "count" melhores ou piores
      filtered = filtered
        .filter(candidato => candidato.media) // Filtra apenas candidatos com médias definidas
        .sort((a, b) => (isBottom ? a.media - b.media : b.media - a.media)) // Ordena por média, crescente para piores e decrescente para melhores
        .slice(0, count) // Seleciona os "count" primeiros
    } else {
      // Divide o prompt em palavras para buscar tokens específicos
      const tokens = criteria.split(/\s+/)

      // Filtro padrão com tokens no nome ou outros campos mencionados
      filtered = filtered.filter(candidato => {
        return (
          tokens.some(token => candidato.nomeCompleto?.toLowerCase().includes(token)) ||
          tokens.some(token => candidato.email?.toLowerCase().includes(token)) ||
          tokens.some(token =>
            vagas
              .find(vaga => vaga.id === candidato.vagaId)
              ?.titulo.toLowerCase()
              .includes(token)
          ) ||
          tokens.some(token =>
            cursos
              .find(curso => curso.id === candidato.curso)
              ?.name.toLowerCase()
              .includes(token)
          ) ||
          tokens.some(token => candidato.genero?.toLowerCase().includes(token)) ||
          tokens.some(token => candidato.telefone?.includes(token)) ||
          tokens.some(token => candidato.potuacao?.toString().includes(token))
        )
      })
    }

    // Atraso de 5 segundos para simular um tempo de carregamento
    setTimeout(() => {
      setFilteredCandidatos(filtered)

      if (filtered.length === 0) {
        setError(true)
      } else setError(false)
      setIsLoading(false)
    }, 5000) // 5000ms = 5 segundos
  }

  const columns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 200,
      field: 'name',
      headerName: 'Nome ',
      renderCell: ({ row }: CellType) => {
        const { id, nomeCompleto, email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                href={`#`}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {`${nomeCompleto}`}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'vagaId',
      headerName: 'Vaga de Candidatura',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {vagas.find(vaga => vaga.id === params.row.vagaId)?.titulo}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'genero',
      headerName: 'Sexo',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.genero}
        </Typography>
      )
    },

    {
      flex: 0.2,
      field: 'telefone',
      headerName: 'Contacto',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.telefone}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'media',
      headerName: 'Pontuação',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <Chip variant='filled' color='success' label={params.row.media} />
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'estado',
      headerName: 'Estado',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.estado === 1 ? (
            <Chip rounded size='small' color='success' label='Aprovado' />
          ) : params.row?.estado === 2 ? (
            <Chip rounded size='small' color='error' label='Reprovado' />
          ) : (
            <Chip rounded size='small' color='warning' label='Pendente' />
          )}
        </Typography>
      )
    }

    // {
    //   flex: 0.2,
    //   field: 'id',
    //   headerName: 'Acções',
    //   renderCell: (params: GridRenderCellParams) => (
    //     <>
    //       <IconButton color='error' onClick={() => handleClickDelete(params.row.id)}>
    //         <IconifyIcon fontSize='1.25rem' icon='tabler:trash' />
    //       </IconButton>
    //     </>
    //   )
    // }
  ]

  // const filterCandidaturas = candidatos

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedIds(newSelection as string[])
    console.log(newSelection)
  }

  const submitValues = async () => {
    setIsLoading(true)

    try {
      // Para cada ID de candidatura em `selectedIds`, atualize o estado e envie o e-mail
      for (const candidaturaId of selectedIds) {
        const candidaturasRef = doc(firestore, 'candidaturas', candidaturaId)

        // Atualize o campo `estado` para `1`
        await updateDoc(candidaturasRef, {
          estado: 1
        })

        // Envie um e-mail para cada candidato
        await fetch('/api/email/accept', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: 'Candidatura Aceite',
            email: 'eniomarcos48@gmail.com',
            vaga_nome:
              vagas.find(vaga => vaga.id === candidatos.find(candi => candi.id === candidaturaId).vagaId)?.titulo ?? ''

            // Inclua o e-mail do candidato (se tiver disponível na coleção `candidaturas` ou passe o email correto)
          })
        })
        toast.success('Aprovado com sucesso!')

        getData()
      }
    } catch (error) {
      console.log('Erro ao atualizar candidaturas e enviar e-mails:', error)
      toast.error('Erro ao actualizar dados')
    } finally {
      setIsLoading(false)
    }
  }
  const refuseSubmitValues = async () => {
    setIsLoading(true)

    try {
      // Para cada ID de candidatura em `selectedIds`, atualize o estado e envie o e-mail
      for (const candidaturaId of selectedIds) {
        const candidaturasRef = doc(firestore, 'candidaturas', candidaturaId)

        // Atualize o campo `estado` para `1`
        await updateDoc(candidaturasRef, {
          estado: 1
        })

        // Envie um e-mail para cada candidato
        await fetch('/api/email/refuse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: 'Candidatura Aceite',
            message: `Sua candidatura com o ID ${candidaturaId} foi aceita.`

            // Inclua o e-mail do candidato (se tiver disponível na coleção `candidaturas` ou passe o email correto)
          })
        })
        toast.success('Aprovado com sucesso!')

        getData()
      }
    } catch (error) {
      console.log('Erro ao atualizar candidaturas e enviar e-mails:', error)
      toast.error('Erro ao actualizar dados')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Assistente de Candidaturas Inteligentes' />
      <ModalProgressBar open={isLoading} />
      <Divider />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label='Introduza o critério de Busca de candidatos'
              required
              fullWidth
              multiline
              minRows={5}
              onChange={e => setDataString(e.target.value)}
              value={dataString}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button onClick={handleAiSearch} variant='contained' startIcon={<IconifyIcon icon={'tabler:ai'} />}>
              Buscar por IA
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12} sm={12}>
              <Alert severity='warning'>Não Foi Possível Buscar a Consulta Colocada!</Alert>
            </Grid>
          )}
          <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              pagination
              rows={filteredCandidatos}
              disableDensitySelector
              rowSelection
              checkboxSelection
              disableColumnFilter
              onRowSelectionModelChange={handleSelectionChange}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10
                  }
                }
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
              pageSizeOptions={[10, 25, 50]}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button type='submit' onClick={submitValues} sx={{ mr: 2 }} variant='contained'>
              Aprovar
            </Button>
            <Button type='reset' onClick={refuseSubmitValues} color='error' variant='tonal'>
              Reprovar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
