import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import IconifyIcon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { firestore } from 'src/configs/firebaseConfig'
import { z } from 'zod'

const departmentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  shortname: z.string().optional().default('')
})

export type DepartmentData = z.infer<typeof departmentSchema>

export default function Departamento({}) {
  const [departments, setDepartments] = useState<DepartmentData[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<DepartmentData>({ resolver: zodResolver(departmentSchema) })

  const getData = async () => {
    try {
      const dptArray: DepartmentData[] = []
      const querySnapshot = await getDocs(collection(firestore, 'departments'))

      querySnapshot.forEach(doc => {
        dptArray.push(doc.data() as DepartmentData)
      })
      setDepartments(dptArray)
    } catch (error) {
      toast.error('Erro ao solicitar dados!')
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleClickDelete = (id: string) => {
    console.log(id)
  }

  const onSubmit = async (values: FieldValues) => {
    try {
      const newRef = doc(collection(firestore, 'departments'))

      await setDoc(newRef, {
        ...values,
        id: newRef.id
      })

      getData()
      toast.success('Guardado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao guardar dados!')
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.3,
      field: 'name',
      headerName: 'Nome',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
        </Typography>
      )
    },

    {
      flex: 0.2,
      field: 'shortname',
      headerName: 'Abreviatura',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.shortname}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'id',
      headerName: 'Acções',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton color='error' onClick={() => handleClickDelete(params.row.id)}>
            <IconifyIcon fontSize='1.25rem' icon='tabler:trash' />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <Card>
      <CardHeader title='Departamentos' />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Nome'
                    required
                    fullWidth
                    error={!!errors.name}
                    placeholder={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='shortname'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Abreviação'
                    fullWidth
                    error={!!errors.shortname}
                    placeholder={errors.shortname?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button type='submit' disabled={!isValid} sx={{ mr: 2 }} variant='contained'>
                Guardar
              </Button>
              <Button type='reset' color='secondary' variant='tonal'>
                Limpar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={5}>
            {departments.length === 0 ? (
              <Grid item xs={12} sm={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CircularProgress />
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12}>
                <DataGrid
                  autoHeight
                  pagination
                  rows={departments}
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
            )}
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

Departamento.acl = {
  action: 'create',
  subject: 'config-department'
}
