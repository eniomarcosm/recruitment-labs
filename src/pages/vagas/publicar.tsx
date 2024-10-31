import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import IconifyIcon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInputPicker } from 'src/components/forms/DatePickerHelpers'
import { z } from 'zod'

// ** keynote: Mudar idioma de datepicker
import DatePicker from 'react-datepicker'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { firestore } from 'src/configs/firebaseConfig'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { GeneralData } from '../configurar/departamento'
import { SelectiveData } from 'src/types/pages/userStaff'
import { useRouter } from 'next/router'

const vagaSchema = z.object({
  id: z.string().optional(),
  titulo: z.string(),
  descricao: z.string(),
  idade_min: z.number(),
  idade_max: z.number(),
  data_validade: z.date(),
  departmento: z.string(),
  area_formacao: z.string(),

  // documentos_exigidos: z.string().array(),
  nivel: z.string(),
  anos_experieriencia: z.number(),
  nacionalidade: z.string(),
  linguas_exigidas: z.any()
})

export const nacionalidades = ['Moçambicana', 'Todas']
export const niveis = ['Finalista', 'Licenciado', 'Mestrado', 'Doutoramento']
export const linguas = ['Portugues', 'Inglês', 'Francês', 'Mandarim']

export type CandidaturaData = z.infer<typeof vagaSchema>

export interface GeneralData {
  id: string
  name: string
  shortname: string
}

export default function PublicarVaga(props) {
  const [dpts, setDpts] = useState<SelectiveData[]>([])
  const [courses, setCourse] = useState<SelectiveData[]>([])

  const router = useRouter()

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors, isValid }
  } = useForm<CandidaturaData>({
    resolver: zodResolver(vagaSchema)
  })

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

  const onSubmit = async (values: CandidaturaData) => {
    console.log(values)

    try {
      const newRef = doc(collection(firestore, 'vagas'))

      await setDoc(newRef, {
        ...values,
        createdAt: new Date(),
        id: newRef.id
      })

      toast.success('Atualizado com sucesso!')
      router.replace('/vagas')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao actualizar dados!')
    }
  }

  return (
    <Card>
      <CardHeader title='Candidaturas' />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='titulo'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Título da Vaga'
                    required
                    fullWidth
                    error={!!errors.titulo}
                    placeholder={errors.titulo?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='departmento'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Departmento'
                    fullWidth
                    required
                    defaultValue=''
                    select
                    {...field}
                    error={!!errors.departmento}
                    placeholder={errors.departmento?.message}
                  >
                    {dpts.map(dpt => (
                      <MenuItem key={dpt.id} value={dpt.id}>
                        {dpt.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name='area_formacao'
                control={control}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    options={courses}
                    getOptionLabel={option => `${option.name}`}
                    value={courses.find(option => option.id === field.value) || null}
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

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label='Anos de Experiência'
                required
                fullWidth
                type='number'
                error={!!errors.anos_experieriencia}
                placeholder={errors.anos_experieriencia?.message}
                {...register('anos_experieriencia', { valueAsNumber: true })}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='descricao'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Descrição da Vaga'
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    error={!!errors.descricao}
                    placeholder={errors.descricao?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label='Idade Mínima'
                required
                fullWidth
                type='number'
                error={!!errors.idade_min}
                placeholder={errors.idade_min?.message}
                {...register('idade_min', { valueAsNumber: true })}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label='Idade Máxima'
                required
                fullWidth
                type='number'
                error={!!errors.idade_max}
                placeholder={errors.idade_max?.message}
                {...register('idade_max', { valueAsNumber: true })}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Controller
                name='titulo'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Título da Vaga'
                    required
                    fullWidth
                    error={!!errors.titulo}
                    placeholder={errors.titulo?.message}
                    {...field}
                  />
                )}
              />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <Controller
                name='nivel'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Grau Académico'
                    fullWidth
                    required
                    defaultValue=''
                    select
                    {...field}
                    error={!!errors.nivel}
                    placeholder={errors.nivel?.message}
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

            <Grid item xs={12} sm={4}>
              <Controller
                name='nacionalidade'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label='Nacionalidade'
                    fullWidth
                    required
                    defaultValue=''
                    select
                    {...field}
                    error={!!errors.nacionalidade}
                    placeholder={errors.nacionalidade?.message}
                  >
                    {nacionalidades.map(nacionalidade => (
                      <MenuItem key={nacionalidade} value={nacionalidade}>
                        {nacionalidade}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomAutocomplete
                fullWidth
                multiple
                options={linguas}
                getOptionLabel={option => `${option}` || ''}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    sx={{ mb: 4 }}
                    label='Idiomas Exigidos'
                    error={!!errors.linguas_exigidas}
                  />
                )}
                onChange={(_, selectedOptions) => {
                  const selectedIds = selectedOptions.map(option => option || '')
                  setValue('linguas_exigidas', selectedIds || '')
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`data_validade`} // Use array notation for the name
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    locale='ptBR'
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    dateFormat='dd/MM/yyyy'
                    onChange={date => onChange(date)}
                    placeholderText='DD/MM/AAAA'
                    yearDropdownItemNumber={1}
                    scrollableYearDropdown={false}
                    customInput={
                      <CustomInputPicker
                        value={value}
                        onChange={onChange}
                        label={`Válido até`}
                        error={Boolean(errors?.data_validade)}
                        aria-describedby={`data-realiazacao`}
                        {...(errors?.data_validade && {
                          helperText: 'Este campo é obrigatório'
                        })}
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
          </Grid>
        </CardContent>
        <CardActions>
          <Button type='submit' disabled={!isValid} sx={{ mr: 2 }} variant='contained'>
            Guardar
          </Button>
          <Button type='reset' color='secondary' variant='tonal'>
            Limpar
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
