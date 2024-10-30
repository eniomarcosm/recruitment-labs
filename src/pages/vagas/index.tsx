import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import { CandidaturaData } from './publicar'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from 'src/configs/firebaseConfig'
import toast from 'react-hot-toast'
import ModalProgressBar from 'src/components/dialogs/ProgressBar'

export default function Vagas() {
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

  const columns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 120,
      field: 'titulo',
      headerName: 'Título',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.titulo}
        </Typography>
      )
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'descricao',
      headerName: 'Descrição da Vaga',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.descricao}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 100,
      field: 'id',
      headerName: 'Acções',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton color='info' LinkComponent={Link} href={`/faltas/solicitacao/${params.row.id}`}>
            <IconifyIcon fontSize='1.5rem' icon='tabler:pencil-plus' />
          </IconButton>
          <IconButton color='error' onClick={() => console.log(params.row.id)}>
            <IconifyIcon fontSize='1.5rem' icon='tabler:trash' />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <Card>
      <CardHeader title='Vagas publicadas' />
      <ModalProgressBar open={isLoading} />
      <Divider />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              pagination
              rows={vagas}
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
