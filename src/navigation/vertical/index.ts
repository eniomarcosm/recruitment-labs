// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Início',
      path: '/home',
      icon: 'tabler:smart-home',
      action: 'read',
      subject: 'home'
    },
    {
      sectionTitle: 'Gestão de Usuários',
      action: 'read',
      subject: 'users-session'
    },
    {
      title: 'Usuários',
      path: '/usuarios',
      icon: 'tabler:user',
      action: 'create',
      subject: 'users'
    },
    {
      title: 'Colaboradores',
      icon: 'tabler:users',
      children: [
        {
          title: 'Listar',
          path: '/colaborador',
          action: 'read',
          subject: 'staff'
        },
        {
          title: 'Cadastrar',
          path: '/colaborador/cadastrar',
          action: 'create',
          subject: 'staff-add'
        }
      ]
    },

    // {
    //   sectionTitle: 'Gestão de Assiduidade',
    //   action: 'read',
    //   subject: 'vacation-session'
    // },
    // {
    //   title: 'Férias',
    //   icon: 'tabler:clock-exclamation',
    //   children: [
    //     {
    //       title: 'Mapa de Férias',
    //       path: '/ferias/mapa',
    //       action: 'create',
    //       subject: 'vacation-marcation'
    //     },
    //     {
    //       title: 'Solicitar Férias',
    //       path: '/ferias/solicitar',
    //       action: 'create',
    //       subject: 'vacation-request'
    //     },
    //     {
    //       title: 'Histórico de Férias',
    //       path: '/ferias/historico',
    //       action: 'read',
    //       subject: 'vacations-history'
    //     },

    //     // {
    //     //   title: 'Calendario de Férias',
    //     //   path: '/ferias/calendario',
    //     //   action: 'read',
    //     //   subject: 'vacation-calendar'
    //     // },
    //     // {
    //     //   title: 'Mapa de Férias',
    //     //   path: '/ferias/reservadas',
    //     //   action: 'read',
    //     //   subject: 'vacation-map'
    //     // },
    //     {
    //       title: 'Solicitações de Férias',
    //       path: '/ferias/solicitacao',
    //       action: 'create',
    //       subject: 'vacation-response'
    //     }

    //     // {
    //     //   title: 'Solicitações de Férias',
    //     //   path: '/ferias/solicitacao',
    //     //   action: 'create',
    //     //   subject: 'vacation-response'
    //     // }
    //   ]
    // },
    // {
    //   title: 'Faltas e Dispensas',
    //   icon: 'tabler:history-toggle',
    //   children: [
    //     {
    //       title: 'Justificar',
    //       path: '/faltas/justificar',
    //       action: 'create',
    //       subject: 'absence-request'
    //     },
    //     {
    //       title: 'Histórico',
    //       path: '/faltas/historico',
    //       action: 'manage',
    //       subject: 'absence-history'
    //     },
    //     {
    //       title: 'Solicitação',
    //       path: '/faltas/solicitacao',
    //       action: 'create',
    //       subject: 'absence-response'
    //     },
    //     {
    //       title: 'Configurações',
    //       path: '/faltas/configurações',
    //       action: 'create',
    //       subject: 'absence-config'
    //     }
    //   ]
    // },
    // {
    //   sectionTitle: 'Gestão de Configurações',
    //   action: 'read',
    //   subject: 'config-session'
    // },
    // {
    //   title: 'Configurações',
    //   icon: 'tabler:settings',
    //   children: [
    //     {
    //       title: 'Unidade Orgânicas',
    //       action: 'read',
    //       subject: 'config-organic-unit',
    //       path: '/configurar/unidade-organica'
    //     },
    //     {
    //       title: 'Departartamentos',
    //       action: 'read',
    //       subject: 'config-department',
    //       path: '/configurar/departamento'
    //     },
    //     {
    //       title: 'Sessão Anual de Férias',
    //       action: 'read',
    //       subject: 'anual-session-map',
    //       path: '/configurar/sessaoanual'
    //     }

    // { title: 'Departartamentos', action: 'read', subject: 'acl-page', path: '/acl' }
    //   ]
    // }
    {
      sectionTitle: 'Gerenciamento de Vagas',
      action: 'read',
      subject: 'config-session'
    },

    {
      title: 'Vagas',
      icon: 'tabler:user',
      children: [
        {
          title: 'Criar',
          action: 'read',
          path: '/vagas/publicar',
          subject: 'vacations-history'
        },
        {
          title: 'Listar',
          action: 'read',
          path: '/vagas',
          subject: 'vacations-history'
        }
      ]
    },

    {
      sectionTitle: 'Triagem de Candidatos',
      action: 'read',
      subject: 'config-session'
    },

    {
      title: 'Candidaturas',
      icon: 'tabler:user',
      children: [
        {
          title: 'Listar',
          action: 'read',
          path: '/candidatos',
          subject: 'candidatura'
        },
        {
          title: 'Recrutador',
          action: 'read',
          path: '/candidatos/filtrar',
          subject: 'candidatura-filtrar'
        },
        {
          title: 'Apurados',
          action: 'read',
          path: '/candidatos/apurado',
          subject: 'candidatura-apurado'
        }
      ]
    },

    // {
    //   sectionTitle: 'Comunicação com Candidatos',
    //   action: 'read',
    //   subject: 'config-session'
    // },
    {
      sectionTitle: 'Análise e Relatórios',
      action: 'read',
      subject: 'config-session'
    },

    // {
    //   title: 'Configurações',
    //   icon: 'tabler:settings',
    //   children: [
    //     {
    //       title: 'Departamentos',
    //       action: 'read',
    //       subject: 'department',
    //       path: '/configurar/departamento'
    //     },
    //     {
    //       title: 'Cursos',
    //       action: 'read',
    //       subject: 'courses',
    //       path: '/configurar/cursos'
    //     }
    //   ]
    // },

    {
      sectionTitle: 'Gestão de Configurações',
      action: 'read',
      subject: 'config-session'
    },
    {
      title: 'Configurações',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Departamentos',
          action: 'read',
          subject: 'department',
          path: '/configurar/departamento'
        },
        {
          title: 'Áreas de Formação',
          action: 'read',
          subject: 'courses',
          path: '/configurar/formacao'
        }
      ]
    }
  ]
}

export default navigation
