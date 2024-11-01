import React, { useEffect, useState } from 'react'
import { SelectiveData } from 'src/types/pages/userStaff'
import { DepartmentData } from '../configurar/departamento'
import { firestore } from 'src/configs/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { Box, Card, CardContent, CardHeader, Grid, IconButton, MenuItem, Typography } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { CandidatoData } from '../candidaturas/[id]'
import Link from 'next/link'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'
import { Controller, useForm } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { months } from '../ferias/mapa'
import { AnualData } from '../configurar/sessaoanual'

const candidaturaSchema = z.object({
  area_formacao: z.string(),
  departamento: z.string(),
  vagaId: z.string(),
  months: z.number(),
  year: z.number()
})

export type CandidaturaData = z.infer<typeof candidaturaSchema>

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

const anos = [2023, 2024]

export default function Lista(props) {
  const [candidatos, setCandidatos] = useState<SelectiveData[]>([])
  const [vagas, setVagas] = useState<SelectiveData[]>([])
  const [cursos, setCursos] = useState<SelectiveData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    watch,

    formState: { errors }
  } = useForm<CandidaturaData>({
    resolver: zodResolver(candidaturaSchema)
  })

  const { vagaId } = watch()

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

  useEffect(() => {
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
    getData()
  }, [])

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
      flex: 0.3,
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
      field: 'curso',
      headerName: 'Área de Formação',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {cursos.find(cours => cours.id === params.row.curso)?.name}
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

  const filterCandidaturas = vagaId ? candidatos.filter(candidato => candidato.vagaId === vagaId) : candidatos

  return (
    <Card>
      <ModalProgressBar open={isLoading} />

      <CardHeader title='Candidaturas' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Controller
              name='year'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label='Ano'
                  fullWidth
                  required
                  defaultValue=''
                  select
                  {...field}
                  error={!!errors.year}
                  placeholder={errors.year?.message}
                >
                  {anos.map(ano => (
                    <MenuItem key={ano} value={ano}>
                      {ano}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='month'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label='Mês'
                  fullWidth
                  required
                  defaultValue=''
                  select
                  {...field}
                  error={!!errors.month}
                  placeholder={errors.month?.message}
                >
                  {months.map(month => (
                    <MenuItem key={month.id} value={month.id}>
                      {month.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='vagaId'
              control={control}
              render={({ field }) => (
                <CustomAutocomplete
                  fullWidth
                  options={vagas}
                  getOptionLabel={option => `${option.titulo}`}
                  value={vagas.find(option => option.id === field.value) || null}
                  onChange={(_, selectedOption) => {
                    field.onChange(selectedOption ? selectedOption.id : '')
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      label='Vaga'
                      error={!!errors.vagaId}
                      helperText={errors.vagaId?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              pagination
              rows={filterCandidaturas}
              disableDensitySelector
              disableColumnFilter
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
        </Grid>
      </CardContent>
    </Card>
  )
}
