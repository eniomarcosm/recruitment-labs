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
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import IconifyIcon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInputPicker } from 'src/components/forms/DatePickerHelpers'
import { z } from 'zod'

// ** keynote: Mudar idioma de datepicker
import DatePicker from 'react-datepicker'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { firestore } from 'src/configs/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

const vagaSchema = z.object({
  id: z.string().optional(),
  titulo: z.string(),
  descricao: z.string(),
  idade_min: z.number(),
  idade_max: z.number(),
  data_validade: z.date(),

  // documentos_exigidos: z.string().array(),
  nivel: z.string(),
  anos_experieriencia: z.number(),
  nacionalidade: z.string(),
  linguas_exigidas: z.any()
})

const nacionalidades = ['Moçambicana', 'Todas']
const niveis = ['Finalista', 'Licenciado', 'Mestrado', 'Doutoramento']
const linguas = ['Portugues', 'Inglês', 'Francês', 'Mandarim']

export type CandidaturaData = z.infer<typeof vagaSchema>

export default function PublicarVaga() {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors, isValid }
  } = useForm<CandidaturaData>({
    resolver: zodResolver(vagaSchema)
  })

  const onSubmit = async (values: CandidaturaData) => {
    console.log(values)

    try {
      const newRef = doc(collection(firestore, 'vagas'))

      await setDoc(newRef, {
        ...values,
        id: newRef.id
      })

      toast.success('Atualizado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao actualizar dados!')
    }
  }

  console.log(errors)

  return (
    <Card>
      <CardHeader title='Candidaturas' />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={8}>
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
                    label='Nível'
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
