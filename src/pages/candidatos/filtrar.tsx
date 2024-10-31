import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import IconifyIcon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CandidatoData } from '../candidaturas/[id]'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { SelectiveData } from 'src/types/pages/userStaff'
import Link from 'next/link'

export default function Filtrar() {
  const [dataString, setDataString] = useState<string>('')
  const [candidatos, setCandidatos] = useState<SelectiveData[]>([])
  const [vagas, setVagas] = useState<SelectiveData[]>([])
  const [cursos, setCursos] = useState<SelectiveData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(dataString)

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

  const handleAiSearch = async () => {
    setIsLoading(true)
    console.log('Hello World')

    await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    setIsLoading(false)
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
                href={`colaborador/${id}`}
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
      headerName: 'Curso',
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
    },
    {
      flex: 0.2,
      field: 'potuacao',
      headerName: 'Pontuação',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.potuacao}
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

  const filterCandidaturas = candidatos

  return (
    <Card>
      <CardHeader title='Assistente de Candidaturas Inteligentes' />
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
