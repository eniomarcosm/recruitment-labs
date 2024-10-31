import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

export default function DescricaoCandidatura(props) {
  return <div></div>
}

DescricaoCandidatura.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

DescricaoCandidatura.guestGuard = true
